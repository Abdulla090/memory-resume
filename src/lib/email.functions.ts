import { createServerFn } from "@tanstack/react-start";
import { auth } from "@clerk/tanstack-react-start/server";
import { z } from "zod";

const emailInputSchema = z.object({
  to: z.string().email(),
  name: z.string().max(200).optional(),
});

function fromAddress(): string {
  return process.env.RESEND_FROM_EMAIL ?? "MemoryCV <onboarding@resend.dev>";
}

function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

type ResendSendResult = { id?: string; message?: string };

async function sendResendEmail(payload: {
  to: string;
  subject: string;
  html: string;
}): Promise<{ sent: true } | { sent: false; reason: "RESEND_NOT_CONFIGURED" }> {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return { sent: false, reason: "RESEND_NOT_CONFIGURED" };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress(),
      to: [payload.to],
      subject: payload.subject,
      html: payload.html,
    }),
  });

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = (await res.json()) as ResendSendResult;
      detail = body.message ?? detail;
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(detail || "Resend request failed");
  }

  return { sent: true };
}

export const sendWelcomeEmail = createServerFn({ method: "POST" })
  .inputValidator(emailInputSchema)
  .handler(async ({ data }) => {
    const { userId } = await auth();
    if (!userId) throw new Error("UNAUTHORIZED");

    const name = escapeHtml(data.name?.trim() || "there");
    const appUrl = process.env.APP_URL ?? "https://memorycv.app";

    return sendResendEmail({
      to: data.to,
      subject: "Welcome to MemoryCV",
      html: `
        <h1>Welcome, ${name}!</h1>
        <p>Your MemoryCV account is ready. Build tailored resumes from your AI memory and sync them to the cloud.</p>
        <p><a href="${escapeHtml(appUrl)}">Open MemoryCV</a></p>
      `,
    });
  });

export const sendAccountEmail = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      to: z.string().email(),
      subject: z.string().min(1).max(200),
      html: z.string().min(1).max(50_000),
    }),
  )
  .handler(async ({ data }) => {
    const { userId } = await auth();
    if (!userId) throw new Error("UNAUTHORIZED");

    return sendResendEmail({
      to: data.to,
      subject: data.subject,
      html: data.html,
    });
  });
