import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ArrowRight, Sparkles, Star, Users, TrendingUp, CheckCircle, Brain, FileText, Zap, Target, Layers, Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")(({
  head: () => ({
    meta: [
      { title: "MemoryCV — Turn memory into a professional resume" },
      { name: "description", content: "Import AI memory, extract a structured profile, tailor resumes for specific roles, and export polished documents in minutes." },
    ],
  }),
  component: Landing,
}));

/* ── Animated number counter ── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef(false);
  return (
    <motion.span
      onViewportEnter={() => {
        if (ref.current) return;
        ref.current = true;
        animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setVal(Math.round(v)) });
      }}
    >
      {val.toLocaleString()}{suffix}
    </motion.span>
  );
}

/* ── Sparkline chart ── */
function Sparkline({ color = "#2563eb" }: { color?: string }) {
  return (
    <svg viewBox="0 0 120 36" className="w-full h-8" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`sg-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 28 Q20 24 32 18 Q44 12 58 16 Q72 20 84 9 Q98 2 120 6"
        stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M0 28 Q20 24 32 18 Q44 12 58 16 Q72 20 84 9 Q98 2 120 6 L120 36 L0 36Z"
        fill={`url(#sg-${color.replace("#","")})`} />
    </svg>
  );
}

/* ── Navbar ── */
function Header() {
  return (
    <header className="saas-nav">
      <div className="app-frame px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 cursor-pointer" id="nav-logo">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-[1rem] font-bold tracking-tight text-slate-900">MemoryCV</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {[["Home","/"],["Features","/templates"],["Pricing","/dashboard"],["Contact","/"]].map(([label,path])=>(
              <Link key={label} to={path as any}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                id={`nav-${label.toLowerCase()}`}>{label}</Link>
            ))}
          </nav>
          <Link to="/onboarding" id="nav-free-trial"
            className="primary-button px-5 py-2.5 text-sm cursor-pointer">
            Free Trial
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ── Hero three CV-themed floating cards ── */
function HeroCards() {
  const cardBase = "bg-white rounded-2xl border border-blue-100 shadow-2xl select-none overflow-hidden cursor-pointer";
  return (
    <div className="relative w-full flex items-end justify-center -space-x-12 sm:space-x-0 sm:gap-5 transform scale-[0.8] sm:scale-100 origin-top" style={{ height: 380 }}>

      {/* LEFT — Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: -4 }}
        animate={{ opacity: 1, y: 0, rotate: -4 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 70 }}
        whileHover={{ y: -4, transition: { duration: 0.3, ease: "easeOut" }, zIndex: 30 }}
        className={cardBase}
        style={{ width: 192, alignSelf: "flex-end", zIndex: 10 }}
        id="hero-card-profile"
      >
        <div className="px-4 pt-4 pb-3 flex items-center gap-2.5" style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6)" }}>
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-white leading-tight">Sarah Chen</div>
            <div className="text-[8px] text-blue-200">Senior UX Designer</div>
          </div>
        </div>
        <div className="px-4 py-3 space-y-2.5">
          <div>
            <div className="text-[7px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Experience</div>
            {([["Google","Product Design","2021–Now"],["Figma Inc","UX Lead","2019–21"]] as [string,string,string][]).map(([co,role,yr])=>(
              <div key={co} className="flex justify-between items-start mb-1.5">
                <div>
                  <div className="text-[8.5px] font-semibold text-slate-800">{co}</div>
                  <div className="text-[7.5px] text-slate-400">{role}</div>
                </div>
                <span className="text-[7px] text-blue-400 font-medium">{yr}</span>
              </div>
            ))}
          </div>
          <div className="h-px bg-blue-50" />
          <div>
            <div className="text-[7px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Skills</div>
            <div className="flex flex-wrap gap-1">
              {["Figma","UX","Prototyping"].map(s=>(
                <span key={s} className="text-[7px] font-semibold px-1.5 py-0.5 rounded-full" style={{background:"#eff6ff",color:"#2563eb"}}>{s}</span>
              ))}
            </div>
          </div>
          <div className="h-px bg-blue-50" />
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-[7px] text-slate-400">Profile complete</span>
              <span className="text-[7px] font-bold text-blue-600">78%</span>
            </div>
            <div className="h-1.5 rounded-full bg-blue-100"><div className="h-full rounded-full bg-blue-500" style={{width:"78%"}} /></div>
          </div>
        </div>
      </motion.div>

      {/* CENTER — Resume Preview Card (tallest, elevated) */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 55 }}
        whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
        className={cardBase}
        style={{ width: 218, marginBottom: 48, zIndex: 20 }}
        id="hero-card-resume"
      >
        <div className="px-4 pt-4 pb-3 flex items-center justify-between" style={{ background: "linear-gradient(135deg,#1d4ed8,#2563eb)" }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
              <FileText className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <div className="text-[9px] font-bold text-white">Resume Preview</div>
              <div className="text-[7px] text-blue-200">AI-Generated</div>
            </div>
          </div>
          <span className="text-[7.5px] font-bold px-1.5 py-0.5 rounded-full bg-white" style={{ color:"#1d4ed8" }}>AI</span>
        </div>
        <div className="px-4 py-3 space-y-2.5">
          <div>
            <div className="h-2.5 rounded-full w-3/5 mb-1" style={{ background:"linear-gradient(90deg,#1d4ed8,#3b82f6)" }} />
            <div className="h-1.5 rounded-full bg-slate-200 w-4/5" />
          </div>
          <div className="h-px bg-blue-50" />
          <div>
            <div className="text-[7px] font-bold text-blue-600 uppercase tracking-widest mb-1.5">Experience</div>
            {["Google LLC","Dribbble Inc"].map(co=>(
              <div key={co} className="mb-1.5">
                <div className="flex justify-between">
                  <div className="h-1.5 rounded-full bg-slate-700 w-2/5" />
                  <div className="h-1.5 rounded-full bg-slate-300 w-1/4" />
                </div>
                <div className="h-1 rounded-full bg-slate-200 w-full mt-0.5" />
                <div className="h-1 rounded-full bg-slate-100 w-4/5 mt-0.5" />
              </div>
            ))}
          </div>
          <div className="h-px bg-blue-50" />
          <div>
            <div className="text-[7px] font-bold text-blue-600 uppercase tracking-widest mb-1.5">Skills</div>
            <div className="flex flex-wrap gap-1">
              {["React","Figma","UX","TypeScript"].map(s=>(
                <span key={s} className="text-[6.5px] font-semibold px-1.5 py-0.5 rounded-full" style={{ background:"#eff6ff", color:"#2563eb" }}>{s}</span>
              ))}
            </div>
          </div>
          <div className="h-px bg-blue-50" />
          <div>
            <div className="text-[7px] font-bold text-blue-600 uppercase tracking-widest mb-1">Education</div>
            <div className="h-1.5 rounded-full bg-slate-700 w-3/5 mb-0.5" />
            <div className="h-1 rounded-full bg-slate-200 w-2/5" />
          </div>
          <div className="flex items-center gap-1.5 rounded-xl px-2 py-1.5" style={{ background:"#eff6ff" }}>
            <Sparkles className="w-2.5 h-2.5 flex-shrink-0" style={{ color:"#2563eb" }} />
            <span className="text-[7px] font-semibold" style={{ color:"#1d4ed8" }}>Tailored for this role</span>
          </div>
        </div>
      </motion.div>

      {/* RIGHT — Job Match Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: 4 }}
        animate={{ opacity: 1, y: 0, rotate: 4 }}
        transition={{ delay: 0.62, type: "spring", stiffness: 70 }}
        whileHover={{ y: -4, transition: { duration: 0.3, ease: "easeOut" }, zIndex: 30 }}
        className={cardBase}
        style={{ width: 192, alignSelf: "flex-end", zIndex: 10 }}
        id="hero-card-match"
      >
        <div className="px-4 pt-4 pb-3" style={{ background: "linear-gradient(135deg,#1e40af,#2563eb)" }}>
          <div className="text-[7.5px] font-bold text-blue-200 uppercase tracking-widest mb-1">Job Match Score</div>
          <div className="text-3xl font-black text-white leading-none">94<span className="text-base font-bold text-blue-300">%</span></div>
          <div className="mt-2 h-1.5 rounded-full bg-white/20"><div className="h-full rounded-full bg-white" style={{width:"94%"}} /></div>
        </div>
        <div className="px-4 py-3 space-y-2">
          <div className="text-[7px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Breakdown</div>
          {([["Keywords",92],["Experience",96],["Skills",91],["Education",88]] as [string,number][]).map(([label,pct])=>(
            <div key={label}>
              <div className="flex justify-between mb-0.5">
                <span className="text-[7.5px] text-slate-500">{label}</span>
                <span className="text-[7.5px] font-bold text-blue-600">{pct}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-blue-50">
                <div className="h-full rounded-full" style={{width:`${pct}%`,background:"linear-gradient(90deg,#2563eb,#60a5fa)"}} />
              </div>
            </div>
          ))}
          <div className="h-px bg-blue-50" />
          <div className="flex items-center gap-1.5 rounded-xl px-2 py-1.5" style={{background:"#eff6ff"}}>
            <Zap className="w-2.5 h-2.5 flex-shrink-0 text-blue-500" />
            <span className="text-[7px] font-semibold text-blue-700">Strong match — Apply now</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section className="app-frame px-4 sm:px-6 pt-6 pb-0">
      {/* Rounded panel with cloud gradient */}
      <div className="hero-gradient relative overflow-hidden" style={{ paddingBottom: 80 }}>

        {/* Center content */}
        <div className="relative text-center pt-10 sm:pt-16 pb-4 px-4 sm:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-bold text-white leading-[1.12] tracking-tight mx-auto text-4xl sm:text-5xl md:text-6xl"
            style={{ maxWidth: 660 }}
          >
            Elevate Your Career<br className="hidden sm:block" />
            Management with{" "}
            <span className="inline-flex items-center align-middle mx-1.5 px-3 py-1 bg-blue-500/20 border border-blue-400/30 backdrop-blur-sm rounded-full -translate-y-1 shadow-[0_0_15px_rgba(59,130,246,0.3)] mt-2 sm:mt-0">
               <FileText className="w-5 h-5 sm:w-7 sm:h-7 mr-1.5 sm:mr-2 text-blue-200" />
               <span className="text-[#bfdbfe] text-3xl sm:text-4xl md:text-5xl">MemoryCV</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, duration: 0.5 }}
            className="mt-5 mx-auto leading-relaxed"
            style={{ color: "rgba(219,234,254,0.9)", fontSize: "0.97rem", maxWidth: 480 }}
          >
            Streamline your job search with our intuitive AI platform.
            Designed for professionals, our solutions simplify complex processes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.5 }}
            className="mt-8"
          >
            <Link to="/onboarding" id="hero-cta"
              className="inline-flex items-center gap-2 rounded-full bg-white font-semibold text-sm px-8 py-3.5 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer"
              style={{ color: "#1d4ed8" }}
            >
              Start now — It's Free
            </Link>
          </motion.div>
        </div>

        {/* Cards container — positioned to overflow the bottom edge of the panel */}
        <div className="relative mx-auto" style={{ maxWidth: 720, height: 220, marginTop: 40 }}>
          <HeroCards />
        </div>
      </div>
    </section>
  );
}


