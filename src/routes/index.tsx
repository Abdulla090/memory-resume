import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Brain, Zap, FileText } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MemoryCV — Your memory. Your career. Infinite resumes." },
      {
        name: "description",
        content:
          "Paste your AI memory from ChatGPT, Claude, or Gemini. Get tailored resumes for any job in seconds.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* gradient backdrop */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--gradient-radial)" }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <Header />

      <main className="mx-auto max-w-7xl px-6 pt-20 pb-32 sm:pt-32">
        <Hero />
        <Logos />
        <Previews />
        <Features />
        <CTA />
      </main>

      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-muted-foreground">
          MemoryCV — built for the Built with Opus 4.7 hackathon.
        </div>
      </footer>
    </div>
  );
}

function Header() {
  return (
    <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
      <Link to="/" className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-bg">
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-display text-lg font-semibold">MemoryCV</span>
      </Link>
      <nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
        <Link to="/templates" className="hover:text-foreground">Templates</Link>
        <Link to="/dashboard" className="hover:text-foreground">Dashboard</Link>
        <Link
          to="/onboarding"
          className="rounded-full gradient-bg px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Start free
        </Link>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        Built with Opus 4.7 · Hackathon edition
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mx-auto mt-8 max-w-4xl font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl"
      >
        Your memory.{" "}
        <span className="gradient-text">Your career.</span>
        <br />
        Infinite resumes.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
      >
        Paste your AI memory. Get a resume for any job in three seconds.
        No forms. No LinkedIn scraping. Just you, distilled.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
      >
        <Link
          to="/onboarding"
          className="group inline-flex items-center gap-2 rounded-full gradient-bg px-7 py-3.5 text-base font-medium text-primary-foreground transition-all hover:scale-[1.03]"
          style={{ boxShadow: "var(--shadow-glow)" }}
        >
          Start for free
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          to="/templates"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-7 py-3.5 text-base font-medium text-foreground backdrop-blur transition-colors hover:bg-surface"
        >
          See templates
        </Link>
      </motion.div>
    </section>
  );
}

function Logos() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="mt-20 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-muted-foreground"
    >
      <span className="opacity-60">Works with</span>
      <span className="font-display text-base">ChatGPT memory</span>
      <span className="opacity-30">·</span>
      <span className="font-display text-base">Claude memory</span>
      <span className="opacity-30">·</span>
      <span className="font-display text-base">Gemini profile</span>
    </motion.div>
  );
}

const previews = [
  {
    role: "Designer",
    name: "Théo Laurent",
    title: "Senior Product Designer",
    accent: "from-pink-500/20 to-violet-500/20",
  },
  {
    role: "Engineer",
    name: "Maya Okafor",
    title: "Staff Software Engineer",
    accent: "from-cyan-500/20 to-indigo-500/20",
  },
  {
    role: "Marketing",
    name: "Priya Raman",
    title: "Senior Product Manager",
    accent: "from-amber-500/20 to-rose-500/20",
  },
];

function Previews() {
  return (
    <div className="mt-24">
      <div className="grid gap-6 md:grid-cols-3">
        {previews.map((p, i) => (
          <motion.div
            key={p.role}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 + i * 0.1 }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6"
            style={{ boxShadow: "var(--shadow-elegant)" }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-0 transition-opacity group-hover:opacity-100`}
            />
            <div className="relative">
              <div className="mb-1 text-xs uppercase tracking-widest text-muted-foreground">
                {p.role}
              </div>
              <div className="font-display text-xl font-semibold">{p.name}</div>
              <div className="text-sm text-muted-foreground">{p.title}</div>

              <div className="mt-6 space-y-2">
                <div className="h-2 w-full rounded-full bg-foreground/10" />
                <div className="h-2 w-5/6 rounded-full bg-foreground/10" />
                <div className="h-2 w-2/3 rounded-full bg-foreground/10" />
              </div>
              <div className="mt-6 space-y-2">
                <div className="h-2 w-1/3 rounded-full bg-primary/40" />
                <div className="h-2 w-full rounded-full bg-foreground/10" />
                <div className="h-2 w-4/5 rounded-full bg-foreground/10" />
                <div className="h-2 w-3/4 rounded-full bg-foreground/10" />
              </div>
              <div className="mt-6 space-y-2">
                <div className="h-2 w-1/4 rounded-full bg-primary/40" />
                <div className="h-2 w-full rounded-full bg-foreground/10" />
                <div className="h-2 w-5/6 rounded-full bg-foreground/10" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Features() {
  const items = [
    {
      icon: Brain,
      title: "Memory in. Identity out.",
      body: "We extract a complete professional profile from your raw AI memory dump — skills, experience, projects, soft strengths.",
    },
    {
      icon: Zap,
      title: "Resume in 3 seconds",
      body: "Paste a job title or description. Get an ATS-optimized, achievement-driven resume tailored exactly to that role.",
    },
    {
      icon: FileText,
      title: "Editorial templates",
      body: "Two premium templates ready for export — designed to be read by recruiters and parsed cleanly by ATS.",
    },
  ];
  return (
    <div className="mt-32 grid gap-6 md:grid-cols-3">
      {items.map((it, i) => (
        <motion.div
          key={it.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="rounded-2xl border border-border bg-surface/60 p-7 backdrop-blur"
        >
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl gradient-bg">
            <it.icon className="h-5 w-5 text-primary-foreground" />
          </div>
          <h3 className="font-display text-xl font-semibold">{it.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{it.body}</p>
        </motion.div>
      ))}
    </div>
  );
}

function CTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-32 overflow-hidden rounded-3xl border border-border p-12 text-center"
      style={{ background: "var(--gradient-primary)" }}
    >
      <h2 className="font-display text-4xl font-semibold text-primary-foreground sm:text-5xl">
        Ready to ship your career?
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-base text-primary-foreground/90">
        Take 60 seconds. Paste your memory. Walk out with a resume.
      </p>
      <Link
        to="/onboarding"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-7 py-3.5 text-base font-medium text-foreground transition-transform hover:scale-105"
      >
        Start for free <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  );
}
