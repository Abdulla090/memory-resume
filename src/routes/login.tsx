import { createFileRoute, Link } from "@tanstack/react-router";
import { SignIn } from "@clerk/tanstack-react-start";
import { AuthFormLayout } from "@/components/auth/AuthFormLayout";
import { memoryCvClerkAppearance } from "@/components/auth/clerk-appearance";
import { useAuth } from "@/components/auth/AuthProvider";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — MemoryCV" },
      { name: "description", content: "Sign in to MemoryCV to build, tailor and export AI-powered resumes." },
      { property: "og:title", content: "Sign in — MemoryCV" },
      { property: "og:description", content: "Sign in to MemoryCV to build, tailor and export AI-powered resumes." },
      { property: "og:url", content: "/login" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/login" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { clerkEnabled } = useAuth();
  const language = useAppStore((s) => s.language);
  const isKu = language === "ku";

  if (!clerkEnabled) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold">{isKu ? "هەژمار" : "Accounts"}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {isKu
            ? "کلێرک ڕێکنەخراوە. داتاکان لە وێبگەڕەکەتدا دەمێننەوە."
            : "Clerk is not configured. Your data stays in this browser."}
        </p>
        <Link to="/dashboard" className="mt-6 inline-block text-primary underline">
          {isKu ? "گەڕانەوە" : "Back to dashboard"}
        </Link>
      </div>
    );
  }

  return (
    <AuthFormLayout
      isKu={isKu}
      title={isKu ? "چوونەژوورەوە" : "Sign in"}
      subtitle={
        isKu
          ? "بە گووگڵ یان ئیمەیڵ — دەستگەیشتن بە سیڤی و پڕۆفایلەکەت"
          : "Continue with Google or email — access your resumes and profile"
      }
      footer={
        <Link to="/signup" className="font-semibold text-primary underline-offset-2 hover:underline">
          {isKu ? "هەژمارت نییە؟ تۆمار بکە" : "Need an account? Sign up"}
        </Link>
      }
    >
      <SignIn
        routing="path"
        path="/login"
        signUpUrl="/signup"
        fallbackRedirectUrl="/dashboard"
        signUpFallbackRedirectUrl="/dashboard"
        appearance={memoryCvClerkAppearance}
      />
    </AuthFormLayout>
  );
}
