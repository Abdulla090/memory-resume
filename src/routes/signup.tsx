import { createFileRoute, Link } from "@tanstack/react-router";
import { SignUp } from "@clerk/tanstack-react-start";
import { AuthFormLayout } from "@/components/auth/AuthFormLayout";
import { memoryCvClerkAppearance } from "@/components/auth/clerk-appearance";
import { useAuth } from "@/components/auth/AuthProvider";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create an account — MemoryCV" },
      { name: "description", content: "Start building an ATS-ready resume with MemoryCV — free to try, no credit card required." },
      { property: "og:title", content: "Create an account — MemoryCV" },
      { property: "og:description", content: "Start building an ATS-ready resume with MemoryCV — free to try, no credit card required." },
      { property: "og:url", content: "/signup" },
    ],
    links: [{ rel: "canonical", href: "/signup" }],
  }),
  component: SignUpPage,
});

function SignUpPage() {
  const { clerkEnabled } = useAuth();
  const language = useAppStore((s) => s.language);
  const isKu = language === "ku";

  if (!clerkEnabled) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold">{isKu ? "تۆمارکردن" : "Sign up"}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {isKu ? "کلێرک ڕێکنەخراوە." : "Clerk is not configured."}
        </p>
        <Link to="/" className="mt-6 inline-block text-primary underline">
          {isKu ? "سەرەتا" : "Home"}
        </Link>
      </div>
    );
  }

  return (
    <AuthFormLayout
      isKu={isKu}
      title={isKu ? "تۆمارکردن" : "Create account"}
      subtitle={
        isKu
          ? "بە گووگڵ یان ئیمەیڵ — سیڤییەکانت لە هەور پاشەکەوت دەبن"
          : "Continue with Google or email — your resumes sync to the cloud"
      }
      footer={
        <Link to="/login" className="font-semibold text-primary underline-offset-2 hover:underline">
          {isKu ? "هەژمارت هەیە؟ چوونەژوورەوە" : "Already have an account? Sign in"}
        </Link>
      }
    >
      <SignUp
        routing="path"
        path="/signup"
        signInUrl="/login"
        fallbackRedirectUrl="/dashboard"
        signInFallbackRedirectUrl="/dashboard"
        appearance={memoryCvClerkAppearance}
      />
    </AuthFormLayout>
  );
}