/* ── Stats Bento ── */
const stats = [
  { icon: Users,       value: 2500,  suffix: "+", label: "Partners & customers",  id: "stat-partners" },
  { icon: TrendingUp,  value: 2259,  suffix: "+", label: "Base invest in 2024",   id: "stat-invest"   },
  { icon: Star,        value: 49,    suffix: "/5.0", label: "Customer review",    id: "stat-rating"   },
];

function StatsSection() {
  return (
    <section className="app-frame px-4 sm:px-6 pb-16" style={{ paddingTop: 120 }}>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight"
        >
          Unlock the Power of Your<br />
          Business <span className="gradient-text">Data</span>
        </motion.h2>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
          <Link to="/onboarding" id="stats-free-trial" className="primary-button px-6 py-3 text-sm cursor-pointer flex-shrink-0">
            Free Trial
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.id} id={s.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -4, boxShadow: "0 12px 32px -8px rgba(37,99,235,0.18)", transition: { duration: 0.22 } }}
            className="stat-card cursor-pointer"
          >
            <div className="stat-icon-badge">
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── Workflow bento grid ── */
const steps = [
  { n: 1, title: "Sign Up and Customize",   body: "Create your account in minutes and tailor the platform to meet your unique career needs.", icon: Sparkles },
  { n: 2, title: "Import Your AI Memory",   body: "Paste memory from ChatGPT, Claude, Gemini, or your narrative notes to extract a structured profile.", icon: Brain },
  { n: 3, title: "Generate & Export",       body: "Switch templates, tune bullets, tailor to job descriptions, and export a recruiter-ready PDF.", icon: FileText },
];

