import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthFormLayout } from "@/components/auth/AuthFormLayout";
import { VerifyEmailForm } from "@/components/auth/VerifyEmailForm";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/verify-email")({
  validateSearch: (search: Record<string, unknown>) => ({
    email: typeof search.email === "string" ? search.email : "",
  }),
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  const { email } = Route.useSearch();
  const language = useAppStore((s) => s.language);
  const isKu = language === "ku";

  return (
    <AuthFormLayout
      title={isKu ? "پشتڕاستکردنەوەی ئیمەیڵ" : "Verify your email"}
      subtitle={
        isKu ? "کۆدەکە بنووسە بۆ تەواوکردنی تۆمارکردن" : "Enter the code we sent to finish signing up"
      }
      footer={
        <Link to="/login" className="text-primary underline">
          {isKu ? "گەڕانەوە بۆ چوونەژوورەوە" : "Back to sign in"}
        </Link>
      }
    >
      <VerifyEmailForm isKu={isKu} emailHint={email || undefined} />
    </AuthFormLayout>
  );
}
