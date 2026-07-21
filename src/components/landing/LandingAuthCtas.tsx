import { Link, useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { landingCtaPath } from "@/lib/landing-cta";
import { useAppStore } from "@/lib/store";

type LandingAuthCtasProps = {
  language: "en" | "ku" | "ar";
  /** Primary button styles (Get started) */
  primaryClassName: string;
  /** Secondary link/button styles (Sign in) */
  secondaryClassName?: string;
  showSecondary?: boolean;
  primaryLabel?: string;
  secondaryLabel?: string;
  primaryId?: string;
};

export function LandingAuthCtas({
  language,
  primaryClassName,
  secondaryClassName,
  showSecondary = true,
  primaryLabel,
  secondaryLabel,
  primaryId,
}: LandingAuthCtasProps) {
  const navigate = useNavigate();
  const onboardingDone = useAppStore((s) => s.onboardingDone);
  const { clerkEnabled, isSignedIn } = useAuth();
  const isKu = language === "ku";
  const isAr = language === "ar";

  const primary =
    primaryLabel ??
    (isSignedIn
      ? isKu
        ? "داشبۆرد"
        : isAr
          ? "لوحة التحكم"
          : "Dashboard"
      : isKu
        ? "دەستپێکردن"
        : isAr
          ? "ابدأ الآن"
          : "Get started");
  const secondary =
    secondaryLabel ?? (isKu ? "چوونەژوورەوە" : isAr ? "تسجيل الدخول" : "Sign in");

  const primaryTo = landingCtaPath({
    clerkEnabled,
    isSignedIn,
    onboardingDone,
    mode: isSignedIn ? "dashboard" : "start",
  });
  const loginTo = landingCtaPath({
    clerkEnabled,
    isSignedIn,
    onboardingDone,
    mode: "login",
  });

  return (
    <>
      <button
        id={primaryId}
        type="button"
        className={primaryClassName}
        onClick={() => void navigate({ to: primaryTo })}
      >
        {primary}
      </button>
      {showSecondary && !isSignedIn && clerkEnabled && secondaryClassName && (
        <Link to={loginTo} className={secondaryClassName}>
          {secondary}
        </Link>
      )}
    </>
  );
}