function WorkflowSection() {
  return (
    <section className="px-4 sm:px-6 pt-40 pb-24 bg-gradient-to-b from-blue-50/60 via-white to-[#f0f5ff] relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-blue-100/40 rounded-full blur-[100px] opacity-70 mix-blend-multiply pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[500px] bg-sky-100/40 rounded-full blur-[100px] opacity-60 mix-blend-multiply pointer-events-none" />
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-950 tracking-tight leading-tight mb-4">
            The Ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">Resume Engine</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Everything you need to turn scattered career memories into highly-targeted, ATS-beating resumes in seconds.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: AI Extraction (Span 2) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-[radial-gradient(ellipse_at_center,_#ffffff_0%,_#eff6ff_100%)] rounded-3xl p-8 md:p-10 border border-blue-200 shadow-[inset_0_0_20px_rgba(37,99,235,0.05)] hover:border-blue-300 hover:shadow-[inset_0_0_30px_rgba(37,99,235,0.1),0_8px_40px_rgba(37,99,235,0.12)] transition-all duration-700 overflow-hidden relative group"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl -mr-20 -mt-20 opacity-0 group-hover:opacity-100 group-hover:scale-125 group-hover:rotate-12 transition-all duration-1000 ease-out" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl -ml-20 -mb-20 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 delay-100 ease-out" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 bg-white text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-sm border border-blue-100">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">AI Memory Extraction</h3>
              <p className="text-slate-500 leading-relaxed max-w-md mb-8">
                Dump your performance reviews, rough notes, or old cover letters. Our AI instantly categorizes it into a structured, queryable career database.
              </p>
              
              <div className="mt-auto relative h-32 bg-white/60 backdrop-blur-md rounded-2xl border border-blue-100 overflow-hidden p-4 group-hover:border-blue-200 group-hover:bg-white/80 transition-colors duration-700 shadow-sm">
                <div className="flex gap-4 items-center h-full">
                  <div className="flex-1 space-y-2.5 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="h-1.5 w-full bg-blue-200 rounded-full" />
                    <div className="h-1.5 w-5/6 bg-blue-200 rounded-full" />
                    <div className="h-1.5 w-4/6 bg-blue-200 rounded-full" />
                    <div className="h-1.5 w-full bg-blue-200 rounded-full" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-blue-400 flex-shrink-0 group-hover:text-blue-600 group-hover:translate-x-2 transition-all duration-700" />
                  <div className="flex-1 flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-[10px] font-bold text-blue-700 shadow-sm translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-110 hover:bg-blue-100 hover:border-blue-300 cursor-default">React.js</span>
                    <span className="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-[10px] font-bold text-blue-700 shadow-sm translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-110 hover:bg-blue-100 hover:border-blue-300 cursor-default">Product Lead</span>
                    <span className="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-[10px] font-bold text-blue-700 shadow-sm translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-110 hover:bg-blue-100 hover:border-blue-300 cursor-default">Q3 Metrics</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: ATS Matching (Span 1) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1 bg-[radial-gradient(ellipse_at_center,_#ffffff_0%,_#eff6ff_100%)] rounded-3xl p-8 md:p-10 border border-blue-200 shadow-[inset_0_0_20px_rgba(37,99,235,0.05)] hover:border-blue-300 hover:shadow-[inset_0_0_30px_rgba(37,99,235,0.1),0_8px_40px_rgba(37,99,235,0.12)] transition-all duration-700 overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 bg-white text-blue-600 shadow-sm border border-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Role Tailoring</h3>
              <p className="text-slate-500 leading-relaxed mb-8">
                Auto-align your resume to hit all the right keywords and beat the ATS.
              </p>
              <div className="mt-auto flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-700">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90 group-hover:rotate-0 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-blue-100" />
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset="251.2" className="text-blue-500 transition-all duration-1500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:stroke-dashoffset-[10]" />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-black text-slate-900 group-hover:scale-110 transition-transform duration-500 delay-300">96<span className="text-sm text-blue-500">%</span></span>
                    <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest mt-1">Match</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Templates (Span 1) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1 bg-[radial-gradient(ellipse_at_center,_#ffffff_0%,_#eff6ff_100%)] rounded-3xl p-8 md:p-10 border border-blue-200 shadow-[inset_0_0_20px_rgba(37,99,235,0.05)] hover:border-blue-300 hover:shadow-[inset_0_0_30px_rgba(37,99,235,0.1),0_8px_40px_rgba(37,99,235,0.12)] transition-all duration-700 overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 bg-white text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm border border-blue-100">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Smart Templates</h3>
              <p className="text-slate-500 leading-relaxed mb-8">
                Swap between premium, ATS-friendly designs without breaking formatting.
              </p>
              <div className="mt-auto relative h-32 flex justify-center items-end overflow-hidden">
                {/* Template 1 (Classic) */}
                <div className="absolute bottom-0 w-3/4 h-28 bg-white border border-blue-100 rounded-t-xl p-3 transform transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-full group-hover:opacity-0 group-hover:scale-95 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                  <div className="w-1/2 h-2 bg-blue-200 rounded-full mb-3" />
                  <div className="space-y-1.5">
                    <div className="w-full h-1.5 bg-slate-100 rounded-full" />
                    <div className="w-5/6 h-1.5 bg-slate-100 rounded-full" />
                    <div className="w-4/6 h-1.5 bg-slate-100 rounded-full" />
                  </div>
                </div>

                {/* Template 2 (Modern split layout) sliding in on hover */}
                <div className="absolute bottom-0 w-3/4 h-28 bg-white border border-blue-200 rounded-t-xl p-3 transform translate-y-full opacity-0 scale-95 transition-all duration-700 delay-75 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-100 shadow-[0_-8px_20px_rgba(37,99,235,0.08)]">
                  <div className="flex gap-2 h-full">
                    <div className="w-1/3 bg-slate-50 rounded flex flex-col items-center py-2">
                       <div className="w-4 h-4 bg-blue-200 rounded-full mb-1.5" />
                       <div className="w-2/3 h-1 bg-slate-200 rounded-full" />
                    </div>
                    <div className="flex-1 space-y-1.5 mt-1">
                      <div className="w-full h-1.5 bg-slate-100 rounded-full" />
                      <div className="w-5/6 h-1.5 bg-slate-100 rounded-full" />
                      <div className="w-full h-1.5 bg-slate-100 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Version Control (Span 2) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 rounded-3xl p-8 md:p-10 border border-blue-400 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.3),0_8px_40px_rgba(37,99,235,0.4)] transition-all duration-500 overflow-hidden relative group"
          >
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-30">
              <svg viewBox="0 0 400 400" className="absolute -right-20 -top-20 w-[500px] h-[500px] text-white">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center h-full">
              <div className="flex-1">
                <div className="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm group-hover:rotate-12 transition-transform duration-500">
                  <Download className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">One-Click Export</h3>
                <p className="text-blue-100 leading-relaxed">
                  Generate pixel-perfect PDFs ready for the recruiter's inbox. Manage unlimited tailored versions of your resume from a single source of truth.
                </p>
              </div>
              <div className="flex-1 w-full flex flex-col gap-3">
                {[
                  { name: "Frontend_Engineer_Google.pdf", time: "Just now", initial: "translate-x-4", delay: "delay-0" },
                  { name: "Fullstack_Stripe_Draft.pdf", time: "2 hrs ago", initial: "translate-x-8", delay: "delay-75" },
                  { name: "UX_Designer_Apple.pdf", time: "Yesterday", initial: "translate-x-12", delay: "delay-150" }
                ].map((file, i) => (
                  <div key={i} className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 flex items-center justify-between transform transition-all duration-500 ease-out group-hover:translate-x-0 ${file.initial} ${file.delay}`}>
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-blue-200" />
                      <div>
                        <div className="text-xs font-semibold text-white">{file.name}</div>
                        <div className="text-[9px] text-blue-200">{file.time}</div>
                      </div>
                    </div>
                    <button className="w-7 h-7 rounded-full bg-white text-blue-600 flex items-center justify-center hover:bg-blue-50 transition-colors">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* CTA band */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-16 rounded-2xl px-8 py-14 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(145deg,#1e40af 0%,#2563eb 55%,#3b82f6 100%)" }}
        id="closing-cta"
      >
        <div className="absolute top-4 right-10 w-20 h-14 rounded-xl opacity-15 border border-white/20 bg-white/10 rotate-6 pointer-events-none" />
        <div className="absolute bottom-4 left-10 w-16 h-10 rounded-xl opacity-10 border border-white/15 bg-white/8 -rotate-3 pointer-events-none" />
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Build resumes with stronger signal and less waste.
        </h2>
        <p className="text-blue-100/80 text-sm mb-8 max-w-[44ch] mx-auto">
          Import memory, confirm your profile, generate for a role, and refine where it matters.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/onboarding" id="closing-cta-btn"
            className="inline-flex items-center gap-2 rounded-full bg-white text-blue-700 font-bold text-sm px-7 py-3.5 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer">
            Open the workflow <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/templates" id="closing-templates-btn"
            className="hero-outline-button px-7 py-3.5">
            View Templates
          </Link>
        </div>
      </motion.div>

      {/* Trust row */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400">
        {["No credit card required","Free 14-day trial","Cancel anytime"].map((item) => (
          <div key={item} className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-blue-500" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Landing() {
  return (
    <div className="page-shell bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <StatsSection />
        <WorkflowSection />
      </main>
    </div>
  );
}
