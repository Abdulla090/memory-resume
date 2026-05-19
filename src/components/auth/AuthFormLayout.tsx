import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

type AuthFormLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthFormLayout({ title, subtitle, children, footer }: AuthFormLayoutProps) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <Link to="/" className="mb-8 text-sm text-muted-foreground hover:text-foreground">
        ← MemoryCV
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      <div className="mt-8">{children}</div>
      {footer && <div className="mt-6 text-center text-sm">{footer}</div>}
    </div>
  );
}
