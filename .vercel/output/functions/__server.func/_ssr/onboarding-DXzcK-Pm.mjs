import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn, p as parseMemory, g as getFollowUpQuestions, a as generateResume, b as patchProfileWithAnswers } from "./ai.functions-DfTJ5cB6.mjs";
import { u as useAppStore } from "./router-CQ_kdRwk.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import { a as Sparkles, P as Paperclip, F as FileText, b as ArrowUp, C as CircleCheck, I as ImagePlus, c as SkipForward } from "../_libs/lucide-react.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
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
function ChatOnboarding() {
  const navigate = useNavigate();
  const setProfile = useAppStore((s) => s.setProfile);
  const profile = useAppStore((s) => s.profile);
  const apiKey = useAppStore((s) => s.apiKey);
  const addResume = useAppStore((s) => s.addResume);
  const parseMemoryFn = useServerFn(parseMemory);
  const generateFn = useServerFn(generateResume);
  const getQuestionsFn = useServerFn(getFollowUpQuestions);
  const patchProfileFn = useServerFn(patchProfileWithAnswers);
  const [stage, setStage] = reactExports.useState("intake");
  const [inputText, setInputText] = reactExports.useState("");
  const [jobTarget, setJobTarget] = reactExports.useState("");
  const [rawMemory, setRawMemory] = reactExports.useState("");
  const [messages, setMessages] = reactExports.useState([]);
  const [pendingQs, setPendingQs] = reactExports.useState([]);
  const [qIdx, setQIdx] = reactExports.useState(0);
  const [answers, setAnswers] = reactExports.useState([]);
  const [customInput, setCustomInput] = reactExports.useState("");
  const [selectedOpts, setSelectedOpts] = reactExports.useState([]);
  const [isThinking, setIsThinking] = reactExports.useState(false);
  const [showLoader, setShowLoader] = reactExports.useState(false);
  const [loaderResumeId, setLoaderResumeId] = reactExports.useState(null);
  const fileInputRef = reactExports.useRef(null);
  const messagesEndRef = reactExports.useRef(null);
  const inputRef = reactExports.useRef(null);
  const chatInputRef = reactExports.useRef(null);
  const chatPhotoInputRef = reactExports.useRef(null);
  const handleChatPhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setProfile({
        ...profile,
        photoUrl: ev.target?.result
      });
      toast.success(`Photo attached!`);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };
  const inChat = stage !== "intake";
  const inQA = stage === "questions";
  const inBuild = stage === "builder";
  const curQ = pendingQs[qIdx];
  reactExports.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages, isThinking]);
  reactExports.useEffect(() => {
    if (inQA && chatInputRef.current) chatInputRef.current.focus();
  }, [inQA, qIdx]);
  const addMsg = (msg) => setMessages((p) => [...p, {
    id: crypto.randomUUID(),
    ...msg
  }]);
  const handleExtract = async () => {
    if (inputText.trim().length < 20) {
      toast.error("Add a bit more detail about yourself.");
      return;
    }
    const memory = inputText.trim();
    setRawMemory(memory);
    setInputText("");
    setIsThinking(true);
    setStage("parsing");
    addMsg({
      from: "user",
      content: memory.slice(0, 240) + (memory.length > 240 ? "…" : "")
    });
    try {
      const {
        profile: parsed
      } = await parseMemoryFn({
        data: {
          apiKey,
          memory
        }
      });
      setProfile(parsed);
      const {
        isComplete,
        questions
      } = await getQuestionsFn({
        data: {
          apiKey,
          profile: parsed,
          rawMemory: memory
        }
      });
      setIsThinking(false);
      if (isComplete || questions.length === 0) {
        addMsg({
          from: "ai",
          content: `Profile captured, ${parsed.name || "there"}! What role are you targeting for this resume?`
        });
        setStage("builder");
      } else {
        addMsg({
          from: "ai",
          content: `Got your profile, ${parsed.name || "there"}! Just a few quick questions to make your resume even stronger.`
        });
        setPendingQs(questions);
        setQIdx(0);
        setStage("questions");
        setTimeout(() => addMsg({
          from: "ai",
          content: questions[0].question,
          question: questions[0]
        }), 350);
      }
    } catch (err) {
      setIsThinking(false);
      toast.error(err instanceof Error ? err.message : "Failed to analyze. Try again.");
      setStage("intake");
    }
  };
  const handleAnswer = (answer, idx) => {
    const q = pendingQs[idx];
    if (!q || !answer.trim()) return;
    const newAns = {
      questionId: q.id,
      field: q.field,
      answer
    };
    const all = [...answers, newAns];
    setAnswers(all);
    addMsg({
      from: "user",
      content: answer
    });
    setSelectedOpts([]);
    setCustomInput("");
    const next = idx + 1;
    if (next < pendingQs.length) {
      setQIdx(next);
      setTimeout(() => addMsg({
        from: "ai",
        content: pendingQs[next].question,
        question: pendingQs[next]
      }), 380);
    } else {
      finishQA(all);
    }
  };
  const handleSkip = () => {
    addMsg({
      from: "user",
      content: "Skip"
    });
    setSelectedOpts([]);
    setCustomInput("");
    const next = qIdx + 1;
    if (next < pendingQs.length) {
      setQIdx(next);
      setTimeout(() => addMsg({
        from: "ai",
        content: pendingQs[next].question,
        question: pendingQs[next]
      }), 380);
    } else {
      finishQA(answers);
    }
  };
  const finishQA = async (all) => {
    setIsThinking(true);
    setStage("patching");
    try {
      const {
        profile: patched
      } = await patchProfileFn({
        data: {
          apiKey,
          profile,
          answers: all
        }
      });
      setProfile(patched);
      setIsThinking(false);
      addMsg({
        from: "ai",
        content: `All done! Your profile is ready, ${patched.name || "there"}. What role are you targeting?`
      });
      setStage("builder");
    } catch {
      setIsThinking(false);
      addMsg({
        from: "ai",
        content: "Profile updated! What role are you targeting?"
      });
      setStage("builder");
    }
  };
  const handleBuild = async () => {
    if (jobTarget.trim().length < 2) {
      toast.error("Enter a role or job title.");
      return;
    }
    if (!profile) return;
    addMsg({
      from: "user",
      content: jobTarget
    });
    setIsThinking(true);
    setStage("generating");
    try {
      const {
        resume
      } = await generateFn({
        data: {
          apiKey,
          profile,
          jobTarget: jobTarget.trim()
        }
      });
      const saved = {
        id: crypto.randomUUID(),
        title: resume.title || jobTarget.slice(0, 60),
        jobTarget,
        template: "executive",
        data: resume,
        createdAt: Date.now()
      };
      addResume(saved);
      setIsThinking(false);
      setShowLoader(true);
      setLoaderResumeId(saved.id);
    } catch (e) {
      setIsThinking(false);
      toast.error(e instanceof Error ? e.message : "Generation failed.");
      setStage("builder");
    }
  };
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setInputText((p) => p + (p ? "\n\n" : "") + `[${file.name}]
` + ev.target?.result);
      toast.success(`Loaded ${file.name}`);
    };
    reader.readAsText(file);
    e.target.value = "";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-dvh flex flex-col relative overflow-hidden bg-sky-100", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-0", style: {
      background: "linear-gradient(180deg, #93c5fd 0%, #e0f2fe 50%, #fef3c7 100%)"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-10 right-32 w-[500px] h-[500px] bg-amber-300/40 rounded-full blur-[100px] pointer-events-none z-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-[-80px] left-[-50px] w-[600px] h-[300px] pointer-events-none z-0 opacity-95", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-16 left-10 w-48 h-48 bg-white rounded-full blur-[4px] drop-shadow-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[-20px] left-32 w-64 h-64 bg-white rounded-full blur-[4px] drop-shadow-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-20 left-72 w-48 h-48 bg-white rounded-full blur-[4px] drop-shadow-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-32 left-0 w-[500px] h-40 bg-white rounded-full blur-[4px]" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-[-100px] right-[-100px] w-[700px] h-[350px] pointer-events-none z-0 opacity-90", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-20 right-10 w-56 h-56 bg-white rounded-full blur-[4px] drop-shadow-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[-40px] right-40 w-80 h-80 bg-white rounded-full blur-[4px] drop-shadow-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-16 right-96 w-64 h-64 bg-white rounded-full blur-[4px] drop-shadow-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-40 right-0 w-[700px] h-48 bg-white rounded-full blur-[4px]" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-[25%] left-[5%] w-[250px] h-[100px] pointer-events-none z-0 opacity-70", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-10 w-24 h-24 bg-white rounded-full blur-[3px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[-10px] left-24 w-28 h-28 bg-white rounded-full blur-[3px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-8 left-0 w-[200px] h-16 bg-white rounded-full blur-[3px]" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-[30%] right-[10%] w-[300px] h-[120px] pointer-events-none z-0 opacity-60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-16 w-24 h-24 bg-white rounded-full blur-[4px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[-20px] right-32 w-32 h-32 bg-white rounded-full blur-[4px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-10 right-0 w-[250px] h-20 bg-white rounded-full blur-[4px]" })
    ] }),
    showLoader && loaderResumeId && /* @__PURE__ */ jsxRuntimeExports.jsx(GeneratingLoader, { onDone: () => navigate({
      to: "/resume/$id",
      params: {
        id: loaderResumeId
      }
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative z-10 px-6 py-4 flex items-center gap-2 shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[1.05rem] font-semibold text-slate-800 tracking-tight", children: "MemoryCV" })
    ] }),
    !inChat && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex-1 flex flex-col items-center justify-center px-4 pb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.h1, { initial: {
        opacity: 0,
        y: -12
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "text-3xl font-semibold text-slate-900 tracking-tight mb-2 text-center drop-shadow-sm", children: "Tell me about yourself." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600 font-medium text-sm mb-8 text-center max-w-sm drop-shadow-sm", children: "Paste your resume, LinkedIn bio, career history — or just write freely." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 16
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.1
      }, className: "w-full max-w-[44rem] rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(2,132,199,0.35)] border-2 border-white", style: {
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(24px)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { ref: inputRef, value: inputText, onChange: (e) => setInputText(e.target.value), placeholder: "Paste your resume, LinkedIn summary, career history, or just write about yourself...", className: "w-full bg-transparent resize-none outline-none text-slate-900 text-[15.5px] font-medium leading-relaxed placeholder:text-slate-400 px-6 pt-6 pb-3", style: {
          minHeight: "200px"
        }, onKeyDown: (e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleExtract();
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-t border-blue-50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", ref: fileInputRef, onChange: handleFileUpload, className: "hidden", accept: ".txt,.md,.pdf,.docx,.doc,.rtf" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => fileInputRef.current?.click(), className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12.5px] font-medium text-slate-600 hover:bg-blue-50 transition-colors border border-slate-200 bg-white/70", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { className: "w-3.5 h-3.5" }),
              " Upload"
            ] }),
            SAMPLE_MEMORIES[0] && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
              setInputText(SAMPLE_MEMORIES[0].text);
              toast.success("Sample loaded");
            }, className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12.5px] font-medium text-slate-600 hover:bg-blue-50 transition-colors border border-slate-200 bg-white/70", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5" }),
              " Try Sample"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleExtract, disabled: inputText.trim().length < 20, className: "flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-full text-[14px] font-semibold shadow-md shadow-blue-200 transition-all active:scale-95", children: [
            "Analyze Me",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "w-4 h-4" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[11.5px] text-slate-400 mt-4", children: "⌘ + Enter to submit" })
    ] }),
    inChat && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex-1 flex flex-col min-h-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto px-4 pt-2 pb-4", style: {
        scrollbarWidth: "none"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[42rem] mx-auto flex flex-col gap-4", children: [
        messages.map((msg) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 10
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.22
        }, className: `flex gap-3 ${msg.from === "user" ? "justify-end" : "justify-start"}`, children: [
          msg.from === "ai" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-blue-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `max-w-[75%] rounded-2xl px-4 py-3 text-[14.5px] leading-relaxed shadow-sm ${msg.from === "user" ? "bg-blue-600 text-white rounded-br-md shadow-blue-200" : "bg-white text-slate-800 rounded-bl-md border border-blue-100"}`, children: msg.content })
        ] }, msg.id)),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isThinking && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 8
        }, animate: {
          opacity: 1,
          y: 0
        }, exit: {
          opacity: 0
        }, className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-md shadow-blue-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white border border-blue-100 rounded-2xl rounded-bl-md px-5 py-3.5 flex gap-1.5 items-center shadow-sm", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "w-2 h-2 rounded-full bg-blue-400", animate: {
            scale: [1, 1.5, 1],
            opacity: [0.4, 1, 0.4]
          }, transition: {
            repeat: Infinity,
            duration: 1.1,
            delay: i * 0.18
          } }, i)) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: messagesEndRef })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 border-t border-blue-100/60 px-4 pt-3 pb-safe-4", style: {
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(24px)",
        paddingBottom: "max(16px, env(safe-area-inset-bottom))"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[42rem] mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: inQA && curQ && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 8
        }, animate: {
          opacity: 1,
          y: 0
        }, exit: {
          opacity: 0,
          y: -8
        }, className: "mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11.5px] text-slate-400 mb-2 ml-1", children: curQ.helperText }),
          curQ.options.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-3", children: curQ.options.map((opt) => {
            const sel = selectedOpts.includes(opt);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.button, { whileTap: {
              scale: 0.94
            }, onClick: () => {
              if (curQ.inputType === "multiselect") {
                setSelectedOpts((p) => p.includes(opt) ? p.filter((o) => o !== opt) : [...p, opt]);
              } else {
                handleAnswer(opt, qIdx);
              }
            }, className: `px-3.5 py-2 rounded-full text-[13px] font-medium border transition-all ${sel ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-200" : "bg-white/90 text-slate-700 border-slate-200 hover:border-blue-400 hover:bg-blue-50"}`, children: [
              sel && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 inline mr-1.5 -mt-0.5" }),
              opt
            ] }, opt);
          }) }),
          curQ.inputType === "multiselect" && selectedOpts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleAnswer(selectedOpts.join(", "), qIdx), className: "mb-2 text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1", children: [
            "Confirm ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "w-3.5 h-3.5 rotate-90" })
          ] })
        ] }, curQ.id) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-2xl px-4 py-3 border-2 border-white shadow-[0_20px_40px_-10px_rgba(2,132,199,0.3)]", style: {
          background: "rgba(255,255,255,0.98)"
        }, children: [
          inQA && curQ && /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: chatInputRef, value: customInput, onChange: (e) => setCustomInput(e.target.value), placeholder: curQ.placeholder || "Type your answer or pick above...", className: "flex-1 bg-transparent outline-none text-slate-800 text-[15px] placeholder:text-slate-400", onKeyDown: (e) => {
            if (e.key === "Enter" && customInput.trim()) handleAnswer(customInput.trim(), qIdx);
          } }),
          inBuild && /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: jobTarget, onChange: (e) => setJobTarget(e.target.value), placeholder: "What role are you targeting? e.g. Senior PM at a startup...", className: "flex-1 bg-transparent outline-none text-slate-800 text-[15px] placeholder:text-slate-400", onKeyDown: (e) => {
            if (e.key === "Enter") handleBuild();
          }, autoFocus: true }),
          !inQA && !inBuild && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-slate-400 text-[15px] select-none", children: stage === "generating" ? "Generating your resume..." : "Hang on a second..." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", ref: chatPhotoInputRef, onChange: handleChatPhotoUpload, className: "hidden", accept: "image/*" }),
            (inQA || inBuild) && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => chatPhotoInputRef.current?.click(), className: `w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${profile?.photoUrl ? "border border-green-200" : "bg-slate-100 hover:bg-blue-50 text-slate-500 hover:text-blue-600"}`, title: profile?.photoUrl ? "Photo attached! Click to change." : "Attach a photo (optional)", children: profile?.photoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: profile.photoUrl, className: "w-8 h-8 rounded-full object-cover", alt: "Profile" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "w-4 h-4" }) }),
            inQA && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 mr-1", children: pendingQs.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1.5 rounded-full transition-all duration-300 ${i < qIdx ? "bg-blue-500 w-1.5" : i === qIdx ? "bg-blue-600 w-4" : "bg-slate-200 w-1.5"}` }, i)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSkip, className: "flex items-center gap-1 text-[12px] font-medium text-slate-400 hover:text-slate-700 transition-colors px-2 py-1 rounded-lg hover:bg-slate-100", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SkipForward, { className: "w-3.5 h-3.5" }),
                " Skip"
              ] }),
              customInput.trim() && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleAnswer(customInput.trim(), qIdx), className: "w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center shadow-md shadow-blue-200 transition-all active:scale-95", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "w-4 h-4 text-white" }) })
            ] }),
            inBuild && jobTarget.trim().length >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleBuild, className: "flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-[13px] font-semibold shadow-md shadow-blue-200 transition-all active:scale-95", children: [
              "Generate ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" })
            ] })
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
const STEPS = ["Reading your career story...", "Identifying key strengths...", "Crafting your headline...", "Writing experience bullets...", "Polishing your summary...", "Finalizing your resume..."];
function GeneratingLoader({
  onDone
}) {
  const [step, setStep] = reactExports.useState(0);
  const [progress, setProgress] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const total = 2400;
    const interval = 30;
    let elapsed = 0;
    const timer = setInterval(() => {
      elapsed += interval;
      setProgress(Math.min(elapsed / total * 100, 100));
      const stepIdx = Math.floor(elapsed / total * STEPS.length);
      setStep(Math.min(stepIdx, STEPS.length - 1));
      if (elapsed >= total) {
        clearInterval(timer);
        onDone();
      }
    }, interval);
    return () => clearInterval(timer);
  }, [onDone]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0
  }, animate: {
    opacity: 1
  }, className: "fixed inset-0 z-[100] flex flex-col items-center justify-center", style: {
    background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
      scale: [1, 1.08, 1],
      rotate: [0, 5, -5, 0]
    }, transition: {
      repeat: Infinity,
      duration: 2.4,
      ease: "easeInOut"
    }, className: "w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center shadow-2xl shadow-blue-500/40 mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-8 h-8 text-white" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold text-white mb-2 tracking-tight", children: "Writing your resume" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
      opacity: 0,
      y: 6
    }, animate: {
      opacity: 1,
      y: 0
    }, exit: {
      opacity: 0,
      y: -6
    }, transition: {
      duration: 0.3
    }, className: "text-blue-300 text-sm mb-10", children: STEPS[step] }, step),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-64 h-1.5 bg-white/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "h-full bg-blue-400 rounded-full", style: {
      width: `${progress}%`
    }, transition: {
      duration: 0.03
    } }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mt-8", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "w-1.5 h-1.5 rounded-full bg-blue-400/60", animate: {
      opacity: [0.3, 1, 0.3],
      scale: [0.8, 1.2, 0.8]
    }, transition: {
      repeat: Infinity,
      duration: 1.2,
      delay: i * 0.2
    } }, i)) })
  ] });
}
export {
  ChatOnboarding as component
};
