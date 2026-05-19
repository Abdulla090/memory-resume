import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthFormLayout } from "@/components/auth/AuthFormLayout";
import { CustomSignUpForm } from "@/components/auth/CustomSignUpForm";
import { useAuth } from "@/components/auth/AuthProvider";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/signup")({
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
      title={isKu ? "تۆمارکردن" : "Create account"}
      subtitle={
        isKu
          ? "ناو، ئیمەیڵ و وشەی نهێنی — داتاکان لە هەور پاشەکەوت دەبن"
          : "Name, email, and password — your resumes sync to the cloud"
      }
      footer={
        <Link to="/login" className="text-primary underline">
          {isKu ? "هەژمارت هەیە؟ چوونەژوورەوە" : "Already have an account? Sign in"}
        </Link>
      }
    >
      <CustomSignUpForm isKu={isKu} />
    </AuthFormLayout>
  );
}
