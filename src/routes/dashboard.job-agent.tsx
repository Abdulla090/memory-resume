import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  BadgeCheck,
  Bot,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Globe,
  Loader2,
  Plus,
  Send,
  ShieldAlert,
  Sparkles,
  Square,
  Trash2,
} from "lucide-react";
import { type FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  cancelTelegramJobScan,
  pollTelegramJobScan,
  startTelegramJobScan,
  type TelegramJobMatch,
  type TelegramJobScanResult,
} from "@/lib/ai.functions";
import { getAiErrorMessage } from "@/lib/ai-errors";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/dashboard/job-agent")({
  component: JobAgentPage,
});

const SETTINGS_KEY = "memorycv-job-agent";
const ACTIVE_SCAN_KEY = "memorycv-job-agent-active";
const TRACKER_KEY = "memorycv-job-tracker";

const SUGGESTED_CHANNELS = [
  "ferkar_jobs",
  "fjkurdistan10",
  "allkurdistanjobs",
  "kurdistanjobs",
  "erbiljobs",
];

const POLL_INTERVAL_MS = 5_000;
const MAX_SCAN_DURATION_MS = 10 * 60 * 1000;

type Settings = {
  channels: string[];
  messagesPerChannel: number;
  maxMatches: number;
  targetRole: string;
};

const DEFAULT_SETTINGS: Settings = {
  channels: ["ferkar_jobs", "fjkurdistan10", "allkurdistanjobs"],
  messagesPerChannel: 60,
  maxMatches: 10,
  targetRole: "",
};

type ActiveScan = {
  interactionId: string;
  environmentId?: string;
  startedAt: number;
  channelsRequested: number;
  maxMatches: number;
};

type JobStatus = "saved" | "applied" | "interview" | "offer" | "rejected";
type TrackerEntry = {
  id: string;
  role: string;
  company: string;
  status: JobStatus;
  source: string;
  resumeId?: string;
  updatedAt: number;
};

const TIER_META = {
  A: {
    label: "Strong fit",
    labelKu: "پەیوەستی بەهێز",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
  },
  B: {
    label: "Good potential",
    labelKu: "ئەگەری باش",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
  },
  C: {
    label: "Stretch",
    labelKu: "دوور لە مەودا",
    color: "bg-slate-100 text-slate-600 border-slate-200",
    dot: "bg-slate-400",
  },
} as const;

function loadSettings(): Settings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw) as Partial<Settings>;
    return {
      channels:
        Array.isArray(parsed.channels) && parsed.channels.length > 0
          ? parsed.channels.filter((c) => typeof c === "string")
          : DEFAULT_SETTINGS.channels,
      messagesPerChannel:
        typeof parsed.messagesPerChannel === "number"
          ? Math.max(20, Math.min(100, parsed.messagesPerChannel))
          : DEFAULT_SETTINGS.messagesPerChannel,
      maxMatches:
        typeof parsed.maxMatches === "number"
          ? Math.max(3, Math.min(20, parsed.maxMatches))
          : DEFAULT_SETTINGS.maxMatches,
      targetRole: typeof parsed.targetRole === "string" ? parsed.targetRole : "",
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function saveSettings(settings: Settings) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // ignore
  }
}

function loadActiveScan(): ActiveScan | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(ACTIVE_SCAN_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ActiveScan>;
    if (typeof parsed.interactionId !== "string" || typeof parsed.startedAt !== "number") {
      return null;
    }
    if (Date.now() - parsed.startedAt > MAX_SCAN_DURATION_MS) {
      window.localStorage.removeItem(ACTIVE_SCAN_KEY);
      return null;
    }
    return {
      interactionId: parsed.interactionId,
      environmentId: typeof parsed.environmentId === "string" ? parsed.environmentId : undefined,
      startedAt: parsed.startedAt,
      channelsRequested:
        typeof parsed.channelsRequested === "number" ? parsed.channelsRequested : 0,
      maxMatches: typeof parsed.maxMatches === "number" ? parsed.maxMatches : 10,
    };
  } catch {
    return null;
  }
}

function saveActiveScan(scan: ActiveScan | null) {
  if (typeof window === "undefined") return;
  try {
    if (scan) {
      window.localStorage.setItem(ACTIVE_SCAN_KEY, JSON.stringify(scan));
    } else {
      window.localStorage.removeItem(ACTIVE_SCAN_KEY);
    }
  } catch {
    // ignore
  }
}

