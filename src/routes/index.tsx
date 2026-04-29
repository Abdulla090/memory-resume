import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, animate } from "framer-motion";
import { ArrowRight, Sparkles, Star, Users, TrendingUp, CheckCircle, Brain, FileText, Zap, Target, Layers, Download, Menu } from "lucide-react";
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
  const [mobileOpen, setMobileOpen] = useState(false);
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
            {[["Home","/"],["Features","/templates"],["Build Resume","/onboarding"],["Contact","/"]].map(([label,path])=>(
              <Link key={label} to={path as any}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                id={`nav-${label.toLowerCase()}`}>{label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/onboarding" id="nav-free-trial"
              className="primary-button px-4 sm:px-5 py-2.5 text-sm cursor-pointer">
              Free Trial
            </Link>
            <button
              className="md:hidden w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
        {/* Mobile nav drawer */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-slate-100 mt-1">
            {[["Home","/"],["Features","/templates"],["Build Resume","/onboarding"],["Contact","/"]].map(([label,path])=>(
              <Link key={label} to={path as any}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >{label}</Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}


export const LeftCardSVG = () => (
  <svg viewBox="0 0 240 320" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="left-header-gradient" x1="0" y1="0" x2="240" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2563eb" />
        <stop offset="1" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
    {/* Card Background */}
    <rect width="240" height="320" rx="16" fill="#ffffff" />
    <rect x="0.5" y="0.5" width="239" height="319" rx="15.5" fill="none" stroke="#e2e8f0" />
    
    {/* Header Accent */}
    <path d="M0 16C0 7.16344 7.16344 0 16 0H224C232.837 0 240 7.16344 240 16V80H0V16Z" fill="url(#left-header-gradient)" />

    {/* Avatar */}
    <circle cx="48" cy="40" r="24" fill="white" fillOpacity="0.2" />
    <circle cx="48" cy="40" r="20" fill="white" />
    <path d="M48 34C44.6863 34 42 36.6863 42 40C42 43.3137 44.6863 46 48 46C51.3137 46 54 43.3137 54 40C54 36.6863 51.3137 34 48 34ZM38 40C38 34.4772 42.4772 30 48 30C53.5228 30 58 34.4772 58 40C58 45.5228 53.5228 50 48 50C42.4772 50 38 45.5228 38 40Z" fill="#2563eb" />
    
    <text x="84" y="36" fill="white" fontSize="16" fontWeight="bold" fontFamily="system-ui, sans-serif">Sarah Chen</text>
    <text x="84" y="52" fill="#bfdbfe" fontSize="11" fontFamily="system-ui, sans-serif">Senior UX Designer</text>

    {/* Body Content */}
    <text x="24" y="110" fill="#2563eb" fontSize="9" fontWeight="bold" letterSpacing="1" fontFamily="system-ui, sans-serif">PROFESSIONAL EXPERIENCE</text>
    
    {/* Job 1 */}
    <rect x="24" y="124" width="2" height="24" fill="#3b82f6" />
    <text x="34" y="132" fill="#0f172a" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">Google</text>
    <text x="216" y="132" fill="#64748b" fontSize="9" textAnchor="end" fontFamily="system-ui, sans-serif">2021 – Present</text>
    <text x="34" y="146" fill="#475569" fontSize="10" fontFamily="system-ui, sans-serif">Senior Product Designer</text>
    
    {/* Job 2 */}
    <rect x="24" y="164" width="2" height="24" fill="#cbd5e1" />
    <text x="34" y="172" fill="#0f172a" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">Figma</text>
    <text x="216" y="172" fill="#64748b" fontSize="9" textAnchor="end" fontFamily="system-ui, sans-serif">2019 – 2021</text>
    <text x="34" y="186" fill="#475569" fontSize="10" fontFamily="system-ui, sans-serif">UX Lead</text>

    {/* Skills */}
    <text x="24" y="224" fill="#2563eb" fontSize="9" fontWeight="bold" letterSpacing="1" fontFamily="system-ui, sans-serif">CORE SKILLS</text>
    <rect x="24" y="234" width="56" height="20" rx="10" fill="#eff6ff" />
    <text x="52" y="247" fill="#1d4ed8" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="system-ui, sans-serif">UI Design</text>
    
    <rect x="84" y="234" width="60" height="20" rx="10" fill="#eff6ff" />
    <text x="114" y="247" fill="#1d4ed8" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="system-ui, sans-serif">Prototyping</text>

    <rect x="148" y="234" width="68" height="20" rx="10" fill="#eff6ff" />
    <text x="182" y="247" fill="#1d4ed8" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="system-ui, sans-serif">User Testing</text>

    {/* Completion Status */}
    <path d="M24 286 L216 286" stroke="#f1f5f9" strokeWidth="6" strokeLinecap="round" />
    <path d="M24 286 L170 286" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" />
    <text x="24" y="274" fill="#64748b" fontSize="8" fontFamily="system-ui, sans-serif">Profile Extraction Complete</text>
    <text x="216" y="274" fill="#2563eb" fontSize="9" fontWeight="bold" textAnchor="end" fontFamily="system-ui, sans-serif">100%</text>
  </svg>
);

export const CenterCardSVG = () => (
  <svg viewBox="0 0 280 400" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="280" height="400" rx="8" fill="#ffffff" />
    <rect x="0.5" y="0.5" width="279" height="399" rx="7.5" fill="none" stroke="#e2e8f0" />
    
    {/* Elegant floating overlay badge indicating it's an AI preview */}
    <g transform="translate(190, 10)">
      <rect width="80" height="24" rx="12" fill="#eff6ff" stroke="#bfdbfe" />
      <text x="40" y="26" fill="#1d4ed8" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="system-ui, sans-serif" transform="translate(0, -9)">AI GENERATED</text>
    </g>

    {/* Name and Contact */}
    <text x="140" y="56" fill="#0f172a" fontSize="18" fontWeight="bold" textAnchor="middle" fontFamily="system-ui, sans-serif">ALEXANDRA SMITH</text>
    <text x="140" y="68" fill="#64748b" fontSize="8" textAnchor="middle" fontFamily="system-ui, sans-serif">New York, NY • alexandra@email.com • (555) 123-4567</text>
    
    <path d="M20 80 L260 80" stroke="#f1f5f9" strokeWidth="1" />
    
    {/* Summary */}
    <text x="20" y="96" fill="#2563eb" fontSize="10" fontWeight="bold" fontFamily="system-ui, sans-serif">PROFESSIONAL SUMMARY</text>
    <text x="20" y="110" fill="#475569" fontSize="7" fontFamily="system-ui, sans-serif">Results-driven Senior Engineer with 8+ years of experience in scalable web</text>
    <text x="20" y="120" fill="#475569" fontSize="7" fontFamily="system-ui, sans-serif">architecture and cloud-native applications. Proven track record of leading</text>
    <text x="20" y="130" fill="#475569" fontSize="7" fontFamily="system-ui, sans-serif">cross-functional teams to deliver enterprise-grade solutions.</text>

    {/* Experience */}
    <text x="20" y="156" fill="#2563eb" fontSize="10" fontWeight="bold" fontFamily="system-ui, sans-serif">EXPERIENCE</text>
    
    <text x="20" y="172" fill="#0f172a" fontSize="9" fontWeight="bold" fontFamily="system-ui, sans-serif">TechCorp Industries</text>
    <text x="260" y="172" fill="#0f172a" fontSize="8" fontWeight="bold" textAnchor="end" fontFamily="system-ui, sans-serif">2020 - Present</text>
    <text x="20" y="182" fill="#64748b" fontSize="8" fontStyle="italic" fontFamily="system-ui, sans-serif">Senior Software Engineer</text>
    <circle cx="26" cy="194" r="1.5" fill="#3b82f6" />
    <text x="32" y="196" fill="#475569" fontSize="7" fontFamily="system-ui, sans-serif">Architected microservices migrating 2M+ users with 99.99% uptime.</text>
    <circle cx="26" cy="206" r="1.5" fill="#3b82f6" />
    <text x="32" y="208" fill="#475569" fontSize="7" fontFamily="system-ui, sans-serif">Reduced AWS infrastructure costs by 30% through resource optimization.</text>
    
    <text x="20" y="230" fill="#0f172a" fontSize="9" fontWeight="bold" fontFamily="system-ui, sans-serif">Innovate Software</text>
    <text x="260" y="230" fill="#0f172a" fontSize="8" fontWeight="bold" textAnchor="end" fontFamily="system-ui, sans-serif">2016 - 2020</text>
    <text x="20" y="240" fill="#64748b" fontSize="8" fontStyle="italic" fontFamily="system-ui, sans-serif">Software Engineer</text>
    <circle cx="26" cy="252" r="1.5" fill="#3b82f6" />
    <text x="32" y="254" fill="#475569" fontSize="7" fontFamily="system-ui, sans-serif">Developed RESTful APIs serving 50M+ requests monthly.</text>
    <circle cx="26" cy="264" r="1.5" fill="#3b82f6" />
    <text x="32" y="266" fill="#475569" fontSize="7" fontFamily="system-ui, sans-serif">Mentored 4 junior developers and established CI/CD best practices.</text>

    {/* Education */}
    <text x="20" y="296" fill="#2563eb" fontSize="10" fontWeight="bold" fontFamily="system-ui, sans-serif">EDUCATION</text>
    <text x="20" y="312" fill="#0f172a" fontSize="9" fontWeight="bold" fontFamily="system-ui, sans-serif">University of Technology</text>
    <text x="260" y="312" fill="#0f172a" fontSize="8" fontWeight="bold" textAnchor="end" fontFamily="system-ui, sans-serif">2012 - 2016</text>
    <text x="20" y="322" fill="#64748b" fontSize="8" fontStyle="italic" fontFamily="system-ui, sans-serif">Bachelor of Science in Computer Science</text>
    
    {/* Skills Mini */}
    <text x="20" y="352" fill="#2563eb" fontSize="10" fontWeight="bold" fontFamily="system-ui, sans-serif">TECHNICAL SKILLS</text>
    <text x="20" y="368" fill="#475569" fontSize="7" fontFamily="system-ui, sans-serif"><tspan fontWeight="bold" fill="#0f172a">Languages:</tspan> JavaScript, TypeScript, Python, Java, Go</text>
    <text x="20" y="380" fill="#475569" fontSize="7" fontFamily="system-ui, sans-serif"><tspan fontWeight="bold" fill="#0f172a">Frameworks:</tspan> React, Node.js, Express, Django, Next.js</text>
  </svg>
);

export const RightCardSVG = () => (
  <svg viewBox="0 0 240 320" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="right-header-gradient" x1="0" y1="0" x2="240" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1e3a8a" />
        <stop offset="1" stopColor="#1e40af" />
      </linearGradient>
    </defs>
    <rect width="240" height="320" rx="16" fill="#ffffff" />
    <rect x="0.5" y="0.5" width="239" height="319" rx="15.5" fill="none" stroke="#e2e8f0" />
    
    <path d="M0 16C0 7.16344 7.16344 0 16 0H224C232.837 0 240 7.16344 240 16V100H0V16Z" fill="url(#right-header-gradient)" />
    
    <text x="24" y="36" fill="#93c5fd" fontSize="10" fontWeight="bold" letterSpacing="1" fontFamily="system-ui, sans-serif">TARGET ROLE MATCH</text>
    <text x="24" y="76" fill="white" fontSize="42" fontWeight="900" fontFamily="system-ui, sans-serif">96<tspan fontSize="24" fill="#93c5fd">%</tspan></text>
    
    <rect x="24" y="124" width="24" height="24" rx="6" fill="#dcfce7" />
    <path d="M30 136L34 140L42 130" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <text x="56" y="136" fill="#0f172a" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">Strong Match</text>
    <text x="56" y="148" fill="#64748b" fontSize="9" fontFamily="system-ui, sans-serif">Ready to apply for Senior Dev</text>

    <text x="24" y="184" fill="#2563eb" fontSize="9" fontWeight="bold" letterSpacing="1" fontFamily="system-ui, sans-serif">MATCH BREAKDOWN</text>
    
    <text x="24" y="206" fill="#334155" fontSize="10" fontWeight="600" fontFamily="system-ui, sans-serif">Required Skills</text>
    <text x="216" y="206" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="end" fontFamily="system-ui, sans-serif">100%</text>
    <path d="M24 216 L216 216" stroke="#f1f5f9" strokeWidth="6" strokeLinecap="round" />
    <path d="M24 216 L216 216" stroke="#16a34a" strokeWidth="6" strokeLinecap="round" />

    <text x="24" y="238" fill="#334155" fontSize="10" fontWeight="600" fontFamily="system-ui, sans-serif">Experience Level</text>
    <text x="216" y="238" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="end" fontFamily="system-ui, sans-serif">90%</text>
    <path d="M24 248 L216 248" stroke="#f1f5f9" strokeWidth="6" strokeLinecap="round" />
    <path d="M24 248 L196 248" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />

    <text x="24" y="270" fill="#334155" fontSize="10" fontWeight="600" fontFamily="system-ui, sans-serif">Keywords</text>
    <text x="216" y="270" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="end" fontFamily="system-ui, sans-serif">85%</text>
    <path d="M24 280 L216 280" stroke="#f1f5f9" strokeWidth="6" strokeLinecap="round" />
    <path d="M24 280 L180 280" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />

  </svg>
);

/* ── Hero three CV-themed floating cards ── */
function HeroCards() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "center center"]
  });
  
  // Smooth fan-out animation linked to the scroll position relative to the element
  // Opens entirely when the center of the cards reaches the center of the viewport
  const leftX = useTransform(scrollYProgress, [0, 1], ["0%", "-110%"]);
  const leftY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const leftRotate = useTransform(scrollYProgress, [0, 1], [0, -12]);

  const rightX = useTransform(scrollYProgress, [0, 1], ["0%", "110%"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const rightRotate = useTransform(scrollYProgress, [0, 1], [0, 12]);

  // Center card slightly moves up for a subtle parallax feel
  const centerY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <div ref={ref} className="relative w-full flex items-center justify-center origin-top" style={{ height: "clamp(240px,50vw,400px)" }}>

      {/* LEFT */}
      <motion.div className="absolute shadow-[0_20px_40px_rgba(0,0,0,0.15)] rounded-2xl" style={{ width: "clamp(120px,20vw,220px)", zIndex: 10, x: leftX, y: leftY, rotate: leftRotate }}
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 70 }} id="hero-card-profile">
        <LeftCardSVG />
      </motion.div>

      {/* RIGHT */}
      <motion.div className="absolute shadow-[0_20px_40px_rgba(0,0,0,0.15)] rounded-2xl" style={{ width: "clamp(120px,20vw,220px)", zIndex: 10, x: rightX, y: rightY, rotate: rightRotate }}
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 70 }} id="hero-card-match">
        <RightCardSVG />
      </motion.div>

      {/* CENTER */}
      <motion.div className="absolute shadow-[0_25px_50px_rgba(37,99,235,0.25)] rounded-lg" style={{ width: "clamp(150px,26vw,280px)", zIndex: 20, y: centerY }}
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 70 }} id="hero-card-resume">
        <CenterCardSVG />
      </motion.div>

    </div>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section className="app-frame px-3 sm:px-6 pt-4 sm:pt-6 pb-0">
      <div className="hero-gradient relative overflow-hidden pb-16 sm:pb-20">

        {/* Center content */}
        <div className="relative text-center pt-8 sm:pt-16 pb-4 px-4 sm:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-bold text-white leading-[1.12] tracking-tight mx-auto text-3xl sm:text-5xl md:text-6xl"
            style={{ maxWidth: 660 }}
          >
            Elevate Your Career<br className="hidden sm:block" />
            Management with{" "}
            <span className="inline-flex items-center align-middle mx-1 px-2 sm:px-3 py-1 bg-blue-500/20 border border-blue-400/30 backdrop-blur-sm rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)] mt-1 sm:mt-0">
               <FileText className="w-4 h-4 sm:w-7 sm:h-7 mr-1 sm:mr-2 text-blue-200" />
               <span className="text-[#bfdbfe] text-2xl sm:text-4xl md:text-5xl">MemoryCV</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, duration: 0.5 }}
            className="mt-4 mx-auto leading-relaxed text-sm sm:text-base"
            style={{ color: "rgba(219,234,254,0.9)", maxWidth: 480 }}
          >
            Streamline your job search with our intuitive AI platform.
            Designed for professionals, our solutions simplify complex processes.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26, duration: 0.5 }} className="mt-6 sm:mt-8">
            <Link to="/onboarding" id="hero-cta"
              className="inline-flex items-center gap-2 rounded-full bg-white font-semibold text-sm px-6 sm:px-8 py-3 sm:py-3.5 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer"
              style={{ color: "#1d4ed8" }}
            >
              Start now — It's Free
            </Link>
          </motion.div>
        </div>

        {/* Cards container */}
        <div className="relative mx-auto" style={{ maxWidth: "min(720px,100%)", height: "clamp(180px,42vw,260px)", marginTop: "clamp(40px,8vw,80px)" }}>
          <HeroCards />
        </div>
      </div>
    </section>
  );
}


