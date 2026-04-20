import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn, p as parseMemory, s as suggestFollowUpQuestions, a as applyFollowUpAnswers } from "./ai.functions-D2jzvC1D.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useAppStore } from "./router-CGNha9sQ.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import { a as Sparkles, A as ArrowLeft, b as ArrowRight, W as WandSparkles, L as LoaderCircle, C as Check } from "../_libs/lucide-react.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/zod.mjs";
import "../_libs/zustand.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const SAMPLE_MEMORIES = [
  {
    id: "engineer",
    persona: "Senior Software Engineer",
    description: "Backend-leaning full-stack engineer, 8 years experience",
    emoji: "💻",
    text: `User's name is Maya Okafor, lives in Berlin, originally from Lagos. Speaks English, German (B2), and Yoruba.
Currently Staff Software Engineer at Klarna, joined 2022. Before that: Senior Engineer at N26 (2019-2022), Backend Engineer at Zalando (2016-2019).
Studied Computer Science at TU Munich, graduated 2016.
Tech stack: TypeScript, Go, Rust (learning), Python, PostgreSQL, Kafka, Kubernetes, AWS, Terraform.
Led the migration of N26's payment ledger from monolith to event-sourced microservices — handled 12M transactions/day.
At Klarna, owns the BNPL risk-scoring service. Brought down p99 latency from 480ms to 65ms by rewriting hot path in Go.
Mentors 4 junior engineers. Runs an internal "Rust at Klarna" guild.
Side projects: maintains an open-source Postgres connection pooler (1.2k stars on GitHub).
Speaks at conferences — KubeCon EU 2023, GopherCon 2024.
Interested in: distributed systems, developer experience, eventually wants to be a Principal Engineer or start a dev-tools company.
Personality: direct, methodical, dislikes meetings, prefers async written communication. Strong opinions weakly held.
Goals: wants to either go deeper technical (Principal/Distinguished) or pivot to a founding engineer role at an early-stage infra startup.`
  },
  {
    id: "designer",
    persona: "Product Designer",
    description: "Brand + product designer with startup roots",
    emoji: "🎨",
    text: `Name: Théo Laurent. Based in Paris, French and English fluent, conversational Spanish.
Senior Product Designer at Doctolib since 2021, leading design for the patient mobile app (8M MAU).
Previously: Product Designer at Qonto (2019-2021), Brand Designer at BlaBlaCar (2017-2019).
Started career as a freelance illustrator. Self-taught into product design via OpenClassrooms + a year at Ironhack bootcamp (2017).
Tools: Figma (advanced, builds plugins), Framer, After Effects, Webflow, Cursor for prototyping with AI.
Shipped: Doctolib's appointment-rescheduling flow that cut support tickets 34%. Designed Qonto's first mobile-first onboarding (raised activation 22%).
Loves: typography, brand systems, motion design, editorial layouts. Inspired by Pentagram, Mathieu Lehanneur, Dieter Rams.
Side: runs a Substack on design systems with 4k subscribers, sells Figma templates (~€800/month passive).
Personality: warm, opinionated about craft, hates "design by committee", thrives in small autonomous teams.
Wants next: Design Lead role at a Series B-C product company, OR join a 2-person founding team as design partner. Open to remote-first companies. Not interested in agencies anymore.`
  },
  {
    id: "pm",
    persona: "Senior Product Manager",
    description: "B2B SaaS PM with growth + data background",
    emoji: "📊",
    text: `Priya Raman, San Francisco (open to remote). Indian-American, native English + Tamil + intermediate Mandarin.
Currently Senior Product Manager at Notion, on the AI team since 2023. Drove the launch of Notion Q&A → 2.1M weekly active users in 6 months.
Before Notion: PM at Stripe Billing (2021-2023), shipped usage-based pricing (now powers $400M+ ARR for customers). PM at Segment (2019-2021), owned the Personas product.
Started in growth: Growth Analyst at Airbnb (2017-2019). MBA from Wharton (2017). Undergrad in Statistics at UC Berkeley.
Strengths: data-driven discovery, SQL fluency, jobs-to-be-done framework, sharp written specs, comfortable in ambiguous AI/ML problem spaces.
Tools: SQL, Amplitude, Mixpanel, Figma (read-only), Linear, ChatGPT/Claude daily for research synthesis.
Has shipped LLM features end-to-end: prompt design, eval harnesses, latency/cost tradeoffs, RLHF basics.
Speaks at Mind the Product, Lenny's Podcast guest.
Personality: structured, high-agency, sometimes impatient, gives tough feedback kindly.
Goals: wants to be Director of Product at an AI-first company within 18 months, or co-found something in the AI productivity space. Strong interest in vertical AI (legal, healthcare). Avoiding crypto, ad-tech, and enterprise sales-led orgs.`
  }
];
const SOURCES = [{
  id: "chatgpt",
  name: "ChatGPT",
  where: "Settings, Personalization, Memory, then copy the relevant entries."
}, {
  id: "claude",
  name: "Claude",
  where: "Profile and personal preference memory entries work best."
}, {
  id: "gemini",
  name: "Gemini",
  where: "Saved info and profile facts are enough to build a first pass."
}, {
  id: "manual",
  name: "Manual notes",
  where: "A free-form summary works if you do not want to export memory directly."
}];
const LOADING_PHRASES = ["Reading context and identity markers", "Mapping skills, experience, and intent", "Rebuilding a professional profile from memory", "Extracting signals for role targeting"];
function Onboarding() {
  const navigate = useNavigate();
  const setProfile = useAppStore((s) => s.setProfile);
  const parseMemoryFn = useServerFn(parseMemory);
  useAppStore((s) => s.apiKey);
  const suggestFollowUpsFn = useServerFn(suggestFollowUpQuestions);
  const applyFollowUpsFn = useServerFn(applyFollowUpAnswers);
  const [step, setStep] = reactExports.useState(0);
  const [source, setSource] = reactExports.useState(null);
  const [memory, setMemory] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [phraseIdx, setPhraseIdx] = reactExports.useState(0);
  const [profile, setLocalProfile] = reactExports.useState(null);
  const [questions, setQuestions] = reactExports.useState([]);
  const [answers, setAnswers] = reactExports.useState({});
  const [questionIndex, setQuestionIndex] = reactExports.useState(0);
  const [questionLoading, setQuestionLoading] = reactExports.useState(false);
  const sourceLabel = SOURCES.find((item) => item.id === source)?.name ?? "Source";
  const loadSample = (id) => {
    const sample = SAMPLE_MEMORIES.find((item) => item.id === id);
    if (!sample) return;
    setMemory(sample.text);
    toast.success(`Loaded ${sample.persona}`);
  };
  const handleExtract = async () => {
    if (memory.trim().length < 20) {
      toast.error("Add more context before extracting the profile.");
      return;
    }
    setLoading(true);
    setStep(2);
    const interval = setInterval(() => setPhraseIdx((current) => (current + 1) % LOADING_PHRASES.length), 1800);
    try {
      const {
        profile: profile2
      } = await parseMemoryFn({
        data: {
          memory
        }
      });
      setLocalProfile(profile2);
      const {
        questions: questions2
      } = await suggestFollowUpsFn({
        data: {
          profile: profile2
        }
      });
      setQuestions(questions2);
      setAnswers(Object.fromEntries(questions2.map((question) => [question.id, ""])));
      setQuestionIndex(0);
      setStep(questions2.length > 0 ? 3 : 4);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to extract profile.");
      setStep(1);
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };
  const handleConfirm = () => {
    if (!profile) return;
    setProfile(profile);
    toast.success("Profile saved");
    navigate({
      to: "/dashboard"
    });
  };
  const handleApplyAnswers = async () => {
    if (!profile) return;
    const payload = questions.map((question) => ({
      questionId: question.id,
      field: question.field,
      answer: answers[question.id]?.trim() ?? ""
    })).filter((item) => item.answer.length > 0);
    if (payload.length === 0) {
      setStep(4);
      return;
    }
    setQuestionLoading(true);
    try {
      const {
        profile: completedProfile
      } = await applyFollowUpsFn({
        data: {
          profile,
          answers: payload
        }
      });
      setLocalProfile(completedProfile);
      toast.success("Profile updated with your answers");
      setStep(4);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to apply answers.");
    } finally {
      setQuestionLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-shell bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "saas-nav", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "app-frame px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-16 items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 cursor-pointer", id: "nav-logo", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[1rem] font-bold tracking-tight text-slate-900", children: "MemoryCV" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stepper, { step })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "app-frame grid gap-6 px-4 pb-16 pt-3 sm:px-6 lg:grid-cols-[0.42fr_0.58fr] lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IntroRail, { step, sourceLabel, memoryLength: memory.length, profile, questionCount: questions.length, answeredCount: Object.values(answers).filter(Boolean).length }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "surface-panel min-h-[680px] rounded-[2.25rem] p-6 sm:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
        step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: "Choose the memory source", subtitle: "Pick the source format that most closely matches what you are about to paste.", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2", children: SOURCES.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.button, { initial: {
          opacity: 0,
          y: 10
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: index * 0.06,
          type: "spring",
          stiffness: 100,
          damping: 20
        }, onClick: () => {
          setSource(item.id);
          setStep(1);
        }, className: "surface-muted rounded-[1.6rem] p-5 text-left transition-transform hover:-translate-y-[1px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "eyebrow", children: [
            "Source 0",
            index + 1
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-xl font-semibold tracking-tight", children: item.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-6 text-muted-foreground", children: item.where })
        ] }, item.id)) }) }, "sources"),
        step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: "Paste the raw memory", subtitle: "Do not clean it up. The extraction performs better when the source material stays messy and complete.", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: SAMPLE_MEMORIES.map((sample) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => loadSample(sample.id), className: "ghost-button px-4 py-2 text-sm text-foreground", children: sample.persona }, sample.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[1.15fr_0.85fr]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-medium text-foreground", children: "Memory input" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: memory, onChange: (event) => setMemory(event.target.value), placeholder: "Paste memory, profile notes, or a free-form summary here.", className: "field-input min-h-[360px] resize-y" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  memory.length.toLocaleString(),
                  " characters"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: sourceLabel })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-muted rounded-[1.6rem] p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow", children: "What gets extracted" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-4", children: ["identity and positioning", "experience chronology", "technical and soft skill clusters", "career direction and role fit"].map((line, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-background font-mono text-xs text-muted-foreground", children: [
                  "0",
                  index + 1
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: line })
              ] }, line)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-between gap-3 sm:flex-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setStep(0), className: "ghost-button px-5 py-3 text-sm text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
              "Back"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleExtract, disabled: memory.trim().length < 20 || loading, className: "primary-button px-6 py-3 text-sm font-medium disabled:opacity-50", children: [
              "Extract profile",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
            ] })
          ] })
        ] }) }, "memory"),
        step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0
        }, animate: {
          opacity: 1
        }, exit: {
          opacity: 0
        }, className: "flex min-h-[540px] flex-col justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[480px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow", children: "Extraction running" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-4xl font-semibold tracking-tight sm:text-5xl", children: "Turning memory into a working profile." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-base leading-7 text-muted-foreground", children: "The system is interpreting narrative fragments, role history, skills, and goals into a structure the generator can use." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[0.75fr_1.25fr]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-muted flex min-h-[220px] flex-col justify-between rounded-[1.8rem] p-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-foreground text-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "h-6 w-6" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
                  opacity: 0,
                  y: 8
                }, animate: {
                  opacity: 1,
                  y: 0
                }, exit: {
                  opacity: 0,
                  y: -8
                }, transition: {
                  duration: 0.3
                }, className: "text-xl font-semibold tracking-tight", children: LOADING_PHRASES[phraseIdx] }, phraseIdx) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
                  "AI analysis in progress"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", children: [88, 100, 76, 92].map((width, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "surface-muted rounded-[1.3rem] p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer h-3 rounded-full bg-foreground/8", style: {
              width: `${width}%`,
              animationDelay: `${index * 120}ms`
            } }) }, width)) })
          ] })
        ] }, "processing"),
        step === 3 && profile && questions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: "Fill the missing details", subtitle: "The AI found a few resume-critical gaps. Answer them here and the profile will be updated automatically.", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FollowUpSlides, { questions, answers, questionIndex, loading: questionLoading, onAnswer: (questionId, value) => setAnswers((current) => ({
          ...current,
          [questionId]: value
        })), onBack: () => setQuestionIndex((current) => Math.max(0, current - 1)), onNext: () => setQuestionIndex((current) => Math.min(questions.length - 1, current + 1)), onApply: handleApplyAnswers }) }, "questions"),
        step === 4 && profile && /* @__PURE__ */ jsxRuntimeExports.jsxs(Panel, { title: `Review ${profile.name.split(" ")[0]}'s profile`, subtitle: "Adjust the extracted profile before entering the dashboard.", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileEditor, { profile, setProfile: setLocalProfile }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-col justify-between gap-3 sm:flex-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setStep(questions.length > 0 ? 3 : 1), className: "ghost-button px-5 py-3 text-sm text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
              questions.length > 0 ? "Back to questions" : "Re-paste memory"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleConfirm, className: "primary-button px-6 py-3 text-sm font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }),
              "Continue to dashboard"
            ] })
          ] })
        ] }, "review")
      ] }) })
    ] })
  ] });
}
function IntroRail({
  step,
  sourceLabel,
  memoryLength,
  profile,
  questionCount,
  answeredCount
}) {
  const statuses = ["Select source", "Paste memory", "Extract profile", "Fill gaps", "Review output"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "grid gap-6 lg:sticky lg:top-6 lg:h-fit", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-panel rounded-[2.25rem] p-6 sm:p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow", children: "Guided intake" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-4xl font-semibold tracking-tight sm:text-5xl", children: "Bring your memory in once. Reuse it everywhere after." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-[34ch] text-base leading-7 text-muted-foreground", children: "This flow is designed to turn unstructured memory into a controlled, reusable candidate profile." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-panel rounded-[2rem] p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow", children: "Progress" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 space-y-4", children: statuses.map((label, index) => {
        const active = index === step;
        const complete = index < step;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium ${complete ? "bg-foreground text-background" : active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`, children: complete ? "✓" : `0${index + 1}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-foreground", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: index === 0 ? sourceLabel : index === 1 ? `${memoryLength.toLocaleString()} chars loaded` : index === 3 && questionCount > 0 ? `${answeredCount}/${questionCount} answered` : index === 4 && profile ? profile.name : "Pending" })
          ] })
        ] }, label);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-panel rounded-[2rem] p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow", children: "Operator note" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm leading-6 text-muted-foreground", children: "Cleaner UI does not matter if the intake logic is weak. The goal here is confidence: the user should understand what is happening, what was extracted, and what gets saved." })
    ] })
  ] });
}
function Stepper({
  step
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden items-center gap-2 md:flex", children: [0, 1, 2, 3, 4].map((index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1.5 w-12 rounded-full transition-colors ${index <= step ? "bg-foreground" : "bg-border"}` }, index)) });
}
function Panel({
  title,
  subtitle,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 12
  }, animate: {
    opacity: 1,
    y: 0
  }, exit: {
    opacity: 0,
    y: -12
  }, transition: {
    duration: 0.3
  }, className: "flex min-h-full flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[720px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow", children: "Intake step" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-3xl font-semibold tracking-tight sm:text-4xl", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-base leading-7 text-muted-foreground", children: subtitle })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex-1", children })
  ] });
}
function ProfileEditor({
  profile,
  setProfile
}) {
  const update = (key, value) => setProfile({
    ...profile,
    [key]: value
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Name", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: profile.name, onChange: (event) => update("name", event.target.value), className: "field-input" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Location", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: profile.location, onChange: (event) => update("location", event.target.value), className: "field-input" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Photo URL (optional)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: profile.photoUrl ?? "", onChange: (event) => update("photoUrl", event.target.value), placeholder: "https://example.com/photo.jpg", className: "field-input" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: profile.email ?? "", onChange: (event) => update("email", event.target.value), className: "field-input" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Summary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: profile.summary, onChange: (event) => update("summary", event.target.value), rows: 4, className: "field-input resize-y" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Career goals", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: profile.careerGoals, onChange: (event) => update("careerGoals", event.target.value), rows: 3, className: "field-input resize-y" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Pills, { label: "Technical skills", values: profile.skills.technical, onChange: (values) => update("skills", {
        ...profile.skills,
        technical: values
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Pills, { label: "Tools", values: profile.skills.tools, onChange: (values) => update("skills", {
        ...profile.skills,
        tools: values
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Pills, { label: "Soft skills", values: profile.skills.soft, onChange: (values) => update("skills", {
        ...profile.skills,
        soft: values
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Pills, { label: "Languages", values: profile.skills.languages_spoken, onChange: (values) => update("skills", {
        ...profile.skills,
        languages_spoken: values
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-muted rounded-[1.6rem] p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow", children: "Experience review" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-xl font-semibold tracking-tight", children: [
            profile.experience.length,
            " roles extracted"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs text-muted-foreground", children: "chronology" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-3", children: [
        profile.experience.slice(0, 4).map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[1.2rem] bg-background px-4 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-semibold text-foreground", children: [
            item.title,
            " at ",
            item.company
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: item.duration })
        ] }, `${item.company}-${index}`)),
        profile.experience.length > 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
          "+ ",
          profile.experience.length - 4,
          " more roles retained in the profile"
        ] })
      ] })
    ] })
  ] });
}
function FollowUpSlides({
  questions,
  answers,
  questionIndex,
  loading,
  onAnswer,
  onBack,
  onNext,
  onApply
}) {
  const question = questions[questionIndex];
  const currentValue = answers[question.id] ?? "";
  const isLast = questionIndex === questions.length - 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-muted rounded-[1.8rem] p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "eyebrow", children: [
          "Question ",
          questionIndex + 1
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-xs text-muted-foreground", children: [
          questionIndex + 1,
          "/",
          questions.length
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-2xl font-semibold tracking-tight", children: question.question }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-6 text-muted-foreground", children: question.helperText }),
      question.inputType === "select" && question.options.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-3", children: question.options.map((option) => {
        const active = currentValue === option;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onAnswer(question.id, option), className: `rounded-[1.2rem] px-4 py-4 text-left text-sm transition-colors ${active ? "bg-foreground text-background" : "surface-panel"}`, children: option }, option);
      }) }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: currentValue, onChange: (event) => onAnswer(question.id, event.target.value), placeholder: question.placeholder ?? "Type your answer here.", rows: question.inputType === "select" ? 2 : 4, className: "field-input resize-y" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-between gap-3 sm:flex-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onBack, disabled: questionIndex === 0, className: "ghost-button px-5 py-3 text-sm text-foreground disabled:opacity-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        "Previous"
      ] }),
      isLast ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onApply, disabled: loading, className: "primary-button px-6 py-3 text-sm font-medium disabled:opacity-50", children: [
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }),
        "Apply answers"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onNext, className: "primary-button px-6 py-3 text-sm font-medium", children: [
        "Next question",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
      ] })
    ] })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-2 block text-sm font-medium text-foreground", children: label }),
    children
  ] });
}
function Pills({
  label,
  values,
  onChange
}) {
  const [input, setInput] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-muted rounded-[1.6rem] p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 text-sm font-medium text-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: values.map((value, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full bg-background px-3 py-2 text-xs text-foreground", children: [
      value,
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onChange(values.filter((_, current) => current !== index)), className: "text-muted-foreground transition-colors hover:text-foreground", children: "×" })
    ] }, `${value}-${index}`)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: input, onChange: (event) => setInput(event.target.value), onKeyDown: (event) => {
      if (event.key === "Enter" && input.trim()) {
        event.preventDefault();
        onChange([...values, input.trim()]);
        setInput("");
      }
    }, placeholder: "Add a skill and press Enter", className: "field-input mt-3" })
  ] });
}
export {
  Onboarding as component
};
