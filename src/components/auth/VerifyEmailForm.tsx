import { useClerk } from "@clerk/tanstack-react-start";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

type VerifyEmailFormProps = {
  isKu: boolean;
  emailHint?: string;
};

export function VerifyEmailForm({ isKu, emailHint }: VerifyEmailFormProps) {
  const { client, loaded, setActive } = useClerk();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loaded || !client) return;
    setError("");
    setBusy(true);
    try {
      const result = await client.signUp.attemptEmailAddressVerification({ code: code.trim() });
      if (result.status === "complete" && result.createdSessionId) {
        await setActive({ session: result.createdSessionId });
        navigate({ to: "/onboarding" });
        return;
      }
      setError(isKu ? "کۆدەکە هەڵەیە" : "Invalid or expired code");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setBusy(false);
    }
  };

  const resend = async () => {
    if (!client) return;
    try {
      await client.signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not resend code");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {emailHint && (
        <p className="text-sm text-muted-foreground">
          {isKu ? `کۆد نێردرا بۆ ${emailHint}` : `Code sent to ${emailHint}`}
        </p>
      )}
      <input
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        required
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm tracking-widest"
        placeholder={isKu ? "کۆدی ٦ ژمارە" : "6-digit code"}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
      <button
        type="submit"
        disabled={busy || !loaded}
        className="w-full rounded-xl gradient-bg py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
      >
        {busy ? "…" : isKu ? "پشتڕاستکردنەوە" : "Verify email"}
      </button>
      <button type="button" onClick={() => void resend()} className="w-full text-sm text-primary underline">
        {isKu ? "دووبارە ناردنی کۆد" : "Resend code"}
      </button>
    </form>
  );
}
