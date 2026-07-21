import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — MemoryCV" },
      { name: "description", content: "Terms governing use of MemoryCV's resume builder, AI tools, and account features." },
      { property: "og:title", content: "Terms of Service — MemoryCV" },
      { property: "og:description", content: "Terms governing use of MemoryCV's resume builder, AI tools, and account features." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-semibold">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: May 2026</p>
      <div className="mt-8 space-y-4 text-sm text-foreground/90">
        <p>
          MemoryCV is provided as-is for personal career and resume building. You are responsible for
          the accuracy of content you publish or submit to employers.
        </p>
        <p>
          Do not use the service to upload unlawful content or to abuse AI endpoints. We may rate-limit
          or suspend access that violates fair use.
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
