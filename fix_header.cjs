const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/routes/index.tsx');
let src = fs.readFileSync(filePath, 'utf8');

// Find start and end markers
const startMarker = 'export function Header(';
const endMarker = '\nexport const LeftCardSVG';

const startIdx = src.indexOf(startMarker);
const endIdx = src.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not find Header function boundaries');
  console.log('startIdx:', startIdx, 'endIdx:', endIdx);
  process.exit(1);
}

const before = src.slice(0, startIdx);
const after = src.slice(endIdx);

const newHeader = `export function Header({ language, onToggleLanguage }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = copy[language];

  const rawScroll = useMotionValue(0);
  useEffect(() => {
    const onScroll = () => rawScroll.set(Math.min(window.scrollY / 120, 1));
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [rawScroll]);

  const progress = useSpring(rawScroll, { stiffness: 160, damping: 28, mass: 0.6 });
  const maxW          = useTransform(progress, [0, 1], ['1280px', '780px']);
  const marginTop     = useTransform(progress, [0, 1], ['0px', '12px']);
  const paddingX      = useTransform(progress, [0, 1], ['24px', '20px']);
  const height        = useTransform(progress, [0, 1], ['64px', '52px']);
  const borderRadius  = useTransform(progress, [0, 1], ['0px', '999px']);
  const bgOpacity     = useTransform(progress, [0, 1], [0, 0.85]);
  const shadowOpacity = useTransform(progress, [0, 1], [0, 1]);
  const borderOpacity = useTransform(progress, [0, 1], [0, 1]);
  const gap           = useTransform(progress, [0, 1], ['0px', '8px']);
  const navPx         = useTransform(progress, [0, 1], ['16px', '12px']);
  const navPy         = useTransform(progress, [0, 1], ['8px', '6px']);
  const navFontSize   = useTransform(progress, [0, 1], ['14px', '13px']);
  const ctaPx         = useTransform(progress, [0, 1], ['20px', '14px']);
  const ctaPy         = useTransform(progress, [0, 1], ['10px', '7px']);
  const ctaFontSize   = useTransform(progress, [0, 1], ['14px', '12px']);

  return (
    <>
      {/* ── MOBILE NAVBAR (below md): simple solid fixed bar, no Framer animations ── */}
      <header
        className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm px-4 h-14 md:hidden"
        dir="ltr"
      >
        <Link to="/" className="flex shrink-0 items-center gap-2" id="nav-logo-mobile">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 shadow-sm">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-bold tracking-tight text-slate-900">MemoryCV</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleLanguage}
            className="flex items-center rounded-lg p-2 text-slate-600 hover:bg-slate-50 transition-colors"
            aria-label="Change language"
          >
            <Globe className="h-4 w-4" />
          </button>

          <Link
            to="/dashboard"
            id="nav-free-trial-mobile"
            className="rounded-full bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-colors whitespace-nowrap"
            dir={t.dir}
          >
            {t.navCta}
          </Link>

          <button
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 shrink-0 transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={t.menu}
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed left-0 right-0 top-14 z-40 md:hidden bg-white border-b border-slate-100 shadow-lg px-4 py-2 flex flex-col gap-1"
          >
            <button
              onClick={() => { onToggleLanguage(); setMobileOpen(false); }}
              className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              dir={t.dir}
            >
              <Globe className="h-4 w-4" />
              {t.toggle}
            </button>
            {t.nav.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                hash={item.hash}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                dir={t.dir}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── DESKTOP NAVBAR (md+): animated morphing pill ── */}
      <header className="fixed left-0 right-0 top-0 z-50 pointer-events-none hidden md:block" dir="ltr">
        <motion.div
          className="relative mx-auto pointer-events-auto flex items-center justify-between"
          style={{
            maxWidth: maxW,
            marginTop,
            paddingLeft: paddingX,
            paddingRight: paddingX,
            height,
            borderRadius,
            gap,
            backgroundColor: useTransform(bgOpacity, (v) => ('rgba(255,255,255,' + v + ')')),
            boxShadow: useTransform(shadowOpacity, (v) => ('0 8px 32px rgba(0,0,0,' + (v * 0.09) + '), 0 1px 3px rgba(0,0,0,' + (v * 0.05) + ')')),
            border: useTransform(borderOpacity, (v) => ('1px solid rgba(203,213,225,' + (v * 0.6) + ')')),
            backdropFilter: useTransform(bgOpacity, (v) => ('blur(' + (v * 16) + 'px)')),
            WebkitBackdropFilter: useTransform(bgOpacity, (v) => ('blur(' + (v * 16) + 'px)')),
          }}
        >
          <Link to="/" className="flex shrink-0 items-center gap-2 cursor-pointer" id="nav-logo">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 shadow-sm">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-bold tracking-tight text-slate-900">MemoryCV</span>
          </Link>

          <nav className="flex items-center" style={{ gap: '2px' }}>
            {t.nav.map((item) => (
              <motion.div key={item.label} style={{ paddingLeft: navPx, paddingRight: navPx, paddingTop: navPy, paddingBottom: navPy }}>
                <Link
                  to={item.to}
                  hash={item.hash}
                  className="rounded-lg font-semibold text-slate-600 transition-colors hover:text-slate-900"
                  style={{ fontSize: navFontSize }}
                  dir={t.dir}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <motion.button
              onClick={onToggleLanguage}
              className="flex items-center gap-1.5 rounded-lg font-semibold text-slate-600 transition-colors hover:text-slate-900 overflow-hidden"
              style={{ fontSize: navFontSize }}
              aria-label="Change language"
              dir="ltr"
            >
              <Globe className="h-4 w-4 shrink-0" />
              <motion.span
                style={{
                  maxWidth: useTransform(progress, [0.6, 1], ['80px', '0px']),
                  opacity: useTransform(progress, [0.5, 0.9], [1, 0]),
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  display: 'inline-block',
                }}
              >
                {t.toggle}
              </motion.span>
            </motion.button>

            <motion.div
              style={{ paddingLeft: ctaPx, paddingRight: ctaPx, paddingTop: ctaPy, paddingBottom: ctaPy }}
              className="rounded-full bg-blue-600 shadow-sm transition-shadow hover:bg-blue-700 hover:shadow-md"
            >
              <Link
                to="/dashboard"
                id="nav-free-trial"
                className="block whitespace-nowrap font-bold text-white"
                style={{ fontSize: ctaFontSize }}
                dir={t.dir}
              >
                {t.navCta}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </header>

      {/* Spacer: 56px mobile / 64px desktop */}
      <div className="h-14 md:h-16 w-full flex-none" />
    </>
  );
}
`;

fs.writeFileSync(filePath, before + newHeader + after, 'utf8');
console.log('Done! New file size:', (before + newHeader + after).length, 'bytes');
