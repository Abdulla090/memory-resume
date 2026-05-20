import { createFileRoute } from "@tanstack/react-router";
import { SignIn } from "@clerk/tanstack-react-start";
import { AuthFormLayout } from "@/components/auth/AuthFormLayout";
import { memoryCvClerkAppearance } from "@/components/auth/clerk-appearance";
import { useAppStore } from "@/lib/store";

/** Handles /login/sso-callback and other Clerk sign-in subpaths. */
export const Route = createFileRoute("/login/$")({
  component: SignInCallbackPage,
});

function SignInCallbackPage() {
  const isKu = useAppStore((s) => s.language) === "ku";

  return (
    <AuthFormLayout
      isKu={isKu}
      title={isKu ? "چوونەژوورەوە" : "Sign in"}
      subtitle={isKu ? "تەواوکردنی چوونەژوورەوە..." : "Finishing sign-in…"}
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
