import { useEffect } from "react";
import { createRootRoute, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import { MotionConfig, LazyMotion, domAnimation } from "framer-motion";
import { Toaster } from "sonner";

import { ClerkProvider } from "@clerk/tanstack-react-start";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { useAppStore } from "@/lib/store";
import { initPerfMobileClass, useMobileOptimized } from "@/lib/performance";
import { initObservability } from "@/lib/observability";


import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-semibold text-foreground">404</h1>
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
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover",
      },
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
  const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined;

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body style={{ overflowX: "hidden", minHeight: "100dvh" }}>
        {clerkPublishableKey ? (
          <ClerkProvider
            publishableKey={clerkPublishableKey}
            signInUrl="/login"
            signUpUrl="/signup"
            signInFallbackRedirectUrl="/dashboard"
            signUpFallbackRedirectUrl="/dashboard"
          >
            <div style={{ overflowX: "hidden", position: "relative" }}>{children}</div>
          </ClerkProvider>
        ) : (
          <div style={{ overflowX: "hidden", position: "relative" }}>{children}</div>
        )}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const mobileOptimized = useMobileOptimized();

  useEffect(() => {
    void initObservability();
    initPerfMobileClass();
  }, []);

  useEffect(() => {
    if (import.meta.env.DEV && !mobileOptimized) {
      void import("react-grab");
    }
  }, [mobileOptimized]);

  const resumes = useAppStore((state) => state.resumes);
  const addResume = useAppStore((state) => state.addResume);
  const deleteResume = useAppStore((state) => state.deleteResume);
  const setLanguage = useAppStore((state) => state.setLanguage);

  useEffect(() => {
    // Clean up old seeds
    if (resumes.some((r) => r.id === "mansur-kurdish-cv" || r.id === "abdulla-aziz-en" || r.id === "abdulla-aziz-ku")) {
      deleteResume("mansur-kurdish-cv");
      deleteResume("abdulla-aziz-en");
      deleteResume("abdulla-aziz-ku");
    }

    if (!resumes.some((r) => r.id === "mohammed-masood-en" || r.id === "mohammed-masood-ku" || r.id === "ahmad-masood-en" || r.id === "ahmad-masood-ku")) {
      import("@/lib/seed-data").then(({ MOHAMMED_CV_EN, MOHAMMED_CV_KU, AHMAD_CV_EN, AHMAD_CV_KU }) => {
        if (!resumes.some((r) => r.id === "mohammed-masood-en")) {
          addResume(MOHAMMED_CV_EN);
        }
        if (!resumes.some((r) => r.id === "mohammed-masood-ku")) {
          addResume(MOHAMMED_CV_KU);
        }
        if (!resumes.some((r) => r.id === "ahmad-masood-en")) {
          addResume(AHMAD_CV_EN);
        }
        if (!resumes.some((r) => r.id === "ahmad-masood-ku")) {
          addResume(AHMAD_CV_KU);
        }
        setLanguage("ku");
      });
    }
  }, [resumes, addResume, deleteResume, setLanguage]);

  const language = useAppStore((state) => state.language);
  const dir = language === "ku" ? "rtl" : "ltr";

  useEffect(() => {
    // Only set lang — never set dir on <html> as it shifts the scrollbar
    // to the left on mobile, causing a horizontal viewport offset.
    // Each page applies dir on its own content wrapper instead.
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion={mobileOptimized ? "always" : "user"}>
        <AuthProvider>
          <Outlet />
        </AuthProvider>

      <Toaster
        theme="light"
        position="bottom-right"
        dir={dir}
        toastOptions={{
          style: {
            background: "oklch(0.985 0.004 95)",
            border: "1px solid oklch(0.89 0.008 95)",
            color: "oklch(0.23 0.02 228)",
            boxShadow: "0 20px 40px -24px rgba(18, 24, 38, 0.18)",
          },
        }}
      />
      </MotionConfig>
    </LazyMotion>
  );
}