/* ── Stats Bento ── */
const stats = [
  { icon: Users,       value: 150,   suffix: "K+", label: "Resumes Generated",  id: "stat-partners" },
  { icon: TrendingUp,  value: 85,    suffix: "%",  label: "Higher Interview Rate", id: "stat-invest"   },
  { icon: Star,        value: 49,    suffix: "/5.0", label: "Average User Rating", id: "stat-rating"   },
];

function StatsSection() {
  return (
    <section className="app-frame px-4 sm:px-6 pb-16 sm:pb-24 relative" style={{ paddingTop: "clamp(80px,14vw,140px)" }}>
      {/* Background Subtle Glows */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-100/40 blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-sky-100/40 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 sm:mb-16">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight"
        >
          Unlock the Power of Your<br />
          Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">Career</span>
        </motion.h2>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="shrink-0">
          <Link to="/onboarding" id="stats-free-trial" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-[0_10px_20px_rgba(37,99,235,0.2)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.3)] transition-all duration-300 transform hover:-translate-y-1 whitespace-nowrap">
            Build Your CV Free
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.id} id={s.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -6, boxShadow: "0 25px 50px -12px rgba(37,99,235,0.15)", transition: { duration: 0.3 } }}
            className="relative bg-white/80 backdrop-blur-xl border border-slate-100 p-8 sm:p-10 rounded-[2rem] shadow-lg flex flex-col items-start overflow-hidden group cursor-pointer"
          >
            {/* Hover subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30 mb-6 relative z-10 transform group-hover:scale-110 transition-transform duration-300">
              <s.icon className="w-6 h-6 text-white" />
            </div>
            
            <div className="relative z-10">
              <div className="text-4xl font-black text-slate-900 tracking-tight flex items-baseline">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="text-sm font-semibold text-slate-500 mt-2 uppercase tracking-wider">{s.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── Premium Bento Grid Sections ── */

const BentoHeroCard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(37,99,235,0.15)" }}
      className="w-full rounded-[2rem] overflow-hidden relative group bg-gradient-to-br from-[#e8f3ff] to-[#cce4ff] border border-white/50 shadow-xl"
    >
      {/* Background clouds and airplane */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft bottom clouds */}
        <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[200px] bg-white/60 blur-2xl rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[300px] bg-white/80 blur-3xl rounded-full" />
        
        {/* Airplane trailing line SVG */}
        <svg className="absolute top-[20%] left-[45%] w-[150px] h-[150px] overflow-visible" fill="none">
          <path d="M0,150 Q50,100 150,0" stroke="white" strokeWidth="2" strokeDasharray="6 6" className="opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
          <path d="M150,0 L130,5 L140,25 Z" fill="white" className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
        </svg>
      </div>

      <div className="relative z-10 p-6 sm:p-10 md:p-14 flex flex-col md:flex-row h-full items-center gap-8 md:gap-0">
        {/* Left Content */}
        <div className="w-full md:w-1/2 flex flex-col items-start text-left relative z-20">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 flex items-center gap-2 mb-8 shadow-sm border border-white">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-semibold text-blue-700">AI-Powered</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-4 sm:mb-6 tracking-tight">
            Build a CV that<br/>
            <span className="text-blue-600">gets you hired.</span>
          </h2>
          
          <p className="text-slate-600 text-lg md:text-xl font-medium mb-10 max-w-[28ch] leading-relaxed">
            Create a professional CV in minutes with the power of AI.
          </p>
          
          <Link to="/onboarding" className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-8 py-4 font-bold text-lg flex items-center gap-2 shadow-[0_8px_20px_-6px_rgba(37,99,235,0.5)] hover:shadow-[0_12px_25px_-6px_rgba(37,99,235,0.6)] hover:-translate-y-1 transition-all duration-300">
            Build My CV <ArrowRight className="w-5 h-5" />
          </Link>
          
          <div className="flex items-center gap-4 mt-8">
            <div className="flex -space-x-3">
              {[1,2,3,4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#e8f3ff] bg-slate-200 overflow-hidden shadow-sm">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-[#e8f3ff] bg-white flex items-center justify-center shadow-sm text-blue-600 font-bold text-lg">+</div>
            </div>
            <span className="text-sm font-semibold text-slate-600">Loved by 100K+ job seekers</span>
          </div>
        </div>

        {/* Right Content - Cloudy Resume Mockups */}
        <div className="w-full md:w-1/2 relative h-[300px] sm:h-[380px] md:h-[450px] flex justify-center items-center pointer-events-none">
          
          {/* Cloudy Background Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-blue-300/30 via-white/50 to-blue-200/30 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute top-[10%] right-[5%] w-[200px] h-[150px] bg-white/70 blur-2xl rounded-full pointer-events-none" />
          <div className="absolute bottom-[5%] left-[5%] w-[250px] h-[180px] bg-[#e0f2fe]/60 blur-3xl rounded-full pointer-events-none" />

          <div className="relative w-[260px] sm:w-[320px] md:w-[340px] h-[320px] sm:h-[380px] md:h-[400px] pointer-events-none select-none flex items-center justify-center">
            
            {/* Back Resume — rotated right, shifted up & scaled up */}
            <div 
              className="absolute top-[2%] right-[2%] w-[160px] sm:w-[200px] md:w-[220px] origin-center shadow-[0_20px_40px_rgba(0,0,0,0.15)] rounded-2xl transition-transform duration-700 hover:scale-105"
              style={{ transform: 'rotate(10deg) translateX(15px) translateY(-15px)' }}
            >
              <LeftCardSVG />
            </div>

            {/* Front Resume — rotated left, shifted down & scaled up */}
            <div 
              className="absolute bottom-[2%] left-[2%] w-[180px] sm:w-[220px] md:w-[250px] origin-center z-10 shadow-[0_25px_35px_rgba(37,99,235,0.15)] rounded-lg transition-transform duration-700 hover:scale-105"
              style={{ transform: 'rotate(-8deg) translateX(-15px) translateY(10px)' }}
            >
              <CenterCardSVG />
            </div>

            {/* Foreground subtle cloud overlay for depth */}
            <div className="absolute -bottom-10 -left-10 w-[200px] h-[150px] bg-white/30 blur-2xl rounded-full z-20 pointer-events-none" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BentoStandOutCard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(37,99,235,0.1)" }}
      className="w-full rounded-[2rem] bg-white border border-slate-100 shadow-xl overflow-hidden relative group p-10 flex flex-col justify-between min-h-[360px]"
    >
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#f0f7ff] to-transparent pointer-events-none z-0" />
      <div className="absolute right-[-10%] bottom-[-10%] w-[300px] h-[300px] bg-[#e0f2fe]/50 blur-3xl rounded-full pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-[200px]">
        <h3 className="text-3xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-2">
          Stand out.<br/>
          <span className="text-blue-500">Get noticed.</span>
        </h3>
        <p className="text-slate-500 text-sm font-medium mt-4 leading-relaxed">
          A great CV opens doors to greater opportunities.
        </p>
      </div>

      <div className="relative z-10 flex flex-col gap-1 mt-auto pt-8">
        <div className="flex -space-x-2">
          {[1,2,3,4].map((i) => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
              <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="user" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <p className="text-[10px] text-slate-400 font-semibold max-w-[120px] mt-2 leading-snug">
          Join 100K+ successful professionals
        </p>
      </div>

      {/* Right side illustration */}
      <div className="absolute right-[-20px] bottom-0 w-[240px] h-[280px] pointer-events-none z-10 flex items-end justify-center">
        <motion.img 
          src="/images/bento/3d guy transparent.png" 
          alt="3D Character"
          className="w-full h-full object-contain object-bottom drop-shadow-2xl transition-transform duration-500 pointer-events-none select-none"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
    </motion.div>
  );
};

const BentoSecurityCard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(37,99,235,0.1)" }}
      className="w-full rounded-[2rem] bg-white border border-slate-100 shadow-xl overflow-hidden relative group p-10 flex flex-col justify-between min-h-[360px]"
    >
      <div className="absolute right-0 top-0 w-2/3 h-full bg-gradient-to-l from-[#f0f7ff] to-transparent pointer-events-none z-0" />
      
      <div className="relative z-10 w-full max-w-[220px]">
        <h3 className="text-3xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-2">
          Your data is<br/>
          <span className="text-blue-500">100% secure.</span>
        </h3>
        <p className="text-slate-500 text-sm font-medium mt-4 leading-relaxed">
          We use enterprise-grade security to protect your information.
        </p>
      </div>

      <div className="relative z-10 mt-auto pt-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:shadow-md transition-shadow">
          <div className="text-blue-500"><svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor"><path d="M7 0C4.79 0 3 1.79 3 4V5H2C0.9 5 0 5.9 0 7V14C0 15.1 0.9 16 2 16H12C13.1 16 14 15.1 14 14V7C14 5.9 13.1 5 12 5H11V4C11 1.79 9.21 0 7 0ZM7 2C8.1 2 9 2.9 9 4V5H5V4C5 2.9 5.9 2 7 2ZM2 7H12V14H2V7ZM7 9C6.45 9 6 9.45 6 10C6 10.38 6.22 10.7 6.53 10.88L5.94 12.63C5.83 12.96 6.07 13.29 6.42 13.29H7.58C7.93 13.29 8.17 12.96 8.06 12.63L7.47 10.88C7.78 10.7 8 10.38 8 10C8 9.45 7.55 9 7 9Z"/></svg></div>
          <span className="text-xs font-bold text-blue-600">Privacy First. Always.</span>
        </div>
      </div>

      {/* Right side illustration - Image */}
      <div className="absolute right-[-10px] bottom-[20px] w-[220px] h-[220px] pointer-events-none z-10 flex items-center justify-center">
        <motion.img 
          src="/images/bento/sheild transparent.png" 
          alt="Security Shield"
          className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 pointer-events-none select-none"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
};

const BentoCreateWinCard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="w-full relative min-h-[300px] flex items-center justify-center"
    >
      <img 
        src="/images/bento/download cv bento.webp" 
        alt="Create and Download CV"
        className="w-full h-auto object-contain pointer-events-none select-none"
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
      />
    </motion.div>
  );
};

