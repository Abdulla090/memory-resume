import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  Sparkles,
  ArrowLeft,
  Download,
  Wand2,
  Target,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { useAppStore } from "@/lib/store";
import { improveBullet, tailorToJob } from "@/lib/ai.functions";
import { ResumePreview } from "@/components/resume/templates";
import { exportResumePDF } from "@/components/resume/pdf-templates";
import type { ResumeData, TemplateId, ExperienceItem } from "@/lib/types";

export const Route = createFileRoute("/resume/$id")({
  head: () => ({
    meta: [
      { title: "Resume Editor — MemoryCV" },
      { name: "description", content: "Edit, tailor, and export your resume." },
    ],
  }),
  component: ResumeEditor,
});

function ResumeEditor() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const resume = useAppStore((s) => s.resumes.find((r) => r.id === id));
  const updateResume = useAppStore((s) => s.updateResume);
  const improveFn = useServerFn(improveBullet);
  const tailorFn = useServerFn(tailorToJob);

  const [tailorOpen, setTailorOpen] = useState(false);
  const [jd, setJd] = useState("");
  const [tailoring, setTailoring] = useState(false);
  const [exporting, setExporting] = useState(false);

  if (!resume) {
    return (
      <div className="flex min-h-screen items-center justify-center text-center">
        <div>
          <p className="text-muted-foreground">Resume not found.</p>
          <button
            onClick={() => navigate({ to: "/dashboard" })}
            className="mt-4 rounded-full gradient-bg px-5 py-2 text-sm text-primary-foreground"
          >
            Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  const data = resume.data;

  const updateData = (patch: Partial<ResumeData>) =>
    updateResume(id, { data: { ...data, ...patch } });

  const setTemplate = (template: TemplateId) => updateResume(id, { template });

  const updateExperience = (i: number, patch: Partial<ExperienceItem>) => {
    const next = [...data.experience];
    next[i] = { ...next[i], ...patch };
    updateData({ experience: next });
  };

  const updateAchievement = (expIdx: number, achIdx: number, value: string) => {
    const next = [...data.experience];
    const ach = [...next[expIdx].achievements];
    ach[achIdx] = value;
    next[expIdx] = { ...next[expIdx], achievements: ach };
    updateData({ experience: next });
  };

  const handleImprove = async (
    expIdx: number,
    achIdx: number,
    mode: "impact" | "technical" | "quantify" | "concise",
  ) => {
    const original = data.experience[expIdx].achievements[achIdx];
    toast.loading("AI improving…", { id: "improve" });
    try {
      const { bullet } = await improveFn({
        data: { bullet: original, jobTitle: data.title, mode },
      });
      updateAchievement(expIdx, achIdx, bullet);
      toast.success("Improved", { id: "improve" });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed", { id: "improve" });
    }
  };

  const handleTailor = async () => {
    if (jd.trim().length < 20) {
      toast.error("Paste a longer job description.");
      return;
    }
    setTailoring(true);
    try {
      const { resume: tailored } = await tailorFn({
        data: { resume: data, jobDescription: jd },
      });
      updateData(tailored);
      toast.success("Resume tailored to JD");
      setTailorOpen(false);
      setJd("");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally {
      setTailoring(false);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      await exportResumePDF(
        data,
        resume.template,
        `${data.name.replace(/\s+/g, "_")}_${resume.title.slice(0, 30).replace(/\s+/g, "_")}`,
      );
      toast.success("PDF downloaded");
    } catch (e) {
      toast.error("PDF export failed");
      console.error(e);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border hover:bg-surface"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-display text-base font-semibold">{resume.title}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-full border border-border p-0.5">
              {(["minimal", "executive"] as TemplateId[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTemplate(t)}
                  className={`rounded-full px-3 py-1 text-xs capitalize transition-colors ${
                    resume.template === t
                      ? "bg-surface-elevated text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <button
              onClick={() => setTailorOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs hover:bg-surface"
            >
              <Target className="h-3.5 w-3.5" /> Tailor to JD
            </button>
            <button
              onClick={handleExport}
              disabled={exporting}
              className="inline-flex items-center gap-1.5 rounded-full gradient-bg px-4 py-1.5 text-xs font-medium text-primary-foreground"
            >
              {exporting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Download className="h-3.5 w-3.5" />
              )}
              Export PDF
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] gap-6 px-4 py-6 lg:grid-cols-2">
        {/* Editor */}
        <div className="space-y-5 lg:max-h-[calc(100vh-100px)] lg:overflow-y-auto lg:pr-2">
          <Card title="Header">
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                label="Name"
                value={data.name}
                onChange={(v) => updateData({ name: v })}
              />
              <Input
                label="Title"
                value={data.title}
                onChange={(v) => updateData({ title: v })}
              />
              <Input
                label="Email"
                value={data.email ?? ""}
                onChange={(v) => updateData({ email: v })}
              />
              <Input
                label="Phone"
                value={data.phone ?? ""}
                onChange={(v) => updateData({ phone: v })}
              />
              <Input
                label="Location"
                value={data.location ?? ""}
                onChange={(v) => updateData({ location: v })}
              />
            </div>
          </Card>

          <Card title="Summary">
            <textarea
              value={data.summary}
              onChange={(e) => updateData({ summary: e.target.value })}
              rows={4}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </Card>

          <Card title="Experience">
            <div className="space-y-4">
              {data.experience.map((e, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-surface p-3"
                >
                  <div className="grid gap-2 sm:grid-cols-2">
                    <input
                      value={e.title}
                      onChange={(ev) => updateExperience(i, { title: ev.target.value })}
                      className="rounded-md border border-border bg-background px-2 py-1.5 text-sm font-semibold outline-none focus:border-primary"
                    />
                    <input
                      value={e.company}
                      onChange={(ev) => updateExperience(i, { company: ev.target.value })}
                      className="rounded-md border border-border bg-background px-2 py-1.5 text-sm outline-none focus:border-primary"
                    />
                  </div>
                  <input
                    value={e.duration}
                    onChange={(ev) => updateExperience(i, { duration: ev.target.value })}
                    className="mt-2 w-full rounded-md border border-border bg-background px-2 py-1.5 text-xs text-muted-foreground outline-none focus:border-primary"
                  />
                  <div className="mt-3 space-y-1.5">
                    {e.achievements.map((a, j) => (
                      <div key={j} className="group flex items-start gap-1.5">
                        <span className="mt-2 text-muted-foreground">•</span>
                        <textarea
                          value={a}
                          onChange={(ev) => updateAchievement(i, j, ev.target.value)}
                          rows={2}
                          className="flex-1 resize-none rounded-md border border-transparent bg-transparent px-2 py-1 text-sm outline-none hover:border-border focus:border-primary"
                        />
                        <div className="flex flex-col gap-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                          <BulletAction
                            label="Impact"
                            onClick={() => handleImprove(i, j, "impact")}
                          />
                          <BulletAction
                            label="Quantify"
                            onClick={() => handleImprove(i, j, "quantify")}
                          />
                          <BulletAction
                            label="Concise"
                            onClick={() => handleImprove(i, j, "concise")}
                          />
                        </div>
                        <button
                          onClick={() => {
                            const next = [...data.experience];
                            next[i] = {
                              ...next[i],
                              achievements: next[i].achievements.filter(
                                (_, k) => k !== j,
                              ),
                            };
                            updateData({ experience: next });
                          }}
                          className="mt-1 text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const next = [...data.experience];
                        next[i] = {
                          ...next[i],
                          achievements: [...next[i].achievements, "New achievement"],
                        };
                        updateData({ experience: next });
                      }}
                      className="ml-3 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                    >
                      <Plus className="h-3 w-3" /> Add bullet
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Skills">
            <textarea
              value={data.skills.join(", ")}
              onChange={(e) =>
                updateData({
                  skills: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
              rows={3}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </Card>
        </div>

        {/* Live preview */}
        <div className="lg:max-h-[calc(100vh-100px)] lg:overflow-y-auto">
          <div className="rounded-2xl border border-border bg-neutral-200 p-4 shadow-2xl">
            <div className="origin-top scale-[0.85] overflow-hidden rounded-md shadow-xl">
              <ResumePreview data={data} template={resume.template} />
            </div>
          </div>
        </div>
      </div>

      {/* Tailor modal */}
      {tailorOpen && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-background/80 p-4 backdrop-blur"
          onClick={() => setTailorOpen(false)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl border border-border bg-surface p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="font-display text-xl font-semibold">Tailor to a job</h3>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Paste the job description. AI will rewrite this resume to match.
            </p>
            <textarea
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              placeholder="Paste the full job description here…"
              rows={10}
              className="mt-4 w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setTailorOpen(false)}
                className="rounded-full border border-border px-4 py-2 text-sm hover:bg-surface-elevated"
              >
                Cancel
              </button>
              <button
                onClick={handleTailor}
                disabled={tailoring}
                className="inline-flex items-center gap-2 rounded-full gradient-bg px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
              >
                {tailoring ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="h-4 w-4" />
                )}
                Tailor resume
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-surface/60 p-4 backdrop-blur">
      <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </div>
      {children}
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div className="mb-1 text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-border bg-surface px-2.5 py-1.5 text-sm outline-none focus:border-primary"
      />
    </div>
  );
}

function BulletAction({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      title={`AI: ${label}`}
      className="rounded-md border border-border bg-surface px-1.5 py-0.5 text-[10px] text-muted-foreground hover:border-primary hover:text-foreground"
    >
      {label}
    </button>
  );
}
