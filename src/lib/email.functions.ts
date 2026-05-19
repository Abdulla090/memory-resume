import { createServerFn } from "@tanstack/react-start";
import { auth } from "@clerk/tanstack-react-start/server";
import { Resend } from "resend";
import { z } from "zod";

const emailInputSchema = z.object({
  to: z.string().email(),
  name: z.string().max(200).optional(),
});

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function fromAddress(): string {
  return process.env.RESEND_FROM_EMAIL ?? "MemoryCV <onboarding@resend.dev>";
}

export const sendWelcomeEmail = createServerFn({ method: "POST" })
  .inputValidator(emailInputSchema)
  .handler(async ({ data }) => {
    const { userId } = await auth();
    if (!userId) throw new Error("UNAUTHORIZED");

    const resend = getResend();
    if (!resend) {
      return { sent: false, reason: "RESEND_NOT_CONFIGURED" as const };
    }

    const name = data.name?.trim() || "there";
    const { error } = await resend.emails.send({
      from: fromAddress(),
      to: data.to,
      subject: "Welcome to MemoryCV",
      html: `
        <h1>Welcome, ${name}!</h1>
        <p>Your MemoryCV account is ready. Build tailored resumes from your AI memory and sync them to the cloud.</p>
        <p><a href="${process.env.APP_URL ?? "https://memorycv.app"}">Open MemoryCV</a></p>
      `,
    });

    if (error) throw new Error(error.message);
    return { sent: true as const };
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

    const resend = getResend();
    if (!resend) return { sent: false, reason: "RESEND_NOT_CONFIGURED" as const };

    const { error } = await resend.emails.send({
      from: fromAddress(),
      to: data.to,
      subject: data.subject,
      html: data.html,
    });

    if (error) throw new Error(error.message);
    return { sent: true as const };
  });
