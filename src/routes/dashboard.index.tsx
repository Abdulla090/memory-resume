import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
  FileText,
  Sparkles,
  ArrowUp,
  ArrowRight,
  Paperclip,
  Briefcase as BriefcaseIcon,
  Code2,
  PenLine,
  GraduationCap,
  MessageSquare,
} from 'lucide-react';
import { memo, useMemo, useRef, useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { SAMPLE_MEMORIES } from '@/lib/sample-memories';
import { getTemplateDefaults } from '@/components/DesignPanel';
import type { ResumeData, SavedResume, TemplateId } from '@/lib/types';

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

const buildStarterResumeData = (templateLabel: string): ResumeData => ({
  name: 'New Resume',
  title: templateLabel,
  email: 'you@example.com',
  phone: '+1 555 000 0000',
  location: 'Your location',
  summary: 'Start here and refine this draft in the editor.',
  experience: [
    {
      title: 'Target Role',
      company: 'Company Name',
      duration: '2023 - Present',
      description: 'Replace this with your strongest work experience.',
      achievements: ['Add measurable impact here.'],
    },
  ],
  projects: [
    {
      name: 'Project Name',
      description: 'Add a project that shows your strongest skills.',
      tech: ['React', 'TypeScript'],
      impact: 'Summarize the result here.',
    },
  ],
  education: [{ degree: 'Degree', institution: 'Institution', year: '2024' }],
  skills: ['Skill one', 'Skill two', 'Skill three'],
  certifications: [],
});

const THANKS_KEYWORDS = [
  'thank you',
  'thank-you',
  'thanks',
  'thanks design',
  'thankyou',
  'thank-you card',
  'thank you card',
  'card',
  'invitation',
  'invite',
  'wedding',
  'graduation',
  'birthday',
  'celebration',
];

const isThanksPrompt = (text: string) => {
  const value = text.toLowerCase();
  return THANKS_KEYWORDS.some((keyword) => value.includes(keyword));
};

const TEMPLATE_BATCH = 8;

const TemplateCard = memo(function TemplateCard({
  template,
  isKu,
  onOpenEditor,
}: {
  template: { id: TemplateId; label: string; desc: string; category: Category; isNew?: boolean };
  isKu: boolean;
  onOpenEditor: (templateId: TemplateId, label: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpenEditor(template.id, template.label)}
      className="group relative flex flex-col items-center gap-3 rounded-[1.5rem] border border-neutral-200 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-400 hover:shadow-[0_12px_30px_-18px_rgba(0,0,0,0.18)]"
    >
      <div className="relative aspect-[1/1.4] w-full overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50 shadow-[0_4px_20px_rgba(0,0,0,0.03)]" />

      <div className="w-full px-2 text-left">
        <h3 className="flex items-center justify-between text-base font-bold text-black">
          {template.label}
          {template.isNew && (
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neutral-700">
              {isKu ? 'نوێ' : 'New'}
            </span>
          )}
        </h3>
        <p className="text-xs font-medium text-neutral-500">
          {template.category} • {template.desc}
        </p>
      </div>
    </button>
  );
});

function DashboardIndex() {
  const navigate = useNavigate();
  const language = useAppStore((state) => state.language);
  const isKu = language === 'ku';
  const addResume = useAppStore((state) => state.addResume);

  const [prompt, setPrompt] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [filter, setFilter] = useState<Category>('All');
  const [visibleTemplateCount, setVisibleTemplateCount] = useState(TEMPLATE_BATCH);
  const filteredTemplates = useMemo(() => {
    if (filter === 'All') return TEMPLATES;
    return TEMPLATES.filter((t) => t.category === filter);
  }, [filter]);
  const visibleTemplates = useMemo(
    () => filteredTemplates.slice(0, visibleTemplateCount),
    [filteredTemplates, visibleTemplateCount]
  );
  const hasMoreTemplates = visibleTemplateCount < filteredTemplates.length;
  const categories: Category[] = ['All', 'Minimal', 'Professional', 'Academic', 'Creative'];

  useEffect(() => {
    setVisibleTemplateCount(TEMPLATE_BATCH);
  }, [filter]);

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

    if (isThanksPrompt(text)) {
      navigate({ to: '/dashboard/thanks' });
      return;
    }

    const id = crypto.randomUUID();
    const saved: SavedResume = {
      id,
      title: text.slice(0, 60),
      jobTarget: text,
      template: 'minimal',
      design: getTemplateDefaults('minimal'),
      data: buildStarterResumeData(text),
      createdAt: Date.now(),
    };

    addResume(saved);
    navigate({ to: '/editor/$id', params: { id } });
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

  const handleOpenEditor = (templateId: TemplateId, label: string) => {
    const id = crypto.randomUUID();
    const saved: SavedResume = {
      id,
      title: label,
      jobTarget: label,
      template: templateId,
      design: getTemplateDefaults(templateId),
      data: buildStarterResumeData(label),
      createdAt: Date.now(),
    };

    addResume(saved);
    navigate({ to: '/editor/$id', params: { id } });
  };

  return (
    <div className="relative mx-auto w-full max-w-7xl space-y-8 sm:space-y-10 pb-10">
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center w-full pt-4 relative z-20"
      >
        <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white p-1.5 shadow-sm">
          <button
            className="flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-200 bg-black text-white shadow-sm scale-105"
          >
            <BriefcaseIcon className="h-4 w-4" />
            {isKu ? 'دروستکەری سیڤی' : 'CV Builder'}
          </button>
          <button
            onClick={() => navigate({ to: '/interview' })}
            className="flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-200 text-neutral-500 hover:text-black"
          >
            <MessageSquare className="h-4 w-4" />
            {isKu ? 'چاوپێکەوتن' : 'Interview Mode'}
          </button>
        </div>
      </motion.div>

      <div className="space-y-10 sm:space-y-12">
      <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 sm:p-10 lg:p-14 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-700 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-neutral-500" />
            {isKu ? 'سڵاو 👋 چی دروست بکەین؟' : 'Welcome back 👋'}
          </div>

          <motion.h1 className="mt-5 max-w-3xl text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black leading-[1.1]">
            {isKu ? 'سیڤی یان کارتی سوپاس؟' : <>CV or <span className="text-neutral-600">thank-you design</span>?</>}
          </motion.h1>
          <p className="mt-3 max-w-xl text-sm sm:text-base font-medium text-neutral-600">
            {isKu
              ? 'تەنها بنووسە چی دەتەوێت: سیڤی یان کارتی سوپاس/بانگەشت. پاشان بەخۆکار دەچیت بۆ پەڕەی دروستکردن.'
              : 'Type what you want to create: a CV or a thank-you/invitation card. You’ll go straight to the right builder.'}
          </p>

          <div className="mt-8 w-full max-w-2xl">
            <motion.div className="group rounded-[26px] border border-neutral-200 bg-white shadow-sm transition-all duration-200 focus-within:border-neutral-400 overflow-hidden">
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={
                  isKu
                    ? 'بۆ نموونە: «سیڤی بۆ ئەندازیاری سۆفتوێر» یان «کارتی سوپاس بۆ ئەوەی هاوڕێ و بنەماڵە»'
                    : 'e.g., "A CV for a software engineer" or "A thank-you card for graduation"'
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                className="w-full resize-none bg-transparent px-6 pt-6 pb-3 text-[15px] leading-relaxed text-black outline-none placeholder:text-neutral-400"
                style={{ minHeight: '140px' }}
              />

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-neutral-100 bg-white px-3 py-2.5 sm:px-4">
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
                    className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-[12px] font-bold text-neutral-600 transition-all hover:bg-neutral-50 hover:text-black"
                    title={isKu ? 'بارکردنی فایل' : 'Attach file'}
                  >
                    <Paperclip className="h-4 w-4" />
                    <span className="hidden sm:inline">{isKu ? 'بارکردن' : 'Attach'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleTrySample}
                    className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-[12px] font-bold text-neutral-600 transition-all hover:bg-neutral-50 hover:text-black"
                  >
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline">{isKu ? 'نموونە' : 'Try sample'}</span>
                  </button>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <span className="hidden sm:inline text-[11px] font-semibold text-neutral-400">
                    {isKu ? '⌘ + Enter' : 'Press ⌘ + Enter'}
                  </span>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={prompt.trim().length < 20}
                    className="flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-[13px] font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 disabled:pointer-events-none disabled:translate-y-0 disabled:bg-neutral-200 disabled:text-neutral-500 disabled:shadow-none"
                  >
                    {isKu ? 'بەردەوام' : 'Continue'}
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
                  className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-[12px] font-bold text-neutral-700 transition-all hover:border-neutral-400 hover:text-black hover:shadow-sm"
                >
                  <item.icon className="h-3.5 w-3.5 text-neutral-500" />
                  {item.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleOpenEditor('minimal', isKu ? 'سیڤیی نوێ' : 'New Resume')}
                className="flex items-center gap-1 rounded-full px-3.5 py-2 text-[12px] font-bold text-neutral-500 transition-colors hover:text-black"
              >
                {isKu ? 'سەرلەنوێ دەستپێبکە' : 'Start blank resume'}
                <ArrowRight className={`h-3 w-3 ${isKu ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </section>

      </div>
      </div>
  );
}
