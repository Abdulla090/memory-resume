import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster, toast } from "sonner";
import { Settings, Key } from "lucide-react";
import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md gradient-bg px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MemoryCV — Your memory. Your career. Infinite resumes." },
      {
        name: "description",
        content:
          "Paste your AI memory from ChatGPT, Claude, or Gemini. Get tailored resumes for any job in seconds.",
      },
      { name: "author", content: "MemoryCV" },
      { property: "og:title", content: "MemoryCV — Infinite resumes from your AI memory" },
      {
        property: "og:description",
        content:
          "Turn your AI assistant memory into job-winning resumes. Tailored for any role in seconds.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=Nunito:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}


function ApiKeySettings() {
  const [open, setOpen] = useState(false);
  const { apiKey, setApiKey } = useAppStore();
  const [tempKey, setTempKey] = useState(apiKey || "");

  useEffect(() => {
    setTempKey(apiKey || "");
  }, [apiKey, open]);

  const handleSave = () => {
    setApiKey(tempKey);
    setOpen(false);
    if (tempKey) {
      toast.success("API Key saved");
    } else {
      toast.info("API Key cleared");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 left-4 z-50 p-3 bg-white border border-blue-100 rounded-full shadow-lg text-blue-600 hover:bg-blue-50 transition-colors"
        title="Set Gemini API Key"
      >
        <Key className="w-5 h-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl border border-blue-100 shadow-2xl w-full max-w-sm p-6 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600" aria-label="Close"
            ><Settings className="w-4 h-4" /></button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Gemini API Key</h3>
                <p className="text-xs text-slate-500">Provide your own key for AI</p>
              </div>
            </div>
            
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              To use the Gemini 3.1 Flash Lite model, enter your Google Gemini API key. This key is stored locally in your browser and is never sent to our servers.
            </p>

            <input
              type="password"
              placeholder="AIzaSy..."
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm shadow-blue-200"
              >
                Save Key
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function RootComponent() {
  return (
    <>
      <Outlet />
      <ApiKeySettings />
      <Toaster
        theme="light"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "oklch(0.985 0.004 95)",
            border: "1px solid oklch(0.89 0.008 95)",
            color: "oklch(0.23 0.02 228)",
            boxShadow: "0 20px 40px -24px rgba(18, 24, 38, 0.18)",
          },
        }}
      />
    </>
  );
}
