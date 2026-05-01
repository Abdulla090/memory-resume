const fs = require('fs');
const filePath = 'src/routes/index.tsx';
let src = fs.readFileSync(filePath, 'utf8');

// ── 1. Add X to lucide imports ──────────────────────────────────────────
src = src.replace(
  '  ArrowUpRight,\n} from "lucide-react";',
  '  ArrowUpRight,\n  X,\n} from "lucide-react";'
);

// ── 2. Swap hamburger button to animated toggle (Menu ↔ X) ─────────────
const oldHamburger = `            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 md:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={t.menu}
            >
              <Menu className="h-5 w-5" />
            </button>`;

const newHamburger = `            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 md:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={t.menu}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>`;

if (src.includes(oldHamburger)) {
  src = src.replace(oldHamburger, newHamburger);
  console.log('✓ Hamburger toggle replaced');
} else {
  console.error('✗ Could not find hamburger button');
  process.exit(1);
}

// ── 3. Replace slide-down menu with full-screen overlay ─────────────────
const oldMenu = `      {/* Mobile menu */}
      {mobileOpen && (
        <div className="pointer-events-auto mx-4 mt-2 rounded-2xl bg-white p-4 shadow-xl border border-slate-100 md:hidden">
          <button
            onClick={onToggleLanguage}
            className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
            dir={t.dir}
          >
            <Globe className="h-4 w-4" />
            {t.toggle}
          </button>
          {t.nav.map((item) => (
            <Link
              key={item.label}
              to={item.to as any}
              hash={(item as any).hash}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
              dir={t.dir}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>`;

const newMenu = `      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-fullscreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", backgroundColor: "rgba(255,255,255,0.96)" }}
          >
            {/* Tap outside to close */}
            <div className="absolute inset-0" onClick={() => setMobileOpen(false)} />

            {/* Centered nav content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center gap-3 px-8" dir={t.dir}>

              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.25 }}
                className="mb-8 flex items-center gap-2.5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900">MemoryCV</span>
              </motion.div>

              {/* Nav links */}
              {t.nav.map((item: { label: string; to: string; hash?: string }, i: number) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.24, ease: "easeOut" }}
                  className="w-full max-w-xs"
                >
                  <Link
                    to={item.to as any}
                    hash={(item as any).hash}
                    onClick={() => setMobileOpen(false)}
                    className="flex w-full items-center justify-center rounded-2xl border border-slate-100 bg-white/80 px-6 py-4 text-base font-semibold text-slate-800 shadow-sm transition-all active:scale-95 hover:border-blue-200 hover:text-blue-600"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {/* Language toggle */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + t.nav.length * 0.06, duration: 0.24, ease: "easeOut" }}
                className="w-full max-w-xs"
              >
                <button
                  onClick={() => { onToggleLanguage(); setMobileOpen(false); }}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-100 bg-white/80 px-6 py-4 text-base font-semibold text-slate-700 shadow-sm transition-all active:scale-95 hover:border-blue-200 hover:text-blue-600"
                >
                  <Globe className="h-4 w-4" />
                  {t.toggle}
                </button>
              </motion.div>

              {/* Primary CTA */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + (t.nav.length + 1) * 0.06, duration: 0.24, ease: "easeOut" }}
                className="mt-4 w-full max-w-xs"
              >
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-base font-bold text-white shadow-[0_8px_24px_rgba(37,99,235,0.28)] transition-all active:scale-95 hover:bg-blue-700"
                  dir={t.dir}
                >
                  {t.navCta}
                </Link>
              </motion.div>

            </div>

            {/* Floating close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.12, duration: 0.2, ease: "easeOut" }}
              onClick={() => setMobileOpen(false)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:bg-slate-50"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>`;

if (src.includes(oldMenu)) {
  src = src.replace(oldMenu, newMenu);
  console.log('✓ Full-screen mobile menu applied');
} else {
  console.error('✗ Could not find mobile menu block');
  // Show what we're looking for vs what's there
  const idx = src.indexOf('{/* Mobile menu */}');
  console.log('Mobile menu section at idx:', idx);
  if (idx > -1) console.log('Found section:', JSON.stringify(src.slice(idx, idx + 200)));
  process.exit(1);
}

// ── 4. Fix spacer height for mobile ────────────────────────────────────
src = src.replace(
  '      {/* Spacer */}\n      <div className="h-16 w-full flex-none" />',
  '      {/* Spacer */}\n      <div className="h-14 md:h-16 w-full flex-none" />'
);

fs.writeFileSync(filePath, src, 'utf8');
console.log('✓ All changes written. File size:', src.length);
