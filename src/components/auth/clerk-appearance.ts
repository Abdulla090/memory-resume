/** MemoryCV-branded Clerk auth UI — no Clerk logo or footer branding. */
export const memoryCvClerkAppearance = {
  layout: {
    logoPlacement: "none" as const,
    socialButtonsPlacement: "bottom" as const,
  },
  variables: {
    colorPrimary: "oklch(0.45 0.12 250)",
    colorText: "oklch(0.23 0.02 228)",
    colorTextSecondary: "oklch(0.5 0.02 228)",
    borderRadius: "0.75rem",
    fontFamily: '"DM Sans", system-ui, sans-serif',
  },
  elements: {
    rootBox: "w-full",
    card: "shadow-none border-0 p-0 bg-transparent w-full",
    headerTitle: "hidden",
    headerSubtitle: "hidden",
    logoBox: "hidden",
    logoImage: "hidden",
    footer: "hidden",
    footerPages: "hidden",
    footerAction: "text-center text-sm",
    socialButtonsBlockButton: "rounded-xl border border-input",
    formButtonPrimary: "rounded-xl gradient-bg text-primary-foreground font-semibold",
    formFieldInput: "rounded-xl border border-input bg-background",
    footerActionLink: "text-primary underline",
    identityPreviewEditButton: "text-primary",
    dividerRow: "hidden",
    badge: "hidden",
  },
};
