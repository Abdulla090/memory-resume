import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useAppStore } from "@/lib/store";

type Props = {
  title: string;
  titleKu: string;
  description: string;
  descriptionKu: string;
  icon: LucideIcon;
};

export function DashboardComingSoon({
  title,
  titleKu,
  description,
  descriptionKu,
  icon: Icon,
}: Props) {
  const language = useAppStore((state) => state.language);
  const isKu = language === "ku";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex h-full min-h-[420px] flex-col items-center justify-center px-4 text-center"
    >
      <motion.div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
        <Icon className="size-8" aria-hidden />
      </motion.div>
      <h1 className="mb-2 text-2xl font-semibold text-foreground sm:text-3xl">
        {isKu ? titleKu : title}
      </h1>
      <p className="max-w-md text-sm font-medium text-muted-foreground sm:text-base">
        {isKu ? descriptionKu : description}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/dashboard/my-cvs"
          className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          {isKu ? "سیڤییەکانم" : "My CVs"}
        </Link>
        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
        >
          {isKu ? "دروستکردنی نوێ" : "Create new"}
        </Link>
      </div>
    </motion.div>
  );
}
