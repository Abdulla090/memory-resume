import { useClerk } from "@clerk/tanstack-react-start";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

type CustomSignUpFormProps = {
  isKu: boolean;
};

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

  const inputClass =
    "w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

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
      <div className="space-y-2 text-sm text-muted-foreground">
        <p>{isKu ? "بارکردن..." : "Loading..."}</p>
        {loadTimedOut && (
          <p className="text-destructive">
            {isKu
              ? "کلێرک بار نەکرا. پەڕەکە نوێ بکەرەوە یان لە Vercel دۆمەینەکەت زیاد بکە لە Clerk Dashboard → Domains."
              : "Clerk did not load. Refresh the page, or add your site URL under Clerk Dashboard → Domains (e.g. memory-resume.vercel.app)."}
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">
            {isKu ? "ناوی یەکەم" : "First name"} *
          </label>
          <input
            required
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={inputClass}
            placeholder={isKu ? "ناو" : "Alex"}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">
            {isKu ? "ناوی کۆتایی" : "Last name"}
          </label>
          <input
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={inputClass}
            placeholder={isKu ? "دڵخواز" : "Optional"}
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-muted-foreground">
          {isKu ? "ناوی بەکارهێنەر" : "Username"} ({isKu ? "ئارەزوومەندانە" : "optional"})
        </label>
        <input
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value.replace(/\s/g, ""))}
          className={inputClass}
          placeholder="alex_cv"
        />
      </div>
      <input
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
        placeholder="Email"
      />
      <input
        type="password"
        required
        autoComplete="new-password"
        minLength={8}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={inputClass}
        placeholder={isKu ? "وشەی نهێنی (٨+ پیت)" : "Password (8+ characters)"}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-xl gradient-bg py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
      >
        {busy ? "…" : isKu ? "دروستکردنی هەژمار" : "Create account"}
      </button>
    </form>
  );
}
