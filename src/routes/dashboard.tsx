import { createFileRoute, Outlet, Link, useLocation } from '@tanstack/react-router';
import {
  Home, Files, LayoutTemplate, PenTool, Wand2, BarChart2,
  FileText, Briefcase, Settings, BrainCircuit, ChevronRight,
  Menu, X, Heart, Zap,
} from 'lucide-react';
import { useState } from 'react';
import { useAppStore } from '@/lib/store';

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
});

function DashboardLayout() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const language = useAppStore((state) => state.language);
  const isKu = language === 'ku';

  const navItems = [
    { name: isKu ? 'سەرەتا'        : 'Home',           icon: Home,           path: '/dashboard'                },
    { name: isKu ? 'سیڤییەکانم'    : 'My CVs',          icon: Files,          path: '/dashboard/my-cvs'         },
    { name: isKu ? 'تیمپڵەیتەکان' : 'Templates',       icon: LayoutTemplate, path: '/templates'                },
    { name: isKu ? 'نووسەری AI'    : 'AI Writer',       icon: PenTool,        path: '/dashboard/ai-writer'      },
    { name: isKu ? 'باشترکردنی AI' : 'AI Optimize',     icon: Wand2,          path: '/dashboard/ai-optimize'    },
    { name: isKu ? 'شیکاری'        : 'Analytics',       icon: BarChart2,      path: '/dashboard/analytics'      },
    { name: isKu ? 'نامەی ڕووپۆش'  : 'Cover Letters',   icon: FileText,       path: '/dashboard/cover-letters'  },
    { name: isKu ? 'کارتی سوپاس'   : 'Thank-You Cards', icon: Heart,          path: '/dashboard/thanks'         },
    { name: isKu ? 'چاودێری کار'   : 'Job Tracker',     icon: Briefcase,      path: '/dashboard/job-tracker'    },
    { name: isKu ? 'ڕێکخستنەکان'  : 'Settings',        icon: Settings,       path: '/dashboard/settings'       },
  ];

  return (
    <div
      className="flex h-screen overflow-hidden font-sans"
      style={{ background: 'var(--background, #f8fafc)' }}
      dir={isKu ? 'rtl' : 'ltr'}
    >
      {/* ── Mobile dim overlay ─────────────────────────────────────────── */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* ── Sidebar ────────────────────────────────────────────────────── */}
      <aside
        style={{
          background: '#0a0a0a',
          borderRight: isKu ? 'none' : '1px solid rgba(255,255,255,0.06)',
          borderLeft:  isKu ? '1px solid rgba(255,255,255,0.06)' : 'none',
          transition: 'width 320ms cubic-bezier(0.4,0,0.2,1), transform 320ms cubic-bezier(0.4,0,0.2,1), box-shadow 320ms ease',
          willChange: 'width, transform',
        }}
        className={`
          fixed lg:relative z-50 lg:z-auto inset-y-0
          ${isKu ? 'right-0' : 'left-0'}
          flex flex-col justify-between py-5 h-full overflow-hidden shrink-0
          ${isOpen
            ? 'w-[268px] shadow-[4px_0_40px_rgba(0,0,0,0.6)]'
            : `${isKu ? 'translate-x-full lg:translate-x-0' : '-translate-x-full lg:translate-x-0'} lg:w-[72px] w-[268px]`
          }
        `}
      >
        {/* Top section */}
        <div className="flex flex-col gap-1 min-h-0">

          {/* Logo / toggle row */}
          <div className={`flex items-center mb-6 px-4 ${isOpen ? 'gap-3' : 'lg:justify-center'}`}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              title={isKu ? 'تۆمارکردنی لیست' : 'Toggle sidebar'}
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 cursor-pointer text-white transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg,#2563eb,#1d4ed8)',
                boxShadow: '0 0 16px rgba(37,99,235,0.45)',
              }}
            >
              {isOpen ? <X className="w-[18px] h-[18px]" /> : <Menu className="w-[18px] h-[18px]" />}
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-w-[160px] opacity-100' : 'max-w-0 opacity-0'}`}
              style={{ whiteSpace: 'nowrap' }}
            >
              <span className="text-white font-extrabold text-[15px] tracking-tight leading-tight flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                {isKu ? 'دروستکەری سیڤی' : 'AI CV Builder'}
              </span>
            </div>
          </div>

          {/* Nav items */}
          <nav className="space-y-0.5 px-2.5 overflow-y-auto overflow-x-hidden">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path !== '/dashboard' && location.pathname.startsWith(item.path));

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  title={item.name}
                  onClick={() => setIsOpen(false)}
                  className={`
                    group flex items-center gap-3 py-2.5 rounded-xl font-medium cursor-pointer
                    transition-all duration-150
                    ${isOpen ? 'px-3.5' : 'lg:justify-center lg:px-0 px-3.5'}
                    ${isActive
                      ? 'text-white'
                      : 'text-white/40 hover:text-white/80'
                    }
                  `}
                  style={isActive ? {
                    background: 'rgba(37,99,235,0.18)',
                    boxShadow: 'inset 0 0 0 1px rgba(59,130,246,0.35), 0 0 12px rgba(37,99,235,0.15)',
                  } : {}}
                >
                  {/* Icon */}
                  <span
                    className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-150
                      ${isActive
                        ? 'text-blue-400'
                        : 'text-white/30 group-hover:text-white/70'
                      }`}
                  >
                    <item.icon className="w-[18px] h-[18px]" />
                  </span>

                  {/* Label — visible when open OR on mobile */}
                  <span
                    className={`text-[13px] truncate transition-all duration-200
                      ${isOpen ? 'opacity-100 max-w-[160px]' : 'opacity-0 max-w-0 lg:hidden opacity-100 max-w-[160px]'}
                    `}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    {item.name}
                  </span>
                  {/* Always visible on mobile when sidebar open  */}
                  {!isOpen && (
                    <span className="truncate text-[13px] lg:hidden" style={{ whiteSpace: 'nowrap' }}>
                      {item.name}
                    </span>
                  )}

                  {/* Active dot */}
                  {isActive && (
                    <span
                      className="ms-auto w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"
                      style={{
                        display: isOpen ? 'block' : 'none',
                        boxShadow: '0 0 6px rgba(96,165,250,0.9)',
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom AI Memory card — only when expanded */}
        <div
          className="px-3 mt-4"
          style={{
            transition: 'opacity 200ms ease, visibility 200ms ease',
            opacity: isOpen ? 1 : 0,
            visibility: isOpen ? 'visible' : 'hidden',
          }}
        >
          <div
            className="rounded-2xl p-4"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(37,99,235,0.25)', border: '1px solid rgba(59,130,246,0.3)' }}
              >
                <BrainCircuit className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <div className="text-[12px] font-semibold text-white leading-tight">
                  {isKu ? 'یادگەی AI' : 'AI Memory'}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                    style={{ boxShadow: '0 0 6px rgba(52,211,153,0.8)' }}
                  />
                  <span className="text-[10px] font-medium text-emerald-400">
                    {isKu ? 'کراوەتەوە' : 'Active'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between text-[10px] font-medium text-white/40 mb-1.5">
              <span>{isKu ? 'بەکارهێنانی یادگە' : 'Memory Usage'}</span>
              <span className="text-white/70">68%</span>
            </div>
            <div className="h-1 w-full rounded-full mb-3 overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: '68%',
                  background: 'linear-gradient(90deg,#2563eb,#60a5fa)',
                  boxShadow: '0 0 8px rgba(37,99,235,0.6)',
                  marginLeft: isKu ? 'auto' : undefined,
                }}
              />
            </div>

            <button className="flex items-center gap-1 text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer">
              {isKu ? 'زیاتر بزانە' : 'Learn more'}
              <ChevronRight className={`w-3 h-3 ${isKu ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main content ───────────────────────────────────────────────── */}
      <main className="flex-1 h-full overflow-y-auto p-4 sm:p-6 lg:p-10 relative min-w-0 text-foreground bg-background">
        {/* Mobile hamburger */}
        <button
          className="lg:hidden mb-6 w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center shadow-sm text-foreground cursor-pointer hover:bg-muted transition-colors"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </button>
        <Outlet />
      </main>
    </div>
  );
}
