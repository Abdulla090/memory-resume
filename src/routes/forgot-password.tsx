import { createFileRoute, Link } from "@tanstack/react-router";
import { SignIn } from "@clerk/tanstack-react-start";
import { AuthFormLayout } from "@/components/auth/AuthFormLayout";
import { memoryCvClerkAppearance } from "@/components/auth/clerk-appearance";
import { useAppStore } from "@/lib/store";

/** Password reset is handled inside Clerk SignIn (reset flow). */
export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const language = useAppStore((s) => s.language);
  const isKu = language === "ku";

  return (
    <AuthFormLayout
      title={isKu ? "گۆڕینی وشەی نهێنی" : "Reset password"}
      subtitle={
        isKu
          ? "ئیمەیڵەکەت بنووسە — Clerk کۆدەکەت بۆ دەنێرێت (ڕێکخستنی Resend SMTP پێشنیار دەکرێت)"
          : "Use your email to reset your password (configure Resend SMTP in Clerk for branded mail)"
      }
      footer={
        <Link to="/login" className="text-primary underline">
          {isKu ? "گەڕانەوە بۆ چوونەژوورەوە" : "Back to sign in"}
        </Link>
      }
    >
      <SignIn
        routing="path"
        path="/forgot-password"
        signUpUrl="/signup"
        appearance={memoryCvClerkAppearance}
      />
    </AuthFormLayout>
  );
}
