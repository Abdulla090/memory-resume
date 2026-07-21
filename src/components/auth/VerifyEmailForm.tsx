import { useClerk } from "@clerk/tanstack-react-start";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

type VerifyEmailFormProps = {
  isKu: boolean;
  emailHint?: string;
};

const inputCls =
  "w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-2.5 text-sm text-[#0f172a] outline-none transition-all duration-150 placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15";

const btnPrimaryCls =
  "w-full rounded-xl bg-[#2563eb] py-2.5 px-4 text-sm font-semibold text-white shadow-[0_2px_12px_-2px_rgba(37,99,235,0.45)] transition-all duration-150 hover:bg-[#1d4ed8] hover:shadow-[0_4px_16px_-2px_rgba(37,99,235,0.55)] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed";

export function VerifyEmailForm({ isKu, emailHint }: VerifyEmailFormProps) {
  const { client, loaded, setActive } = useClerk();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [resent, setResent] = useState(false);

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
      setError(isKu ? "کۆدەکە هەڵەیە یان کاتی تێپەڕیوە" : "Invalid or expired code");
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
      setResent(true);
      setTimeout(() => setResent(false), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not resend code");
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      {emailHint && (
        <p className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-2.5 text-sm text-[#64748b]">
          {isKu ? `کۆد نێردرا بۆ` : "Code sent to"}{" "}
          <span className="font-semibold text-[#0f172a]">{emailHint}</span>
        </p>
      )}

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#475569]">
          {isKu ? "کۆدی پشتڕاستکردنەوە" : "Verification code"}
        </label>
        <input
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className={`${inputCls} text-center text-lg font-bold tracking-[0.25em]`}
          placeholder={isKu ? "٠٠٠٠٠٠" : "000000"}
          maxLength={6}
        />
      </div>

      {error && (
        <p className="rounded-xl border border-[#fecaca] bg-[#fef2f2] px-3 py-2 text-xs font-medium text-[#dc2626]">
          {error}
        </p>
      )}

      <button type="submit" disabled={busy || !loaded} className={btnPrimaryCls}>
        {busy ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            {isKu ? "چاوەڕوانبە..." : "Verifying…"}
          </span>
        ) : isKu ? "پشتڕاستکردنەوەی ئیمەیڵ" : "Verify email"}
      </button>

      <button
        type="button"
        onClick={() => void resend()}
        className="text-center text-sm font-medium text-[#2563eb] underline-offset-2 transition-colors hover:underline"
      >
        {resent
          ? (isKu ? "کۆد دووبارە نێردرا ✓" : "Code resent ✓")
          : (isKu ? "دووبارە ناردنی کۆد" : "Resend code")}
      </button>
    </form>
  );
}
