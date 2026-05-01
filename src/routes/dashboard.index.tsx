import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { Plus, Upload, BrainCircuit, FileText, CheckCircle2, LayoutTemplate, PenTool, Briefcase, BarChart2, Sun, ArrowRight, MoreVertical, Settings, Wand2, Clock } from 'lucide-react';
import { LeftCardSVG, CenterCardSVG } from './index';
import { useAppStore } from '@/lib/store';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/dashboard/')({
  component: DashboardIndex,
});

function DashboardIndex() {
  const navigate = useNavigate();
  const language = useAppStore((state) => state.language);
  const isKu = language === "ku";
  const resumes = useAppStore((state) => state.resumes);
  const recentCVs = resumes.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1
      }
    },
  };

  return (
    <motion.div 
      className="max-w-7xl mx-auto space-y-4 sm:space-y-6 pb-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      
      {/* Top Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        
        {/* Hero Banner */}
        <div className="lg:col-span-2 rounded-[2rem] bg-gradient-to-br from-[#e6f2ff] to-[#f0f7ff] p-6 sm:p-10 relative overflow-hidden border border-white shadow-sm flex flex-col justify-center min-h-[280px] sm:min-h-[300px]">
          {/* Background Decorations */}
          <div className={`absolute top-10 w-40 h-20 bg-white/40 blur-2xl rounded-full pointer-events-none ${isKu ? 'left-10' : 'right-10'}`} />
          <div className={`absolute bottom-[-30%] w-[300px] h-[200px] bg-blue-200/20 blur-3xl rounded-full pointer-events-none ${isKu ? 'left-[15%]' : 'right-[15%]'}`} />
          
          {/* Two Sleek Resume Mockups */}
          <div dir="ltr" className={`absolute top-1/2 -translate-y-1/2 w-[220px] sm:w-[280px] h-[260px] sm:h-[320px] pointer-events-none select-none hidden sm:block ${isKu ? 'left-6 lg:left-12' : 'right-6 lg:right-12'}`}>
            
            {/* Back Resume — rotated right, shifted up */}
            <div 
              className={`absolute top-0 w-[180px] origin-center shadow-[0_20px_40px_rgba(0,0,0,0.15)] rounded-2xl ${isKu ? 'left-0' : 'right-0'}`}
              style={{ transform: `rotate(${isKu ? '-8deg' : '8deg'}) translateX(${isKu ? '-10px' : '10px'}) translateY(-10px)` }}
            >
              <LeftCardSVG />
            </div>

            {/* Front Resume — rotated left, shifted down & over */}
            <div 
              className={`absolute bottom-0 w-[190px] origin-center z-10 shadow-[0_25px_35px_rgba(37,99,235,0.15)] rounded-lg ${isKu ? 'right-0' : 'left-0'}`}
              style={{ transform: `rotate(${isKu ? '6deg' : '-6deg'}) translateX(${isKu ? '10px' : '-10px'}) translateY(5px)` }}
            >
              <CenterCardSVG />
            </div>

          </div>

          <div className="relative z-10 max-w-[400px]">
            <div className="inline-block text-sm font-bold text-slate-600 mb-4 bg-white/60 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm">
              {isKu ? "سڵاو! 👋" : "Hello! 👋"}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-3 sm:mb-4">
              {isKu ? (
                <>با زیرەکی دەستکرد<br/>سیڤییەکی نایابت بۆ دروست بکات</>
              ) : (
                <>Let AI build your<br/>perfect CV</>
              )}
            </h1>
            <p className="text-slate-500 font-medium mb-8 text-sm md:text-base max-w-[280px]">
              {isKu ? "زیرەک. تایبەت. پشت بەستوو بە یادگە. دروستکراوە بۆ دەرفەتی داهاتووت." : "Smart. Personalized. Memory-based. Built for your next opportunity."}
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link to="/onboarding" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5">
                <Plus className="w-5 h-5" /> {isKu ? "دروستکردنی سیڤیی نوێ" : "Create New CV"}
              </Link>
              <button className="flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-2xl font-bold shadow-sm border border-blue-100 hover:shadow-md transition-all">
                <Upload className="w-5 h-5" /> {isKu ? "بارکردنی سیڤیی هەبوو" : "Upload Existing"}
              </button>
            </div>
          </div>
        </div>

        {/* AI Memory Widget */}
        <div className="rounded-[2rem] bg-white border border-slate-100 p-8 shadow-sm flex flex-col justify-between min-h-[300px]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">{isKu ? "یادگەی زیرەکی دەستکرد" : "AI Memory"}</h3>
            </div>
            <p className="text-slate-500 text-sm font-medium mb-6 leading-relaxed">
              {isKu ? "ئەزموون، شارەزایی و ئارەزووەکانت لە یاد دەهێڵمەوە بۆ ئەوەی هەر سیڤییەک باشتر بکەم." : "I remember your experience, skills, and preferences to make every CV better."}
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: isKu ? 'ئەزموونەکان' : 'Experiences', count: 24, icon: FileText },
                { label: isKu ? 'شارەزاییەکان' : 'Skills', count: 18, icon: PenTool },
                { label: isKu ? 'دەستکەوتەکان' : 'Achievements', count: 15, icon: CheckCircle2 },
                { label: isKu ? 'ئارەزووەکان' : 'Preferences', count: 12, icon: Settings },
              ].map((item) => (
                <div key={item.label} className="bg-slate-50 p-3 rounded-2xl flex gap-3 items-center border border-slate-100/50">
                   <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-500 shadow-sm shrink-0">
                     <item.icon className="w-4 h-4" />
                   </div>
                   <div>
                     <div className="text-[10px] font-bold text-slate-900 leading-none">{item.label}</div>
                     <div className="text-[10px] font-medium text-slate-500 mt-1">{item.count} {isKu ? "پاشەکەوتکراوە" : "saved"}</div>
                   </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex justify-between items-end">
            <div className="text-[10px] text-slate-400 font-semibold leading-tight">
              {isKu ? "دوایین نوێکردنەوەی یادگە" : "Memory last updated"}<br/><span className="text-slate-600">{isKu ? "ئەمڕۆ، ١٠:٣٠ بەیانی" : "Today, 10:30 AM"}</span>
            </div>
            <button className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">
              {isKu ? "بەڕێوەبردنی یادگە" : "Manage Memory"} <ArrowRight className={`w-3 h-3 ${isKu ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

      </div>

      {/* Middle Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        
        {/* My CVs */}
        <div className="rounded-[2rem] bg-white border border-slate-100 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                 <FileText className="w-4 h-4" />
               </div>
               <h3 className="font-bold text-slate-900">{isKu ? "سیڤییەکانم" : "My CVs"}</h3>
            </div>
            <Link to="/dashboard/my-cvs" className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">{isKu ? "هەمووی ببینە" : "View all"} <ArrowRight className={`w-3 h-3 ${isKu ? 'rotate-180' : ''}`} /></Link>
          </div>
          
          <div className="space-y-3">
            {recentCVs.length === 0 ? (
              <div className="text-center py-6">
                <FileText className="w-8 h-8 text-slate-200 mx-auto mb-3" />
                <p className="text-xs text-slate-400 font-medium">{isKu ? "هێشتا سیڤییەک نەدروستکراوە" : "No CVs yet"}</p>
                <Link to="/onboarding" className="inline-flex items-center gap-1 mt-3 text-xs font-bold text-blue-600 hover:underline">
                  <Plus className="w-3 h-3" /> {isKu ? "دروستکردنی یەکەم سیڤی" : "Create your first CV"}
                </Link>
              </div>
            ) : recentCVs.map((cv) => (
              <button
                key={cv.id}
                onClick={() => navigate({ to: '/editor/$id', params: { id: cv.id } })}
                className="w-full flex items-center justify-between p-3 -mx-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group border border-transparent hover:border-slate-100 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:shadow-sm group-hover:text-blue-500 transition-all">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 truncate max-w-[150px]">{cv.title}</div>
                    <div className="text-[10px] text-slate-500 font-medium mt-0.5 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {new Date(cv.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                   <div className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-md capitalize">{cv.template}</div>
                   <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* AI Optimize */}
        <div className="rounded-[2rem] bg-white border border-slate-100 p-8 shadow-sm relative overflow-hidden flex flex-col items-center justify-center text-center">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-blue-600" />
          <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
            <Wand2 className="w-5 h-5 text-blue-500" /> {isKu ? "باشترکردنی زیرەکی دەستکرد" : "AI Optimize"}
          </h3>
          <p className="text-xs font-medium text-slate-500 mb-6">{isKu ? "سیڤییەکەت بە پێشنیاری زیرەکی دەستکرد باشتر بکە." : "Improve your CV with AI suggestions."}</p>
          
          <div className="flex items-center justify-center gap-8 w-full mb-8">
             <div className="relative w-24 h-24 flex items-center justify-center">
               <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                 <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="8" fill="none" />
                 <circle cx="50" cy="50" r="40" stroke="#3b82f6" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset="20.096" strokeLinecap="round" />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-3xl font-black text-slate-900 leading-none">92</span>
                 <span className="text-[10px] font-bold text-slate-500 mt-1">Score</span>
               </div>
             </div>
             
             <div className="space-y-3 text-left">
               {isKu ? ['ناوەڕۆک', 'پێکهاتە', 'وشە سەرەکییەکان', 'کاریگەری'].map((item) => (
                 <div key={item} className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                   <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {item}
                 </div>
               )) : ['Content', 'Structure', 'Keywords', 'Impact'].map((item) => (
                 <div key={item} className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                   <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {item}
                 </div>
               ))}
             </div>
          </div>
          
          <button className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all text-sm flex justify-center items-center gap-2 hover:-translate-y-0.5">
            {isKu ? "ئێستا باشتر بکە" : "Optimize Now"} <ArrowRight className={`w-4 h-4 ${isKu ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Templates */}
        <div className="rounded-[2rem] bg-white border border-slate-100 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                 <LayoutTemplate className="w-4 h-4" />
               </div>
               <h3 className="font-bold text-slate-900">{isKu ? "تیمپڵەیتەکان" : "Templates"}</h3>
            </div>
            <Link to="/templates" className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">{isKu ? "هەمووی ببینە" : "Browse all"} <ArrowRight className={`w-3 h-3 ${isKu ? 'rotate-180' : ''}`} /></Link>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
             {['Modern', 'Professional', 'Creative'].map((name) => (
                <div key={name} className="flex flex-col items-center gap-3">
                   <div className="w-full aspect-[1/1.414] bg-slate-100 rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group">
                      <div className="w-full h-full bg-white p-2">
                         <div className="w-1/3 h-1.5 bg-slate-300 rounded mb-2"></div>
                         <div className="w-1/4 h-1 bg-slate-200 rounded mb-1"></div>
                         <div className="w-full h-1 bg-slate-100 rounded mb-0.5"></div>
                         <div className="w-5/6 h-1 bg-slate-100 rounded mb-3"></div>
                         <div className="flex gap-2">
                            <div className="w-1/3 h-10 bg-slate-50 rounded"></div>
                            <div className="w-2/3 h-10 bg-slate-50 rounded"></div>
                         </div>
                      </div>
                   </div>
                   <span className="text-[10px] font-bold text-slate-600">{name}</span>
                </div>
             ))}
          </div>
        </div>

      </motion.div>

      {/* Bottom Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        
        {/* AI Writer */}
        <div className="rounded-[2rem] bg-white border border-slate-100 p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
             <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
               <PenTool className="w-4 h-4" />
             </div>
             <h3 className="font-bold text-slate-900">{isKu ? "نووسەری زیرەکی دەستکرد" : "AI Writer"}</h3>
          </div>
          <p className="text-xs font-medium text-slate-500 mb-6 pl-10">{isKu ? "ناوەڕۆکی تایبەت بۆ سیڤییەکەت دروست بکە" : "Generate tailored content for your CV"}</p>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
             {isKu ? ['پوختەی پیشەیی', 'ئەزموونی کار', 'دەستکەوتە سەرەکییەکان', 'بەشی شارەزایی'].map((item) => (
                <button key={item} className="px-3 py-3 bg-blue-50 hover:bg-blue-100 text-blue-600 text-[10px] font-bold rounded-xl transition-colors border border-blue-100/50 text-center">
                  {item}
                </button>
             )) : ['Professional Summary', 'Work Experience', 'Key Achievements', 'Skills Section'].map((item) => (
                <button key={item} className="px-3 py-3 bg-blue-50 hover:bg-blue-100 text-blue-600 text-[10px] font-bold rounded-xl transition-colors border border-blue-100/50 text-center">
                  {item}
                </button>
             ))}
          </div>
          <button className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all text-sm flex justify-center items-center gap-2 hover:-translate-y-0.5">
            <Wand2 className="w-4 h-4" /> {isKu ? "دروستکردن بە زیرەکی دەستکرد" : "Generate with AI"}
          </button>
        </div>

        {/* Job Tracker */}
        <div className="rounded-[2rem] bg-white border border-slate-100 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                 <Briefcase className="w-4 h-4" />
               </div>
               <h3 className="font-bold text-slate-900">{isKu ? "چاودێری کار" : "Job Tracker"}</h3>
            </div>
            <Link to="/dashboard/job-tracker" className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">{isKu ? "هەمووی ببینە" : "View all"} <ArrowRight className={`w-3 h-3 ${isKu ? 'rotate-180' : ''}`} /></Link>
          </div>
          
          <div className="space-y-4">
            {isKu ? [
              { role: 'دیزاینەری بەرهەم', company: 'Google', status: 'چاوپێکەوتن', date: '٢٢ ئایار', color: 'text-blue-600 bg-blue-50 border-blue-200' },
              { role: 'دیزاینەری UI/UX', company: 'Microsoft', status: 'پێشکەشکراوە', date: '١٨ ئایار', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
              { role: 'پێشەنگی دیزاین', company: 'Netflix', status: 'پاڵێوراو', date: '١٥ ئایار', color: 'text-amber-600 bg-amber-50 border-amber-200' },
            ].map((job, i) => (
              <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                 <div>
                   <div className="text-sm font-bold text-slate-900">{job.role}</div>
                   <div className="text-[10px] font-medium text-slate-500 mt-0.5">{job.company}</div>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${job.color}`}>
                     {job.status}
                   </div>
                   <div className={`text-[10px] font-bold text-slate-400 w-10 ${isKu ? 'text-left' : 'text-right'}`}>{job.date}</div>
                 </div>
              </div>
            )) : [
              { role: 'Product Designer', company: 'Google', status: 'Interview', date: 'May 22', color: 'text-blue-600 bg-blue-50 border-blue-200' },
              { role: 'UI/UX Designer', company: 'Microsoft', status: 'Applied', date: 'May 18', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
              { role: 'Design Lead', company: 'Netflix', status: 'Shortlisted', date: 'May 15', color: 'text-amber-600 bg-amber-50 border-amber-200' },
            ].map((job, i) => (
              <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                 <div>
                   <div className="text-sm font-bold text-slate-900">{job.role}</div>
                   <div className="text-[10px] font-medium text-slate-500 mt-0.5">{job.company}</div>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${job.color}`}>
                     {job.status}
                   </div>
                   <div className={`text-[10px] font-bold text-slate-400 w-10 ${isKu ? 'text-left' : 'text-right'}`}>{job.date}</div>
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics */}
        <div className="rounded-[2rem] bg-white border border-slate-100 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                 <BarChart2 className="w-4 h-4" />
               </div>
               <h3 className="font-bold text-slate-900">{isKu ? "شیکاری" : "Analytics"}</h3>
            </div>
            <Link to="/dashboard/analytics" className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">{isKu ? "هەمووی ببینە" : "View all"} <ArrowRight className={`w-3 h-3 ${isKu ? 'rotate-180' : ''}`} /></Link>
          </div>
          
          <div className="flex gap-4 h-[140px]">
             {/* Views Chart */}
             <div className="flex-1 border border-slate-100 rounded-2xl p-4 flex flex-col justify-between">
                <div className="text-[10px] font-bold text-slate-500">{isKu ? "بینینی پرۆفایل" : "Profile Views"}</div>
                <div className="flex items-end gap-2 mt-1">
                  <div className="text-3xl font-black text-slate-900 leading-none">247</div>
                  <div className="text-[10px] font-bold text-emerald-500 mb-1">↑ 18%</div>
                </div>
                {/* Fake sparkline */}
                <svg className="w-full h-10 mt-auto" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path d="M0 25 L20 20 L40 28 L60 15 L80 18 L100 5" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M0 25 L20 20 L40 28 L60 15 L80 18 L100 5 V30 H0 Z" fill="url(#sparkGrad)" />
                  <defs>
                    <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
             </div>
             
             {/* Match Score */}
             <div className="w-2/5 border border-slate-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                <div className="text-[10px] font-bold text-slate-500 mb-3">{isKu ? "ڕێژەی گونجان" : "Match Score"}</div>
                <div className="relative w-16 h-16 flex items-center justify-center">
                   <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                     <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="10" fill="none" />
                     <circle cx="50" cy="50" r="40" stroke="#3b82f6" strokeWidth="10" fill="none" strokeDasharray="251.2" strokeDashoffset="32.656" strokeLinecap="round" />
                   </svg>
                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <span className="text-sm font-black text-slate-900 leading-none">87%</span>
                   </div>
                 </div>
                 <span className="text-[10px] font-bold text-emerald-500 mt-2">{isKu ? "نایاب" : "Excellent"}</span>
             </div>
          </div>
        </div>

      </motion.div>

      {/* Tip of the day */}
      <motion.div variants={itemVariants} className="rounded-[2rem] bg-gradient-to-r from-blue-50 to-[#e0f2fe] border border-blue-100 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
               <Sun className="w-6 h-6 text-amber-400" />
            </div>
            <div>
               <h4 className="text-sm font-bold text-slate-900">{isKu ? "ئامۆژگاری ئەمڕۆ" : "Tip of the day"}</h4>
               <p className="text-xs font-medium text-slate-600 mt-1">{isKu ? "دەستکەوتە ژمارەییەکان زیاد بکە بۆ ئەزموونەکەت بۆ ئەوەی سەرنجی دامەزرێنەران ڕابکێشیت." : "Add quantified achievements to your experience to stand out to recruiters."}</p>
            </div>
         </div>
         <button className="bg-white text-blue-600 text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm hover:shadow border border-blue-100 transition-all flex items-center gap-1 shrink-0">
            {isKu ? "نموونە ببینە" : "See Example"} <ArrowRight className={`w-3 h-3 ${isKu ? 'rotate-180' : ''}`} />
         </button>
      </motion.div>
      
    </motion.div>
  );
}