function normalizeHandle(handle: string): string {
  return handle.trim().replace(/^@/, "").replace(/[^a-zA-Z0-9_]/g, "");
}

function JobAgentPage() {
  const language = useAppStore((s) => s.language);
  const profile = useAppStore((s) => s.profile);
  const apiKey = useAppStore((s) => s.apiKey);
  const isKu = language === "ku";

  const startScanFn = useServerFn(startTelegramJobScan);
  const pollScanFn = useServerFn(pollTelegramJobScan);
  const cancelScanFn = useServerFn(cancelTelegramJobScan);

  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [newChannel, setNewChannel] = useState("");
  const [activeScan, setActiveScan] = useState<ActiveScan | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [result, setResult] = useState<TelegramJobScanResult | null>(null);
  const [expandedMatchIds, setExpandedMatchIds] = useState<Set<string>>(new Set());

  const statusTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPollingRef = useRef(false);

  useEffect(() => {
    setSettings(loadSettings());
    setActiveScan(loadActiveScan());
  }, []);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  useEffect(() => {
    saveActiveScan(activeScan);
  }, [activeScan]);

  const cleanChannels = useMemo(
    () => settings.channels.map(normalizeHandle).filter(Boolean),
    [settings.channels],
  );

  const busy = activeScan !== null;
  const canRun = !busy && Boolean(profile) && cleanChannels.length > 0 && cleanChannels.length <= 5;

  const stopStatusRotation = useCallback(() => {
    if (statusTimerRef.current) {
      clearInterval(statusTimerRef.current);
      statusTimerRef.current = null;
    }
  }, []);

  const stopPolling = useCallback(() => {
    if (pollTimerRef.current) {
      clearTimeout(pollTimerRef.current);
      pollTimerRef.current = null;
    }
    isPollingRef.current = false;
  }, []);

  useEffect(() => {
    return () => {
      stopStatusRotation();
      stopPolling();
    };
  }, [stopStatusRotation, stopPolling]);

  const startStatusRotation = useCallback(() => {
    stopStatusRotation();
    const messages = isKu
      ? [
          "ئاژانسەکە سەردانی کەناڵەکان دەکات...",
          "نوێترین پۆستەکان دەخوێنرێنەوە...",
          "ئاژانسەکە لەگەڵ یادگەکەت بەراورد دەکات...",
          "ڕیزکردنی باشترین ئەنجامەکان...",
        ]
      : [
          "Agent is visiting the channels...",
          "Reading the latest posts...",
          "Matching against your memory...",
          "Ranking the best opportunities...",
        ];
    let i = 0;
    setStatusMessage(messages[0] ?? "");
    statusTimerRef.current = setInterval(() => {
      i = (i + 1) % messages.length;
      setStatusMessage(messages[i] ?? "");
    }, 4500);
  }, [isKu, stopStatusRotation]);

  const poll = useCallback(
    async (scan: ActiveScan) => {
      if (isPollingRef.current) return;
      isPollingRef.current = true;

      try {
        const response = await pollScanFn({
          data: {
            apiKey,
            interactionId: scan.interactionId,
            maxMatches: scan.maxMatches,
            fallbackChannelsScanned: scan.channelsRequested,
          },
        });

        if (response.phase === "completed") {
          stopStatusRotation();
          stopPolling();
          setActiveScan(null);
          setResult(response);
          setExpandedMatchIds(new Set());
          if (response.matches.length === 0) {
            toast.info(
              isKu
                ? "هیچ کارێکی گونجاو نەدۆزرایەوە. کەناڵی تر تاقی بکەرەوە."
                : "No matching jobs found this run. Try different channels.",
            );
          } else {
            toast.success(
              isKu
                ? `${response.matches.length} کاری گونجاو دۆزرایەوە.`
                : `Found ${response.matches.length} matching opportunities.`,
            );
          }
          return;
        }

        if (response.phase === "failed") {
          stopStatusRotation();
          stopPolling();
          setActiveScan(null);
          toast.error(
            isKu
              ? "ئاژانسەکە نەیتوانی تەواو بکات. دواتر هەوڵ بدەرەوە."
              : "Agent could not complete the scan. Please try again.",
          );
          return;
        }

        if (response.phase === "cancelled") {
          stopStatusRotation();
          stopPolling();
          setActiveScan(null);
          return;
        }

        // still running — handle timeout
        if (Date.now() - scan.startedAt > MAX_SCAN_DURATION_MS) {
          stopStatusRotation();
          stopPolling();
          setActiveScan(null);
          toast.error(
            isKu
              ? "ئاژانسەکە کاتی زۆری برد. سکانەکە وەستێنرا."
              : "Scan exceeded the time limit and was stopped.",
          );
          return;
        }

        pollTimerRef.current = setTimeout(() => {
          isPollingRef.current = false;
          void poll(scan);
        }, POLL_INTERVAL_MS);
      } catch (e) {
        stopStatusRotation();
        stopPolling();
        setActiveScan(null);
        toast.error(
          getAiErrorMessage(
            e,
            isKu,
            isKu ? "شکستی هەوڵدان لە سکانکردن" : "Polling failed",
          ),
        );
      } finally {
        isPollingRef.current = false;
      }
    },
    [apiKey, isKu, pollScanFn, stopPolling, stopStatusRotation],
  );

  // Resume polling if a scan was already running when the page mounted/reloaded.
  useEffect(() => {
    if (activeScan && !isPollingRef.current && !pollTimerRef.current) {
      startStatusRotation();
      void poll(activeScan);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeScan?.interactionId]);

  const addChannel = (event?: FormEvent) => {
    event?.preventDefault();
    const handle = normalizeHandle(newChannel);
    if (!handle) return;
    if (settings.channels.length >= 5) {
      toast.error(isKu ? "زۆرترین ٥ کەناڵ ڕێگەپێدراون." : "Maximum 5 channels per scan.");
      return;
    }
    if (cleanChannels.includes(handle)) {
      toast.info(isKu ? "کەناڵەکە پێشتر زیادکراوە." : "Channel already added.");
      setNewChannel("");
      return;
    }
    setSettings((s) => ({ ...s, channels: [...s.channels, handle] }));
    setNewChannel("");
  };

  const removeChannel = (handle: string) => {
    setSettings((s) => ({
      ...s,
      channels: s.channels.filter((c) => normalizeHandle(c) !== handle),
    }));
  };

  const runAgent = async () => {
    if (!canRun || !profile) return;
    setResult(null);
    setExpandedMatchIds(new Set());
    startStatusRotation();

    try {
      const handle = await startScanFn({
        data: {
          apiKey,
          profile,
          channels: cleanChannels,
          messagesPerChannel: settings.messagesPerChannel,
          maxMatches: settings.maxMatches,
          language: language === "ar" ? "en" : language,
          targetRole: settings.targetRole.trim() || undefined,
        },
      });

      const scan: ActiveScan = {
        interactionId: handle.interactionId,
        environmentId: handle.environmentId,
        startedAt: Date.now(),
        channelsRequested: cleanChannels.length,
        maxMatches: settings.maxMatches,
      };
      setActiveScan(scan);
      // poll() is triggered by the activeScan effect above.
    } catch (e) {
      stopStatusRotation();
      toast.error(
        getAiErrorMessage(
          e,
          isKu,
          isKu ? "شکستی دەستپێکردنی ئاژانس" : "Could not start the agent",
        ),
      );
    }
  };

  const stopAgent = async () => {
    if (!activeScan) return;
    const scan = activeScan;
    stopPolling();
    stopStatusRotation();
    setActiveScan(null);
    try {
      await cancelScanFn({ data: { apiKey, interactionId: scan.interactionId } });
      toast.info(isKu ? "سکانەکە وەستێنرا" : "Scan stopped");
    } catch {
      // best-effort
    }
  };

  const saveToTracker = (match: TelegramJobMatch) => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(TRACKER_KEY);
      const list = Array.isArray(JSON.parse(raw || "[]"))
        ? (JSON.parse(raw || "[]") as TrackerEntry[])
        : [];
      const entry: TrackerEntry = {
        id:
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        role: match.title,
        company: match.company ?? match.channel,
        status: "saved",
        source: match.link ?? `https://t.me/${match.channel.replace(/^@/, "")}`,
        updatedAt: Date.now(),
      };
      window.localStorage.setItem(TRACKER_KEY, JSON.stringify([entry, ...list]));
      toast.success(isKu ? "زیادکرا بۆ چاودێری کار" : "Added to your job tracker");
    } catch {
      toast.error(isKu ? "ناتوانرێت پاشەکەوت بکرێت" : "Could not save to tracker");
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedMatchIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const groupedMatches = useMemo(() => {
    const groups: Record<"A" | "B" | "C", TelegramJobMatch[]> = { A: [], B: [], C: [] };
    if (result) {
      for (const m of result.matches) {
        groups[m.tier].push(m);
      }
    }
    return groups;
  }, [result]);

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6" dir={isKu ? "rtl" : "ltr"}>
      <header className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_-36px_rgba(15,23,42,0.35)] sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700">
              <Sparkles className="size-3.5" aria-hidden />
              {isKu ? "ئاژانسی Gemini" : "Gemini Managed Agent"}
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
              {isKu ? "ئاژانسی دۆزینەوەی کار" : "Job-finding Agent"}
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {isKu
                ? "ئاژانسەکە کەناڵە گشتییەکانی تێلێگرام دەکاتەوە، نوێترین ١٠٠ پۆست دەخوێنێتەوە، و ئەو کارانە بۆ تۆ دەنووسێت کە لەگەڵ یادگەی پیشەییەکەت دەگونجێن."
                : "The agent opens public Telegram channels, reads the latest posts, and shortlists the roles that match your professional memory."}
            </p>
          </div>
          <div className="grid w-full grid-cols-3 gap-2 text-center sm:max-w-[360px]">
            <Stat label={isKu ? "کەناڵ" : "Channels"} value={cleanChannels.length} />
            <Stat
              label={isKu ? "پۆست" : "Posts"}
              value={settings.messagesPerChannel * cleanChannels.length}
            />
            <Stat label={isKu ? "ئەنجام" : "Results"} value={result?.matches.length ?? 0} />
          </div>
        </div>
      </header>

      {!profile && (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <ShieldAlert className="mt-0.5 size-5 shrink-0" aria-hidden />
          <div>
            <p className="font-semibold">
              {isKu ? "یادگەی پیشەیی پێویستە" : "Professional memory required"}
            </p>
            <p className="mt-1 text-amber-800">
              {isKu
                ? "بۆ ئەوەی ئاژانسەکە بزانێت چی بدۆزرێتەوە، یەکەم جار یادگەی پیشەییەکەت دروست بکە."
                : "The agent needs your career memory to know what to look for. Build it first, then come back."}
            </p>
            <Link
              to="/onboarding"
              className="mt-3 inline-flex items-center gap-1 text-amber-900 underline underline-offset-2"
            >
              {isKu ? "دروستکردنی یادگە" : "Build my memory"}
            </Link>
          </div>
        </div>
      )}

      <section className="grid gap-5 lg:grid-cols-[380px_1fr]">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void runAgent();
          }}
          className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm"
        >
          <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-950">
            <Globe className="size-4 text-blue-700" aria-hidden />
            {isKu ? "کەناڵە تێلێگرامەکان" : "Telegram channels"}
          </h2>

          <div className="mt-4 space-y-2">
            {cleanChannels.length === 0 ? (
              <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-500">
                {isKu ? "هیچ کەناڵێک زیادنەکراوە." : "No channels added yet."}
              </p>
            ) : (
              cleanChannels.map((handle) => (
                <div
                  key={handle}
                  className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
                >
                  <a
                    href={`https://t.me/s/${handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate font-mono text-[13px] text-slate-700 hover:text-blue-700"
                  >
                    @{handle}
                  </a>
                  <button
                    type="button"
                    onClick={() => removeChannel(handle)}
                    className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-700"
                    aria-label={isKu ? "سڕینەوە" : "Remove channel"}
                    disabled={busy}
                  >
                    <Trash2 className="size-4" aria-hidden />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="mt-3 flex gap-2">
            <input
              value={newChannel}
              onChange={(event) => setNewChannel(event.target.value)}
              placeholder={isKu ? "@ناوی_کەناڵ" : "@channel_handle"}
              className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 font-mono text-sm outline-none transition-colors focus:border-blue-400"
              maxLength={64}
              disabled={busy}
            />
            <button
              type="button"
              onClick={() => addChannel()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-white transition-colors hover:bg-blue-800 disabled:opacity-50"
              disabled={!newChannel.trim() || busy}
              aria-label={isKu ? "زیادکردن" : "Add channel"}
            >
              <Plus className="size-4" aria-hidden />
            </button>
          </div>

          {cleanChannels.length < 5 && (
            <div className="mt-4">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {isKu ? "پێشنیار" : "Suggestions"}
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {SUGGESTED_CHANNELS.filter((s) => !cleanChannels.includes(s)).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() =>
                      setSettings((prev) => ({ ...prev, channels: [...prev.channels, s] }))
                    }
                    disabled={busy}
                    className="rounded-full border border-slate-200 bg-white px-2.5 py-1 font-mono text-[11px] text-slate-600 transition-colors hover:border-blue-400 hover:text-blue-700 disabled:opacity-50"
                  >
                    @{s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <hr className="my-5 border-slate-100" />

          <label className="block">
            <span className="text-xs font-semibold text-slate-600">
              {isKu ? "ڕۆڵی ئامانج (هەڵبژاردە)" : "Target role (optional)"}
            </span>
            <input
              value={settings.targetRole}
              onChange={(event) =>
                setSettings((prev) => ({ ...prev, targetRole: event.target.value }))
              }
              placeholder={isKu ? "بۆ نموونە: ئەندازیاری Frontend" : "e.g. Frontend Engineer"}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition-colors focus:border-blue-400 focus:bg-white"
              maxLength={200}
              disabled={busy}
            />
          </label>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <NumericField
              label={isKu ? "پۆست/کەناڵ" : "Posts/channel"}
              value={settings.messagesPerChannel}
              min={20}
              max={100}
              step={10}
              disabled={busy}
              onChange={(v) => setSettings((prev) => ({ ...prev, messagesPerChannel: v }))}
            />
            <NumericField
              label={isKu ? "زۆرترین ئەنجام" : "Max matches"}
              value={settings.maxMatches}
              min={3}
              max={20}
              step={1}
              disabled={busy}
              onChange={(v) => setSettings((prev) => ({ ...prev, maxMatches: v }))}
            />
          </div>

          <p className="mt-4 text-[11px] leading-5 text-slate-500">
            {isKu
              ? "ئاژانسەکە لە سێرڤەری گووگڵ کاردەکات. ئەم ڕووکارە تەنیا ھەردەم چاو لە ئەنجامەکە دەکات، بۆیە لەسەر هەژماری بێبەرامبەری Vercel/Cloudflare/Netlify کاردەکات."
              : "The agent runs on Google's servers; this UI just polls for the result, so it works fine on the free tier of Vercel, Cloudflare, Netlify, or Deno Deploy."}
          </p>

          {busy ? (
            <button
              type="button"
              onClick={() => void stopAgent()}
              className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-sm font-bold text-rose-700 transition-colors hover:bg-rose-50 active:scale-[0.99]"
            >
              <Square className="size-4" aria-hidden />
              {isKu ? "وەستاندنی ئاژانس" : "Stop agent"}
            </button>
          ) : (
            <button
              type="submit"
              disabled={!canRun}
              className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="size-4" aria-hidden />
              {isKu ? "دەستپێکردنی ئاژانس" : "Run job agent"}
            </button>
          )}
        </form>

        <div className="min-h-[420px] rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          {busy && activeScan ? (
            <RunningState
              message={statusMessage}
              isKu={isKu}
              elapsedSeconds={Math.max(0, Math.round((Date.now() - activeScan.startedAt) / 1000))}
            />
          ) : result ? (
            <ResultsView
              result={result}
              grouped={groupedMatches}
              expandedIds={expandedMatchIds}
              onToggle={toggleExpand}
              onSave={saveToTracker}
              isKu={isKu}
            />
          ) : (
            <EmptyState isKu={isKu} hasProfile={Boolean(profile)} />
          )}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
      <div className="font-mono text-xl font-bold text-slate-950">{value}</div>
      <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </div>
    </div>
  );
}

function NumericField({
  label,
  value,
  min,
  max,
  step,
  disabled,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  disabled?: boolean;
  onChange: (next: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-600">{label}</span>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={(event) => {
          const parsed = Number(event.target.value);
          if (Number.isFinite(parsed)) {
            onChange(Math.max(min, Math.min(max, Math.round(parsed))));
          }
        }}
        className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition-colors focus:border-blue-400 focus:bg-white disabled:opacity-50"
      />
    </label>
  );
}

function RunningState({
  message,
  elapsedSeconds,
  isKu,
}: {
  message: string;
  elapsedSeconds: number;
  isKu: boolean;
}) {
  const mm = Math.floor(elapsedSeconds / 60);
  const ss = elapsedSeconds % 60;
  const elapsed = `${mm}:${ss.toString().padStart(2, "0")}`;
  return (
    <div className="flex h-full min-h-[380px] flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="relative">
        <div className="absolute inset-0 animate-ping rounded-full bg-blue-300/40" />
        <div className="relative flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg">
          <Loader2 className="size-7 animate-spin" aria-hidden />
        </div>
      </div>
      <div>
        <h3 className="flex items-center justify-center gap-2 text-base font-semibold text-slate-950">
          <Bot className="size-4 text-blue-700" aria-hidden />
          {isKu ? "ئاژانسەکە کار دەکات" : "Agent is working"}
        </h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">{message}</p>
        <p className="mt-3 font-mono text-[11px] text-slate-400">
          {isKu ? "کاتی تێپەڕیو" : "Elapsed"} · {elapsed}
        </p>
      </div>
      <p className="max-w-sm text-[11px] leading-5 text-slate-400">
        {isKu
          ? "تۆ ئەتوانیت ئەم پەڕەیە دابخەیت — کاتێک گەڕایتەوە، ئاژانسەکە لێرە بەردەوامە."
          : "You can leave this page open or come back later — the scan resumes when you return."}
      </p>
    </div>
  );
}

function EmptyState({ isKu, hasProfile }: { isKu: boolean; hasProfile: boolean }) {
  return (
    <div className="flex h-full min-h-[380px] flex-col items-center justify-center gap-3 px-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
        <Bot className="size-7" aria-hidden />
      </div>
      <h3 className="text-base font-semibold text-slate-950">
        {isKu ? "ئامادە بۆ سکانکردن" : "Ready to scan"}
      </h3>
      <p className="max-w-md text-sm leading-6 text-slate-600">
        {isKu
          ? "کەناڵە تێلێگرامەکانت بنوسە و دوگمەی دەستپێکردن دابگرە. ئاژانسەکە نوێترین پۆستەکان دەخوێنێتەوە و ئەو کارانە دەنوێنێت کە لەگەڵ یادگەکەت دەگونجێن."
          : "Add a few Telegram job channels and hit Run. The agent will browse the public web preview of each channel, read the most recent posts, and surface roles that match your memory."}
      </p>
      {!hasProfile && (
        <p className="text-xs text-amber-700">
          {isKu
            ? "ئەمە کاتێک کار دەکات کە یادگەکەت دروستکرابێت."
            : "This only works once your professional memory exists."}
        </p>
      )}
    </div>
  );
}

function ResultsView({
  result,
  grouped,
  expandedIds,
  onToggle,
  onSave,
  isKu,
}: {
  result: TelegramJobScanResult;
  grouped: Record<"A" | "B" | "C", TelegramJobMatch[]>;
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
  onSave: (m: TelegramJobMatch) => void;
  isKu: boolean;
}) {
  const tierOrder: Array<"A" | "B" | "C"> = ["A", "B", "C"];

  if (result.matches.length === 0) {
    return (
      <div className="flex h-full min-h-[380px] flex-col items-center justify-center gap-3 px-6 text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
          <Briefcase className="size-7" aria-hidden />
        </div>
        <h3 className="text-base font-semibold text-slate-950">
          {isKu ? "هیچ ئەنجامێک نییە" : "No matches this run"}
        </h3>
        <p className="max-w-md text-sm leading-6 text-slate-600">
          {result.stats.notes ||
            (isKu
              ? "هەوڵ بدە کەناڵی تر زیاد بکەیت یان ڕۆڵی ئامانج بگۆڕیت."
              : "Try adding different channels or adjusting the target role and run again.")}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-3">
        <div className="text-xs font-medium text-slate-600">
          {isKu
            ? `${result.stats.channelsScanned} کەناڵ • ${result.stats.messagesRead} پۆست خوێنرایەوە`
            : `Scanned ${result.stats.channelsScanned} channel${
                result.stats.channelsScanned === 1 ? "" : "s"
              } • read ${result.stats.messagesRead} posts`}
          {result.stats.channelsFailed > 0 && (
            <span className="ms-2 text-rose-600">
              {isKu
                ? `(${result.stats.channelsFailed} نەگەیشت)`
                : `(${result.stats.channelsFailed} unreachable)`}
            </span>
          )}
        </div>
        {result.stats.notes && (
          <p className="text-[11px] italic text-slate-500">{result.stats.notes}</p>
        )}
      </div>

      {tierOrder
        .filter((tier) => grouped[tier].length > 0)
        .map((tier) => (
          <div key={tier}>
            <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <span className={`size-2 rounded-full ${TIER_META[tier].dot}`} aria-hidden />
              {isKu ? TIER_META[tier].labelKu : TIER_META[tier].label}
              <span className="text-slate-400">·</span>
              <span className="text-slate-400">{grouped[tier].length}</span>
            </h3>
            <div className="space-y-3">
              {grouped[tier].map((match, idx) => {
                const id = `${tier}-${idx}-${match.title}`;
                const expanded = expandedIds.has(id);
                return (
                  <MatchCard
                    key={id}
                    id={id}
                    match={match}
                    tier={tier}
                    expanded={expanded}
                    onToggle={() => onToggle(id)}
                    onSave={() => onSave(match)}
                    isKu={isKu}
                  />
                );
              })}
            </div>
          </div>
        ))}
    </div>
  );
}

function MatchCard({
  match,
  tier,
  expanded,
  onToggle,
  onSave,
  isKu,
}: {
  id: string;
  match: TelegramJobMatch;
  tier: "A" | "B" | "C";
  expanded: boolean;
  onToggle: () => void;
  onSave: () => void;
  isKu: boolean;
}) {
  const meta = TIER_META[tier];
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-[0_8px_24px_-16px_rgba(15,23,42,0.18)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="truncate text-base font-semibold text-slate-950">{match.title}</h4>
            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${meta.color}`}
            >
              {tier}
            </span>
            <span className="font-mono text-[11px] text-slate-500">{match.score}/100</span>
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
            {match.company && <span className="font-medium text-slate-700">{match.company}</span>}
            {match.location && <span>• {match.location}</span>}
            <span className="font-mono">{match.channel}</span>
            {match.postedAt && <span>• {match.postedAt}</span>}
            {match.language && (
              <span className="rounded-full bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] uppercase text-slate-600">
                {match.language}
              </span>
            )}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {match.link && (
            <a
              href={match.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 transition-colors hover:border-blue-400 hover:text-blue-700"
            >
              {isKu ? "کردنەوە" : "Open"}
            </a>
          )}
          <button
            type="button"
            onClick={onSave}
            className="inline-flex items-center gap-1 rounded-lg bg-blue-700 px-2.5 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-blue-800"
          >
            <BadgeCheck className="size-3.5" aria-hidden />
            {isKu ? "پاشەکەوت" : "Save"}
          </button>
        </div>
      </div>

      <p className="mt-3 text-[13px] leading-6 text-slate-700">
        <span className="font-semibold text-slate-900">
          {isKu ? "بۆچی گونجاوە: " : "Why it fits: "}
        </span>
        {match.whyFit}
      </p>

      <button
        type="button"
        onClick={onToggle}
        className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 transition-colors hover:text-slate-900"
      >
        {expanded ? <ChevronUp className="size-3.5" aria-hidden /> : <ChevronDown className="size-3.5" aria-hidden />}
        {expanded
          ? isKu
            ? "شاردنەوەی پۆستەکە"
            : "Hide post"
          : isKu
          ? "بینینی پۆستەکە"
          : "Show post"}
      </button>

      {expanded && (
        <div className="mt-3 space-y-3">
          <pre className="whitespace-pre-wrap rounded-xl border border-slate-100 bg-slate-50 p-3 text-[12px] leading-6 text-slate-700">
            {match.snippet}
          </pre>
          {match.skillGap && match.skillGap.length > 0 && (
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                {isKu ? "بۆشایی شارەزایی" : "Skill gaps"}
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {match.skillGap.map((s, i) => (
                  <span
                    key={`${s}-${i}`}
                    className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-800"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
