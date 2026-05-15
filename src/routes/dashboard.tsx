import { createFileRoute, Outlet, Link, useLocation } from '@tanstack/react-router';
import { Home, Files, LayoutTemplate, PenTool, Wand2, BarChart2, FileText, Briefcase, Settings, BrainCircuit, ChevronRight, Menu, X, Heart } from 'lucide-react';
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
    { name: isKu ? 'کارتی سوپاس' : 'Thank-You Cards', icon: Heart, path: '/dashboard/thanks' },
    { name: isKu ? 'چاودێری کار' : 'Job Tracker', icon: Briefcase, path: '/dashboard/job-tracker' },
    { name: isKu ? 'ڕێکخستنەکان' : 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  return (
    <div className="flex h-screen bg-background font-sans text-foreground overflow-hidden transition-colors duration-700" dir={isKu ? 'rtl' : 'ltr'}>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden transition-colors duration-700"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar — slide-over on mobile, collapsed icon-bar on desktop */}
      <aside className={`
        fixed lg:relative z-50 lg:z-auto inset-y-0 ${isKu ? 'right-0 border-l' : 'left-0 border-r'}
        bg-card border-border flex flex-col justify-between py-6 shrink-0 h-full overflow-y-auto
        transition-all duration-700 ease-in-out
        ${isSidebarOpen
          ? 'w-[280px] translate-x-0 shadow-2xl'
          : `${isKu ? 'translate-x-full lg:translate-x-0' : '-translate-x-full lg:translate-x-0'} lg:w-[80px] w-[280px]`}
      `}>
        <div>
          <div className={`flex items-center px-4 mb-10 ${isSidebarOpen ? 'gap-3' : 'lg:justify-center'}`}>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30 text-white shrink-0 cursor-pointer hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all"
              title={isKu ? "پیشاندانی لیستی لاتەنیشت" : "Toggle Sidebar"}
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            {isSidebarOpen && <span className="text-xl font-bold tracking-tight leading-tight text-foreground">{isKu ? <>دروستکەری<br/>سیڤی AI</> : <>AI CV<br/>Builder</>}</span>}
          </div>

          <nav className="space-y-1.5 px-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  title={item.name}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 py-3 rounded-xl font-medium transition-all
                    ${isSidebarOpen ? 'px-4' : 'lg:justify-center lg:px-0 px-4'}
                    ${isActive 
                      ? 'bg-blue-50 text-blue-700 shadow-sm shadow-blue-100/50 border border-blue-100/50' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent'}`}
                >
                  <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-blue-600' : ''}`} />
                  {isSidebarOpen && <span className="truncate text-sm">{item.name}</span>}
                  {!isSidebarOpen && <span className="truncate lg:hidden text-sm">{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

         <div className={`px-4 mt-10 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
          <div className="bg-muted/40 border border-border p-5 rounded-2xl shadow-sm">
            <div className="flex justify-between items-start mb-4">
               <div className="flex gap-2 items-center">
                 <div className="w-8 h-8 rounded-full bg-blue-100/50 flex items-center justify-center text-blue-600">
                    <BrainCircuit className="w-4 h-4" />
                 </div>
                 <div>
                    <div className="text-xs font-semibold text-foreground">{isKu ? "یادگەی AI" : "AI Memory"}</div>
                    <div className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-500 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" /> {isKu ? "کراوەتەوە" : "Active"}
                    </div>
                 </div>
               </div>
            </div>
            <div className="flex justify-between text-[10px] font-medium text-muted-foreground mb-2">
              <span>{isKu ? "بەکارهێنانی یادگە" : "Memory Usage"}</span><span className="text-foreground">68%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-4 border border-slate-200/50">
              <div className={`h-full bg-blue-600 rounded-full w-[68%] ${isKu ? 'ml-auto' : ''}`} />
            </div>
            <button className="text-[10px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700 transition-colors cursor-pointer">
              {isKu ? "زیاتر بزانە" : "Learn more"} <ChevronRight className={`w-3 h-3 ${isKu ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto p-4 sm:p-6 lg:p-10 relative min-w-0">
        {/* Mobile hamburger */}
        <button
          className="lg:hidden mb-6 w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center shadow-sm text-foreground cursor-pointer hover:bg-muted transition-colors"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </button>
        <Outlet />
      </main>
    </div>
  );
}