function BentoGridSection() {
  return (
    <section className="px-4 sm:px-6 pt-16 sm:pt-28 md:pt-40 pb-16 sm:pb-24 bg-[#f4f9ff] relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-blue-100/40 rounded-full blur-3xl opacity-70 pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[500px] bg-sky-100/40 rounded-full blur-3xl opacity-60 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto space-y-6">
        <BentoHeroCard />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <BentoStandOutCard />
          <BentoSecurityCard />
        </div>
        
        <BentoCreateWinCard />

        {/* CTA band */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 sm:mt-20 rounded-[2rem] px-6 sm:px-8 py-10 sm:py-16 text-center relative overflow-hidden shadow-2xl"
          style={{ background: "linear-gradient(145deg,#1e40af 0%,#2563eb 55%,#3b82f6 100%)" }}
          id="closing-cta"
        >
          <div className="absolute top-4 right-10 w-20 h-14 rounded-xl opacity-15 border border-white/20 bg-white/10 rotate-6 pointer-events-none" />
          <div className="absolute bottom-4 left-10 w-16 h-10 rounded-xl opacity-10 border border-white/15 bg-white/8 -rotate-3 pointer-events-none" />
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
            Build resumes with stronger signal and less waste.
          </h2>
          <p className="text-blue-100/90 text-base md:text-lg mb-10 max-w-[50ch] mx-auto font-medium">
            Import memory, confirm your profile, generate for a role, and refine where it matters.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/onboarding" id="closing-cta-btn"
              className="inline-flex items-center gap-2 rounded-2xl bg-white text-blue-700 font-bold text-lg px-8 py-4 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
              Open the workflow <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/templates" id="closing-templates-btn"
              className="hero-outline-button px-8 py-4 rounded-2xl font-bold text-lg border-2 border-blue-300 text-white hover:bg-blue-600 hover:border-blue-200 transition-all">
              View Templates
            </Link>
          </div>
        </motion.div>

        {/* Trust row */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-10 text-sm font-semibold text-slate-500">
          {["No credit card required","Free 14-day trial","Cancel anytime"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-500" />
              <span>{item}</span>
            </div>
          ))}
        </div>
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
        <BentoGridSection />
      </main>
    </div>
  );
}
