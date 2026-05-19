import { createFileRoute, Link } from "@tanstack/react-router";
import { SignIn } from "@clerk/tanstack-react-start";
import { AuthFormLayout } from "@/components/auth/AuthFormLayout";
import { memoryCvClerkAppearance } from "@/components/auth/clerk-appearance";
import { useAuth } from "@/components/auth/AuthProvider";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/login")({
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
      title={isKu ? "چوونەژوورەوە" : "Sign in"}
      subtitle={
        isKu ? "بە هەژمارەکەت بچۆرە ژوورەوە" : "Access your cloud-backed resumes and profile"
      }
      footer={
        <Link to="/signup" className="text-primary underline">
          {isKu ? "هەژمارت نییە؟ تۆمار بکە" : "Need an account? Sign up"}
        </Link>
      }
    >
      <SignIn
        routing="path"
        path="/login"
        signUpUrl="/signup"
        forceRedirectUrl="/dashboard/settings"
        appearance={memoryCvClerkAppearance}
      />
    </AuthFormLayout>
  );
}
