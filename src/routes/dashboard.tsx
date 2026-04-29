import { createFileRoute, Outlet, Link, useLocation } from '@tanstack/react-router';
import { Home, Files, LayoutTemplate, PenTool, Wand2, BarChart2, FileText, Briefcase, Settings, Cloud, BrainCircuit, ChevronRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAppStore } from '@/lib/store';

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
});

function DashboardLayout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const language = useAppStore((state) => state.language);
  const isKu = language === "ku";

  const navItems = [
    { name: isKu ? 'سەرەتا' : 'Home', icon: Home, path: '/dashboard' },
    { name: isKu ? 'سیڤییەکانم' : 'My CVs', icon: Files, path: '/dashboard/my-cvs' },
    { name: isKu ? 'تیمپڵەیتەکان' : 'Templates', icon: LayoutTemplate, path: '/templates' },
    { name: isKu ? 'نووسەری AI' : 'AI Writer', icon: PenTool, path: '/dashboard/ai-writer' },
    { name: isKu ? 'باشترکردنی AI' : 'AI Optimize', icon: Wand2, path: '/dashboard/ai-optimize' },
    { name: isKu ? 'شیکاری' : 'Analytics', icon: BarChart2, path: '/dashboard/analytics' },
    { name: isKu ? 'نامەی ڕووپۆش' : 'Cover Letters', icon: FileText, path: '/dashboard/cover-letters' },
    { name: isKu ? 'چاودێری کار' : 'Job Tracker', icon: Briefcase, path: '/dashboard/job-tracker' },
    { name: isKu ? 'ڕێکخستنەکان' : 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  return (
    <div className="flex h-screen bg-[#f0f7ff] font-sans text-slate-800 overflow-hidden">

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar — slide-over on mobile, collapsed icon-bar on desktop */}
      <aside className={`
        fixed md:relative z-50 md:z-auto
        bg-white border-x border-slate-100 flex flex-col justify-between py-6 shrink-0 h-full overflow-y-auto
        transition-all duration-300 ease-in-out
        ${isSidebarOpen
          ? 'w-[280px] translate-x-0'
          : `${isKu ? 'translate-x-full md:translate-x-0' : '-translate-x-full md:translate-x-0'} md:w-[80px] w-[280px]`}
      `}>
        <div>
          <div className={`flex items-center px-4 mb-10 ${isSidebarOpen ? 'gap-3' : 'md:justify-center'}`}>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30 text-white shrink-0 cursor-pointer hover:bg-blue-600 transition-colors"
              title={isKu ? "پیشاندانی لیستی لاتەنیشت" : "Toggle Sidebar"}
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            {isSidebarOpen && <span className="text-xl font-bold text-slate-900 tracking-tight leading-tight">{isKu ? <>دروستکەری<br/>سیڤی AI</> : <>AI CV<br/>Builder</>}</span>}
          </div>

          <nav className="space-y-1 px-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  title={item.name}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 py-3.5 rounded-2xl font-bold transition-all
                    ${isSidebarOpen ? 'px-4' : 'md:justify-center md:px-0 px-4'}
                    ${isActive ? 'bg-[#f4f9ff] text-blue-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {isSidebarOpen && <span className="truncate">{item.name}</span>}
                  {!isSidebarOpen && <span className="truncate md:hidden">{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

         <div className={`px-4 mt-10 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
          <div className="bg-gradient-to-b from-white to-[#f8fbff] border border-blue-100 p-5 rounded-3xl shadow-sm">
            <div className="flex justify-between items-start mb-4">
               <div className="flex gap-2 items-center">
                 <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <BrainCircuit className="w-4 h-4" />
                 </div>
                 <div>
                    <div className="text-xs font-bold text-blue-600">{isKu ? "یادگەی AI" : "AI Memory"}</div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {isKu ? "کراوەتەوە" : "On"}
                    </div>
                 </div>
               </div>
            </div>
            <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-2">
              <span>{isKu ? "بەکارهێنانی یادگە" : "Memory Usage"}</span><span className="text-slate-900">68%</span>
            </div>
            <div className="h-1.5 w-full bg-blue-100 rounded-full overflow-hidden mb-4">
              <div className={`h-full bg-blue-500 rounded-full w-[68%] ${isKu ? 'ml-auto' : ''}`} />
            </div>
            <button className="text-[10px] font-bold text-blue-600 flex items-center gap-1 hover:underline cursor-pointer">
              {isKu ? "زیاتر بزانە" : "Learn more"} <ChevronRight className={`w-3 h-3 ${isKu ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto p-4 sm:p-6 lg:p-10 relative min-w-0">
        {/* Mobile hamburger */}
        <button
          className="md:hidden mb-4 w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30 text-white cursor-pointer hover:bg-blue-600 transition-colors"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </button>
        <Outlet />
      </main>
    </div>
  );
}
