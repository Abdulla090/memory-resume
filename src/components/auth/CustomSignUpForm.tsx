import { useClerk } from "@clerk/tanstack-react-start";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

type CustomSignUpFormProps = {
  isKu: boolean;
};

const inputCls =
  "w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-2.5 text-sm text-[#0f172a] outline-none transition-all duration-150 placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15";

const btnPrimaryCls =
  "w-full rounded-xl bg-[#2563eb] py-2.5 px-4 text-sm font-semibold text-white shadow-[0_2px_12px_-2px_rgba(37,99,235,0.45)] transition-all duration-150 hover:bg-[#1d4ed8] hover:shadow-[0_4px_16px_-2px_rgba(37,99,235,0.55)] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed";

const labelCls = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#475569]";

export function CustomSignUpForm({ isKu }: CustomSignUpFormProps) {
  const { client, loaded } = useClerk();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [loadTimedOut, setLoadTimedOut] = useState(false);

  useEffect(() => {
    if (loaded) {
      setLoadTimedOut(false);
      return;
    }
    const t = window.setTimeout(() => setLoadTimedOut(true), 12_000);
    return () => window.clearTimeout(t);
  }, [loaded]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loaded || !client) return;
    if (firstName.trim().length < 1) {
      setError(isKu ? "ناو پێویستە" : "First name is required");
      return;
    }
    setError("");
    setBusy(true);
    try {
      await client.signUp.create({
        emailAddress: email.trim(),
        password,
        firstName: firstName.trim(),
        lastName: lastName.trim() || undefined,
        username: username.trim() || undefined,
      });
      await client.signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      navigate({ to: "/verify-email", search: { email: email.trim() } });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Sign-up failed";
      if (msg.toLowerCase().includes("username")) {
        setError(
          isKu
            ? "ناوی بەکارهێنەر بەکارهاتووە یان لە Clerk چالاک نەکراوە"
            : "Username taken or not enabled in Clerk settings",
        );
      } else {
        setError(msg);
      }
    } finally {
      setBusy(false);
    }
  };

  if (!loaded) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#64748b]">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#e2e8f0] border-t-[#2563eb]" />
          {isKu ? "بارکردن..." : "Loading…"}
        </div>
        {loadTimedOut && (
          <p className="rounded-xl border border-[#fecaca] bg-[#fef2f2] px-3 py-2 text-xs text-[#dc2626]">
            {isKu
              ? "کلێرک بار نەکرا. پەڕەکە نوێ بکەرەوە."
              : "Clerk did not load. Refresh the page, or add your domain in Clerk Dashboard → Domains."}
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3.5">
      {/* Name row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>
            {isKu ? "ناوی یەکەم" : "First name"} <span className="text-[#ef4444]">*</span>
          </label>
          <input
            required
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={inputCls}
            placeholder={isKu ? "ناو" : "Alex"}
          />
        </div>
        <div>
          <label className={labelCls}>{isKu ? "ناوی کۆتایی" : "Last name"}</label>
          <input
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={inputCls}
            placeholder={isKu ? "دڵخواز" : "Optional"}
          />
        </div>
      </div>

      {/* Username */}
      <div>
        <label className={labelCls}>
          {isKu ? "ناوی بەکارهێنەر" : "Username"}{" "}
          <span className="normal-case font-normal tracking-normal text-[#94a3b8]">
            ({isKu ? "ئارەزوومەندانە" : "optional"})
          </span>
        </label>
        <input
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value.replace(/\s/g, ""))}
          className={inputCls}
          placeholder="alex_cv"
        />
      </div>

      {/* Email */}
      <div>
        <label className={labelCls}>{isKu ? "ئیمەیڵ" : "Email"} <span className="text-[#ef4444]">*</span></label>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputCls}
          placeholder="alex@example.com"
        />
      </div>

      {/* Password */}
      <div>
        <label className={labelCls}>{isKu ? "وشەی نهێنی" : "Password"} <span className="text-[#ef4444]">*</span></label>
        <input
          type="password"
          required
          autoComplete="new-password"
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputCls}
          placeholder={isKu ? "٨+ پیت" : "8+ characters"}
        />
      </div>

      {error && (
        <p className="rounded-xl border border-[#fecaca] bg-[#fef2f2] px-3 py-2 text-xs font-medium text-[#dc2626]">
          {error}
        </p>
      )}

      <button type="submit" disabled={busy} className={`${btnPrimaryCls} mt-1`}>
        {busy ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            {isKu ? "چاوەڕوانبە..." : "Creating account…"}
          </span>
        ) : isKu ? "دروستکردنی هەژمار" : "Create account"}
      </button>
    </form>
  );
}
