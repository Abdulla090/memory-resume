import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "lucide-react";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/dashboard/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);
  const apiKey = useAppStore((state) => state.apiKey ?? "");
  const setApiKey = useAppStore((state) => state.setApiKey);
  const isKu = language === "ku";

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
      <header>
        <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Settings className="size-6" aria-hidden />
        </div>
        <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
          {isKu ? "ڕێکخستنەکان" : "Settings"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {isKu
            ? "زمان و کلیلی API بۆ تایبەتمەندییەکانی AI."
            : "Language and optional API key for AI features."}
        </p>
      </header>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-foreground">
          {isKu ? "زمان" : "Language"}
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          {isKu ? "زمانێکی ڕووکار هەڵبژێرە." : "Choose your interface language."}
        </p>
        <div className="mt-4 inline-flex rounded-xl border border-border bg-muted/40 p-1">
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              language === "en"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setLanguage("ku")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              language === "ku"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            کوردی
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-foreground">
          {isKu ? "کلیلی Gemini (ئارەزوومەندانە)" : "Gemini API key (optional)"}
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          {isKu
            ? "ئەگەر سێرڤەرەکەت کلیلی ژینگەی هەبێت، پێویست نییە لێرە بنووسیت."
            : "Leave blank if your server already has GEMINI_API_KEY configured."}
        </p>
        <input
          type="password"
          autoComplete="off"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value.trim())}
          placeholder={isKu ? "کلیلەکەت لێرە بنووسە..." : "Paste your key here..."}
          className="mt-4 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground shadow-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
        />
      </section>
    </div>
  );
}
