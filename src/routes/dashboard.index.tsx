import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import {
  FileText,
  ArrowRight,
  Sparkles,
  ArrowUp,
  Paperclip,
  Briefcase as BriefcaseIcon,
  Code2,
  PenLine,
  GraduationCap,
  MessageSquare,
  Type,
  Mic,
} from 'lucide-react';
import { useMemo, useRef, useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { SAMPLE_MEMORIES } from '@/lib/sample-memories';
import { ResumePreview } from '@/components/resume/templates';
import type { ResumeData, TemplateId } from '@/lib/types';

export const Route = createFileRoute('/dashboard/')({
  component: DashboardIndex,
});

// ── Templates (mirrors /templates route) ────────────────────────────────
type Category = 'All' | 'Minimal' | 'Professional' | 'Academic' | 'Creative';

const TEMPLATES: {
  id: TemplateId;
  label: string;
  desc: string;
  category: Category;
  isNew?: boolean;
}[] = [
  { id: 'minimal', label: 'Minimal', desc: 'Clean hierarchy', category: 'Minimal' },
  { id: 'slate', label: 'Slate', desc: 'Swiss precision', category: 'Minimal' },
  { id: 'avant', label: 'Avant', desc: 'Brutalist lines', category: 'Minimal' },
  { id: 'vanguard', label: 'Vanguard', desc: 'Massive typography', category: 'Minimal' },
  { id: 'executive', label: 'Executive', desc: 'Dark sidebar', category: 'Professional' },
  { id: 'apex', label: 'Apex', desc: 'Bold top bar', category: 'Professional' },
  { id: 'monolith', label: 'Monolith', desc: 'Highly structured', category: 'Professional' },
  { id: 'metric', label: 'Metric', desc: 'Data-driven', category: 'Professional' },
  { id: 'carbon', label: 'Carbon', desc: 'Charcoal sidebar', category: 'Professional', isNew: true },
  { id: 'atlas', label: 'Atlas', desc: 'Corporate authority', category: 'Professional', isNew: true },
  { id: 'new-sleek', label: 'NEW Sleek A4', desc: 'Photo-led precision', category: 'Professional', isNew: true },
  { id: 'new-professional', label: 'NEW Professional A4', desc: 'Executive sidebar', category: 'Professional', isNew: true },
  { id: 'new-academic', label: 'NEW Academic A4', desc: 'Research CV layout', category: 'Academic', isNew: true },
  { id: 'ref-torres', label: 'NEW Torres Exact', desc: 'Blue photo sidebar', category: 'Professional', isNew: true },
  { id: 'ref-silva', label: 'NEW Silva Exact', desc: 'Brown account split', category: 'Professional', isNew: true },
  { id: 'ref-schumacher', label: 'NEW Schumacher Exact', desc: 'Orange skill bars', category: 'Creative', isNew: true },
  { id: 'ref-palmerston', label: 'NEW Palmerston Exact', desc: 'Slate graphic designer', category: 'Professional', isNew: true },
  { id: 'ref-alvarado', label: 'NEW Alvarado Exact', desc: 'Two-tone classic profile', category: 'Professional', isNew: true },
  { id: 'new-alvarado', label: 'NEW Lorna Pixel', desc: 'Pixel perfect match', category: 'Professional', isNew: true },
  { id: 'ref-sanchez', label: 'NEW Sanchez Exact', desc: 'Timeline manager', category: 'Professional', isNew: true },
  { id: 'mercer', label: 'NEW Mercer Exact', desc: 'Navy structured dual-column', category: 'Professional', isNew: true },
  { id: 'gallego', label: 'NEW Gallego Exact', desc: 'Teal presentation designer', category: 'Professional', isNew: true },
  { id: 'leroy', label: 'NEW Leroy Exact', desc: 'French real estate profile', category: 'Professional', isNew: true },
  { id: 'dubois', label: 'NEW Dubois Exact', desc: 'French project manager', category: 'Professional', isNew: true },
  { id: 'noir', label: 'Noir', desc: 'All-black luxury', category: 'Creative' },
  { id: 'cipher', label: 'Cipher', desc: 'Dark tech aesthetic', category: 'Creative' },
  { id: 'pinnacle', label: 'Pinnacle', desc: 'Dark layered layout', category: 'Creative' },
  { id: 'nexus', label: 'Nexus', desc: 'Timeline SVG nodes', category: 'Creative' },
  { id: 'orbit', label: 'Orbit', desc: 'Interactive elements', category: 'Creative' },
  { id: 'prism', label: 'Prism', desc: 'Geometric shapes', category: 'Creative' },
  { id: 'forge', label: 'Forge', desc: 'Industrial brutalist', category: 'Minimal', isNew: true },
  { id: 'zenith', label: 'Zenith', desc: 'Gold luxury premium', category: 'Professional', isNew: true },
  { id: 'vector', label: 'Vector', desc: 'Dark mode tech', category: 'Creative', isNew: true },
];

const MINI_SAMPLE: ResumeData = {
  name: 'Jane Doe',
  title: 'Product Designer',
  email: 'jane@example.com',
  phone: '+1 234 567 890',
  photoUrl: 'https://picsum.photos/seed/maya-okafor-headshot/240/240',
  location: 'New York, NY',
  summary: 'Creative designer focusing on UI/UX and visual storytelling.',
  experience: [
    {
      title: 'Lead Designer',
      company: 'Creative Studio',
      duration: '2020 — Present',
      description: 'Leading design team for major client projects.',
      achievements: ['Delivered award-winning campaigns.'],
    },
    {
      title: 'UX Designer',
      company: 'Tech Startup',
      duration: '2018 — 2020',
      description: 'Designed core application interfaces.',
      achievements: [],
    },
  ],
  projects: [],
  education: [{ degree: 'BFA Design', institution: 'Design School', year: '2018' }],
  skills: ['Figma', 'UI/UX', 'Prototyping'],
  certifications: [],
};

function Thumbnail({ id }: { id: TemplateId }) {
  return (
    <div className="absolute inset-0 bg-slate-100 overflow-hidden pointer-events-none flex items-center justify-center">
      <svg viewBox="0 0 794 1123" className="w-full h-full">
        <foreignObject width="794" height="1123">
          <div className="w-[794px] h-[1123px] bg-white text-left">
            <ResumePreview data={MINI_SAMPLE} template={id} />
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}

function DashboardIndex() {
  const navigate = useNavigate();
  const language = useAppStore((state) => state.language);
  const isKu = language === 'ku';

  const [prompt, setPrompt] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [filter, setFilter] = useState<Category>('All');
  const filteredTemplates = useMemo(() => {
    if (filter === 'All') return TEMPLATES;
    return TEMPLATES.filter((t) => t.category === filter);
  }, [filter]);
  const categories: Category[] = ['All', 'Minimal', 'Professional', 'Academic', 'Creative'];

  const handleSubmit = () => {
    const text = prompt.trim();
    if (text.length < 20) {
      toast.error(
        isKu
          ? 'کەمێک زیاتر بنووسە دەربارەی خۆت (٢٠+ پیت).'
          : 'Add a bit more detail (20+ chars).'
      );
      return;
    }
    navigate({
      to: '/onboarding',
      search: { prompt: text },
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPrompt((p) => p + (p ? '\n\n' : '') + `[${file.name}]\n` + (ev.target?.result as string));
      toast.success(isKu ? `بارکرا ${file.name}` : `Loaded ${file.name}`);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const quickPrompts = isKu
    ? [
        { icon: BriefcaseIcon, label: 'بەڕێوەبەری بەرهەم' },
        { icon: Code2, label: 'ئەندازیاری نەرمەکاڵا' },
        { icon: PenLine, label: 'دیزاینەری UX' },
        { icon: GraduationCap, label: 'سیڤی ئەکادیمی' },
      ]
    : [
        { icon: BriefcaseIcon, label: 'Product Manager CV' },
        { icon: Code2, label: 'Software Engineer CV' },
        { icon: PenLine, label: 'UX Designer CV' },
        { icon: GraduationCap, label: 'Academic CV' },
      ];

  const handleQuickPrompt = (label: string) => {
    const seed = isKu
      ? `من دەمەوێت سیڤییەک دروست بکەم بۆ ڕۆڵی «${label}». ئەمەش کورتەیەک دەربارەی ئەزموونەکەم: `
      : `I want to build a resume for the role of "${label}". Here is a short summary of my background: `;
    setPrompt(seed);
    textareaRef.current?.focus();
  };

  const handleTrySample = () => {
    const sample = SAMPLE_MEMORIES[0];
    if (!sample) return;
    setPrompt(sample.text);
    toast.success(isKu ? 'نموونە بارکرا' : 'Sample loaded');
    textareaRef.current?.focus();
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15, mass: 1 },
    },
  };

  return (
    <div className="relative mx-auto w-full max-w-7xl space-y-8 sm:space-y-10 pb-10">
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center w-full pt-4 relative z-20"
      >
        <div className="inline-flex items-center rounded-full border border-border bg-card/60 p-1.5 backdrop-blur-xl shadow-lg shadow-black/5">
          <button
            className="flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-500 bg-foreground text-background shadow-md scale-105"
          >
            <BriefcaseIcon className="h-4 w-4" />
            {isKu ? 'دروستکەری سیڤی' : 'CV Builder'}
          </button>
          <button
            onClick={() => navigate({ to: '/interview' })}
            className="flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-500 text-muted-foreground hover:text-foreground"
          >
            <MessageSquare className="h-4 w-4" />
            {isKu ? 'چاوپێکەوتن' : 'Interview Mode'}
          </button>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-10 sm:space-y-12"
      >
      <motion.section
        variants={itemVariants}
        className="relative overflow-hidden rounded-[2.25rem] border border-white/70 bg-gradient-to-b from-[#eaf5ff] via-[#f3f9ff] to-white p-6 sm:p-10 lg:p-14 shadow-[0_20px_60px_-30px_rgba(59,130,246,0.35)] dark:border-border dark:bg-card dark:from-card dark:to-card"
      >
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(186,230,253,0.55),transparent_60%)]" />
          <div className="absolute top-[-80px] left-[-60px] h-[260px] w-[520px] opacity-80">
            <div className="absolute top-24 left-6 h-32 w-32 rounded-full bg-white blur-[6px]" />
            <div className="absolute top-2 left-28 h-40 w-40 rounded-full bg-white blur-[6px]" />
            <div className="absolute top-20 left-60 h-28 w-28 rounded-full bg-white blur-[6px]" />
            <div className="absolute top-32 left-0 h-20 w-[420px] rounded-full bg-white blur-[4px]" />
          </div>
          <div className="absolute top-[-60px] right-[-40px] h-[220px] w-[460px] opacity-70">
            <div className="absolute top-16 right-6 h-28 w-28 rounded-full bg-white blur-[6px]" />
            <div className="absolute top-[-10px] right-24 h-40 w-40 rounded-full bg-white blur-[6px]" />
            <div className="absolute top-24 right-0 h-16 w-[380px] rounded-full bg-white blur-[4px]" />
          </div>
          <div className="absolute bottom-[-80px] right-[20%] h-[160px] w-[360px] opacity-60">
            <div className="absolute top-4 left-10 h-20 w-20 rounded-full bg-white blur-[5px]" />
            <div className="absolute top-0 left-24 h-24 w-24 rounded-full bg-white blur-[5px]" />
            <div className="absolute top-10 left-0 h-14 w-[300px] rounded-full bg-white blur-[4px]" />
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-700 shadow-sm backdrop-blur-sm ring-1 ring-sky-100">
            <Sparkles className="h-3.5 w-3.5 text-sky-500" />
            {isKu ? 'سڵاو 👋 ئامادەم یارمەتیت بدەم' : 'Welcome back 👋'}
          </div>

          <motion.h1 className="mt-5 max-w-3xl text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-foreground leading-[1.1]">
            {isKu ? (
              <>
                چ جۆرە سیڤییەک <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">دروست بکەین؟</span>
              </>
            ) : (
              <>
                What kind of resume <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">shall we craft?</span>
              </>
            )}
          </motion.h1>
          <p className="mt-3 max-w-xl text-sm sm:text-base font-medium text-slate-500">
            {isKu
              ? 'سیڤییەکەت، پوختەی لینکدین، یان کورتەیەک دەربارەی خۆت دابنێ — من سیڤییەکی پیشەیی بۆ دروست دەکەم لە چەند چرکەیەکدا.'
              : 'Paste your resume, LinkedIn summary, or a quick intro about yourself — I’ll turn it into a polished CV in seconds.'}
          </p>

          <div className="mt-8 w-full max-w-2xl">
            <motion.div className="group rounded-[26px] border border-slate-200/70 bg-white/80 dark:border-border dark:bg-background shadow-[0_10px_40px_-18px_rgba(15,23,42,0.18)] ring-4 ring-transparent backdrop-blur-xl transition-all duration-300 focus-within:border-sky-200 focus-within:bg-white focus-within:ring-sky-400/10 overflow-hidden">
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={
                  isKu
                    ? 'بۆ نموونە: «ئەندازیاری سینێری نەرمەکاڵام بە ٥ ساڵ ئەزموون لە React و Node، سەرپەرشتیاری تیمێکی ٤ کەسی…»'
                    : 'e.g., "Senior software engineer with 5 years of experience, led a team of 4, redesigned the onboarding flow…"'
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                className="w-full resize-none bg-transparent px-6 pt-6 pb-3 text-[15px] leading-relaxed text-slate-800 dark:text-foreground outline-none placeholder:text-slate-400"
                style={{ minHeight: '140px' }}
              />

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/60 dark:bg-muted/20 dark:border-border px-3 py-2.5 sm:px-4">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".txt,.md,.pdf,.docx,.doc,.rtf"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-[12px] font-bold text-slate-600 transition-all hover:bg-white hover:text-sky-600 hover:shadow-sm"
                    title={isKu ? 'بارکردنی فایل' : 'Attach file'}
                  >
                    <Paperclip className="h-4 w-4" />
                    <span className="hidden sm:inline">{isKu ? 'بارکردن' : 'Attach'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleTrySample}
                    className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-[12px] font-bold text-slate-600 transition-all hover:bg-white hover:text-sky-600 hover:shadow-sm"
                  >
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline">{isKu ? 'نموونە' : 'Try sample'}</span>
                  </button>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <span className="hidden sm:inline text-[11px] font-semibold text-slate-400">
                    {isKu ? '⌘ + Enter' : 'Press ⌘ + Enter'}
                  </span>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={prompt.trim().length < 20}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 px-4 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-sky-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-sky-500/30 disabled:pointer-events-none disabled:translate-y-0 disabled:bg-slate-200 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 disabled:shadow-none"
                  >
                    {isKu ? 'دروستکردنی سیڤی' : 'Build my CV'}
                    <ArrowUp className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {quickPrompts.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleQuickPrompt(item.label)}
                  className="flex items-center gap-2 rounded-full border border-sky-100 bg-white/80 px-3.5 py-2 text-[12px] font-bold text-slate-700 backdrop-blur-sm transition-all hover:border-sky-200 hover:bg-white hover:text-sky-700 hover:shadow-sm"
                >
                  <item.icon className="h-3.5 w-3.5 text-sky-500" />
                  {item.label}
                </button>
              ))}
              <Link
                to="/onboarding"
                className="flex items-center gap-1 rounded-full px-3.5 py-2 text-[12px] font-bold text-slate-500 transition-colors hover:text-sky-700"
              >
                {isKu ? 'یاخود لە سەرەتاوە دەستپێبکە' : 'Or start from scratch'}
                <ArrowRight className={`h-3 w-3 ${isKu ? 'rotate-180' : ''}`} />
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section variants={itemVariants} className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-foreground">
              {isKu ? 'تیمپڵەیتەکان' : 'Templates'}
            </h2>
            <p className="mt-1 text-sm font-medium text-slate-500">
              {isKu
                ? 'تیمپڵەیتێک هەڵبژێرە و ئەزموونەکانت بگوێزەوە بۆ سیڤییەکی سەرنجڕاکێش.'
                : 'Pick a template to instantly reformat your experience into a winning resume.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = filter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={`rounded-full border px-4 py-1.5 text-[12px] font-bold transition-all ${
                    isActive
                      ? 'border-sky-200 bg-sky-50 text-sky-700 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:text-sky-700'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTemplates.map((t) => (
            <Link
              key={t.id}
              to="/onboarding"
              className="group relative flex flex-col items-center gap-3 rounded-[1.5rem] border border-slate-200 bg-white p-4 transition-all duration-500 hover:-translate-y-1 hover:border-sky-300 hover:bg-sky-50/30 hover:shadow-[0_20px_40px_-12px_rgba(14,165,233,0.18)] dark:bg-card dark:border-border dark:hover:border-primary/50"
            >
              <div className="relative aspect-[1/1.4] w-full overflow-hidden rounded-xl border border-slate-100 bg-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <Thumbnail id={t.id} />
                <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-b from-transparent via-transparent to-black/60 pb-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="translate-y-4 rounded-full bg-sky-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all duration-300 group-hover:translate-y-0">
                    {isKu ? 'بەکارهێنان' : 'Use Template'}
                  </span>
                </div>
              </div>

              <div className="w-full px-2 text-left">
                <h3 className="flex items-center justify-between text-base font-bold text-slate-900 dark:text-foreground">
                  {t.label}
                  {t.isNew && (
                    <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sky-700">
                      {isKu ? 'نوێ' : 'New'}
                    </span>
                  )}
                </h3>
                <p className="text-xs font-medium text-slate-500">
                  {t.category} • {t.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </motion.section>
      </motion.div>
    </div>
  );
}
