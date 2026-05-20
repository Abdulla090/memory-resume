/**
 * One-off test send via Resend HTTP API.
 * Usage (PowerShell): npm run email:test
 * Requires RESEND_API_KEY in .env
 */
const apiKey = process.env.RESEND_API_KEY?.trim();
if (!apiKey || apiKey === "re_xxxxxxxxx") {
  console.error(
    "Missing RESEND_API_KEY. Add it to .env:",
    "https://resend.com/api-keys",
  );
  process.exit(1);
}

const to = process.env.RESEND_TEST_TO ?? "abdullaazizb58@gmail.com";
const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

const res = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    from,
    to: [to],
    subject: "Hello World",
    html: "<p>Congrats on sending your first email!</p>",
  }),
});

if (!res.ok) {
  let detail = res.statusText;
  try {
    const body = await res.json();
    detail = body.message ?? detail;
  } catch {
    // ignore
  }
  console.error("Failed:", detail);
  process.exit(1);
}

const data = await res.json();
console.log("Sent:", data.id);
