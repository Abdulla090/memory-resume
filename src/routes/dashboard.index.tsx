import { createFileRoute, Link } from '@tanstack/react-router';
import { Plus, Upload, BrainCircuit, FileText, CheckCircle2, LayoutTemplate, PenTool, Briefcase, BarChart2, Sun, ArrowRight, MoreVertical, Settings, Wand2 } from 'lucide-react';
import { LeftCardSVG, CenterCardSVG } from './index';

export const Route = createFileRoute('/dashboard/')({
  component: DashboardIndex,
});

function DashboardIndex() {
  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 pb-10">
      
      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        
        {/* Hero Banner */}
        <div className="lg:col-span-2 rounded-[2rem] bg-gradient-to-br from-[#e6f2ff] to-[#f0f7ff] p-6 sm:p-10 relative overflow-hidden border border-white shadow-sm flex flex-col justify-center min-h-[280px] sm:min-h-[300px]">
          {/* Background Decorations */}
          <div className="absolute right-10 top-10 w-40 h-20 bg-white/40 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute right-[15%] bottom-[-30%] w-[300px] h-[200px] bg-blue-200/20 blur-[80px] rounded-full pointer-events-none" />
          
          {/* Two Sleek Resume Mockups */}
          <div className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 w-[220px] sm:w-[280px] h-[260px] sm:h-[320px] pointer-events-none select-none hidden sm:block">
            
            {/* Back Resume — rotated right, shifted up */}
            <div 
              className="absolute top-0 right-0 w-[180px] origin-center drop-shadow-2xl"
              style={{ transform: 'rotate(8deg) translateX(10px) translateY(-10px)' }}
            >
              <LeftCardSVG />
            </div>

            {/* Front Resume — rotated left, shifted down & over */}
            <div 
              className="absolute bottom-0 left-0 w-[190px] origin-center z-10 drop-shadow-[0_25px_35px_rgba(37,99,235,0.15)]"
              style={{ transform: 'rotate(-6deg) translateX(-10px) translateY(5px)' }}
            >
              <CenterCardSVG />
            </div>

          </div>

          <div className="relative z-10 max-w-[400px]">
            <div className="inline-block text-sm font-bold text-slate-600 mb-4 bg-white/60 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm">
              Hello! 👋
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-3 sm:mb-4">
              Let AI build your<br/>perfect CV
            </h1>
            <p className="text-slate-500 font-medium mb-8 text-sm md:text-base max-w-[280px]">
              Smart. Personalized. Memory-based. Built for your next opportunity.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link to="/onboarding" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5">
                <Plus className="w-5 h-5" /> Create New CV
              </Link>
              <button className="flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-2xl font-bold shadow-sm border border-blue-100 hover:shadow-md transition-all">
                <Upload className="w-5 h-5" /> Upload Existing
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
              <h3 className="text-xl font-extrabold text-slate-900">AI Memory</h3>
            </div>
            <p className="text-slate-500 text-sm font-medium mb-6 leading-relaxed">
              I remember your experience, skills, and preferences to make every CV better.
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Experiences', count: 24, icon: FileText },
                { label: 'Skills', count: 18, icon: PenTool },
                { label: 'Achievements', count: 15, icon: CheckCircle2 },
                { label: 'Preferences', count: 12, icon: Settings },
              ].map((item) => (
                <div key={item.label} className="bg-slate-50 p-3 rounded-2xl flex gap-3 items-center border border-slate-100/50">
                   <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-500 shadow-sm shrink-0">
                     <item.icon className="w-4 h-4" />
                   </div>
                   <div>
                     <div className="text-[10px] font-bold text-slate-900 leading-none">{item.label}</div>
                     <div className="text-[10px] font-medium text-slate-500 mt-1">{item.count} saved</div>
                   </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex justify-between items-end">
            <div className="text-[10px] text-slate-400 font-semibold leading-tight">
              Memory last updated<br/><span className="text-slate-600">Today, 10:30 AM</span>
            </div>
            <button className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">
              Manage Memory <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        
        {/* My CVs */}
        <div className="rounded-[2rem] bg-white border border-slate-100 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                 <FileText className="w-4 h-4" />
               </div>
               <h3 className="font-bold text-slate-900">My CVs</h3>
            </div>
            <Link to="/dashboard/my-cvs" className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">View all <ArrowRight className="w-3 h-3" /></Link>
          </div>
          
          <div className="space-y-3">
            {[
              { title: 'Senior Product Designer', date: 'Updated 2h ago', score: 92 },
              { title: 'Full Stack Developer', date: 'Updated 1d ago', score: 81 },
              { title: 'UX Designer', date: 'Updated 3d ago', score: 85 },
            ].map((cv, i) => (
              <div key={i} className="flex items-center justify-between p-3 -mx-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:shadow-sm group-hover:text-blue-500 transition-all">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{cv.title}</div>
                    <div className="text-[10px] text-slate-500 font-medium mt-0.5">{cv.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-md">{cv.score}%</div>
                   <button className="text-slate-300 hover:text-slate-900 transition-colors"><MoreVertical className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Optimize */}
        <div className="rounded-[2rem] bg-white border border-slate-100 p-8 shadow-sm relative overflow-hidden flex flex-col items-center justify-center text-center">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-blue-600" />
          <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
            <Wand2 className="w-5 h-5 text-blue-500" /> AI Optimize
          </h3>
          <p className="text-xs font-medium text-slate-500 mb-6">Improve your CV with AI suggestions.</p>
          
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
               {['Content', 'Structure', 'Keywords', 'Impact'].map((item) => (
                 <div key={item} className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                   <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {item}
                 </div>
               ))}
             </div>
          </div>
          
          <button className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all text-sm flex justify-center items-center gap-2 hover:-translate-y-0.5">
            Optimize Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Templates */}
        <div className="rounded-[2rem] bg-white border border-slate-100 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                 <LayoutTemplate className="w-4 h-4" />
               </div>
               <h3 className="font-bold text-slate-900">Templates</h3>
            </div>
            <Link to="/templates" className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">View all <ArrowRight className="w-3 h-3" /></Link>
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

      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        
        {/* AI Writer */}
        <div className="rounded-[2rem] bg-white border border-slate-100 p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
             <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
               <PenTool className="w-4 h-4" />
             </div>
             <h3 className="font-bold text-slate-900">AI Writer</h3>
          </div>
          <p className="text-xs font-medium text-slate-500 mb-6 pl-10">Generate tailored content for your CV</p>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
             {['Professional Summary', 'Work Experience', 'Key Achievements', 'Skills Section'].map((item) => (
                <button key={item} className="px-3 py-3 bg-blue-50 hover:bg-blue-100 text-blue-600 text-[10px] font-bold rounded-xl transition-colors border border-blue-100/50 text-center">
                  {item}
                </button>
             ))}
          </div>
          <button className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all text-sm flex justify-center items-center gap-2 hover:-translate-y-0.5">
            <Wand2 className="w-4 h-4" /> Generate with AI
          </button>
        </div>

        {/* Job Tracker */}
        <div className="rounded-[2rem] bg-white border border-slate-100 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                 <Briefcase className="w-4 h-4" />
               </div>
               <h3 className="font-bold text-slate-900">Job Tracker</h3>
            </div>
            <Link to="/dashboard/job-tracker" className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">View all <ArrowRight className="w-3 h-3" /></Link>
          </div>
          
          <div className="space-y-4">
            {[
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
                   <div className="text-[10px] font-bold text-slate-400 w-10 text-right">{job.date}</div>
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
               <h3 className="font-bold text-slate-900">Analytics</h3>
            </div>
            <Link to="/dashboard/analytics" className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">View all <ArrowRight className="w-3 h-3" /></Link>
          </div>
          
          <div className="flex gap-4 h-[140px]">
             {/* Views Chart */}
             <div className="flex-1 border border-slate-100 rounded-2xl p-4 flex flex-col justify-between">
                <div className="text-[10px] font-bold text-slate-500">Profile Views</div>
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
                <div className="text-[10px] font-bold text-slate-500 mb-3">Match Score</div>
                <div className="relative w-16 h-16 flex items-center justify-center">
                   <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                     <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="10" fill="none" />
                     <circle cx="50" cy="50" r="40" stroke="#3b82f6" strokeWidth="10" fill="none" strokeDasharray="251.2" strokeDashoffset="32.656" strokeLinecap="round" />
                   </svg>
                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <span className="text-sm font-black text-slate-900 leading-none">87%</span>
                   </div>
                 </div>
                 <span className="text-[10px] font-bold text-emerald-500 mt-2">Excellent</span>
             </div>
          </div>
        </div>

      </div>

      {/* Tip of the day */}
      <div className="rounded-[2rem] bg-gradient-to-r from-blue-50 to-[#e0f2fe] border border-blue-100 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
               <Sun className="w-6 h-6 text-amber-400" />
            </div>
            <div>
               <h4 className="text-sm font-bold text-slate-900">Tip of the day</h4>
               <p className="text-xs font-medium text-slate-600 mt-1">Add quantified achievements to your experience to stand out to recruiters.</p>
            </div>
         </div>
         <button className="bg-white text-blue-600 text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm hover:shadow border border-blue-100 transition-all flex items-center gap-1 shrink-0">
            See Example <ArrowRight className="w-3 h-3" />
         </button>
      </div>
      
    </div>
  );
}
