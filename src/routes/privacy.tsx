import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-semibold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: May 2026</p>
      <div className="mt-8 space-y-4 text-sm text-foreground/90">
        <p>
          MemoryCV stores resume and profile data in your browser (localStorage) unless you enable
          optional cloud sync with Supabase. AI features send only the data required for each request
          to our server, which forwards it to Google Gemini when configured.
        </p>
        <h2 className="text-lg font-semibold">Data we process</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Resume content you enter or import</li>
          <li>Optional account email if you sign up for cloud sync</li>
          <li>Server logs: route name and duration (no full resume text in logs)</li>
        </ul>
        <h2 className="text-lg font-semibold">Your choices</h2>
        <p>
          Export your data as JSON from Settings, or clear browser storage. Signed-in users can delete
          cloud data from the Supabase dashboard or contact support.
        </p>
        <p>
          <Link to="/" className="text-primary underline">
            Back home
          </Link>
        </p>
      </div>
    </div>
  );
}
