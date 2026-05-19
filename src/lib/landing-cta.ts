export type LandingCtaMode = "start" | "login" | "dashboard";

/** Where landing CTAs should navigate based on auth + onboarding state. */
export function landingCtaPath(opts: {
  clerkEnabled: boolean;
  isSignedIn: boolean;
  onboardingDone: boolean;
  mode: LandingCtaMode;
}): string {
  if (opts.isSignedIn || opts.mode === "dashboard") {
    return "/dashboard";
  }
  if (opts.mode === "login" && opts.clerkEnabled) {
    return "/login";
  }
  if (opts.clerkEnabled) {
    return "/signup";
  }
  return opts.onboardingDone ? "/dashboard" : "/onboarding";
}
