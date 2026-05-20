import { createFileRoute } from "@tanstack/react-router";
import { SignUp } from "@clerk/tanstack-react-start";
import { AuthFormLayout } from "@/components/auth/AuthFormLayout";
import { memoryCvClerkAppearance } from "@/components/auth/clerk-appearance";
import { useAppStore } from "@/lib/store";

/** Handles /signup/sso-callback and other Clerk sign-up subpaths. */
export const Route = createFileRoute("/signup/$")({
  component: SignUpCallbackPage,
});

function SignUpCallbackPage() {
  const isKu = useAppStore((s) => s.language) === "ku";

  return (
    <AuthFormLayout
      isKu={isKu}
      title={isKu ? "تۆمارکردن" : "Create account"}
      subtitle={isKu ? "تەواوکردنی چوونەژوورەوە..." : "Finishing sign-up…"}
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
