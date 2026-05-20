/** MemoryCV-branded Clerk auth UI — social OAuth on top, no Clerk logo/footer. */
export const memoryCvClerkAppearance = {
  layout: {
    logoPlacement: "none" as const,
    socialButtonsPlacement: "top" as const,
    socialButtonsVariant: "blockButton" as const,
    showOptionalFields: true,
  },
  variables: {
    colorPrimary: "oklch(0.45 0.12 250)",
    colorText: "oklch(0.23 0.02 228)",
    colorTextSecondary: "oklch(0.5 0.02 228)",
    colorBackground: "transparent",
    colorInputBackground: "oklch(0.99 0.004 95)",
    borderRadius: "0.75rem",
    fontFamily: '"DM Sans", system-ui, sans-serif',
  },
  elements: {
    rootBox: "w-full",
    card: "shadow-none border-0 p-0 bg-transparent w-full gap-4",
    headerTitle: "hidden",
    headerSubtitle: "hidden",
    logoBox: "hidden",
    logoImage: "hidden",
    footer: "hidden",
    footerPages: "hidden",
    footerAction: "text-center text-sm text-muted-foreground",
    socialButtonsRoot: "w-full gap-2",
    socialButtonsBlockButton:
      "w-full rounded-xl border border-input bg-background py-2.5 text-sm font-semibold shadow-sm transition-colors hover:bg-muted/50",
    socialButtonsBlockButtonText: "font-semibold",
    socialButtonsProviderIcon: "h-5 w-5",
    dividerRow: "my-2",
    dividerLine: "bg-border",
    dividerText: "text-xs text-muted-foreground uppercase tracking-wide",
    form: "gap-3",
    formFieldLabel: "text-xs font-medium text-muted-foreground",
    formFieldInput:
      "rounded-xl border border-input bg-background px-4 py-2.5 text-sm shadow-sm",
    formButtonPrimary:
      "rounded-xl gradient-bg py-2.5 text-sm font-semibold text-primary-foreground shadow-md hover:opacity-95",
    footerActionLink: "font-semibold text-primary underline-offset-2 hover:underline",
    identityPreviewEditButton: "text-primary",
    badge: "hidden",
    formFieldRow: "gap-1.5",
  },
};
