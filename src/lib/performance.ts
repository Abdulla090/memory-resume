import { useEffect, useState } from "react";

const MOBILE_MQ = "(max-width: 768px)";
const REDUCED_MQ = "(prefers-reduced-motion: reduce)";

/** True on narrow viewports or when the user prefers reduced motion. */
export function useMobileOptimized(): boolean {
  const [optimized, setOptimized] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia(MOBILE_MQ);
    const reduced = window.matchMedia(REDUCED_MQ);
    const update = () => setOptimized(mobile.matches || reduced.matches);
    update();
    mobile.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      mobile.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  return optimized;
}

/** Sets `perf-mobile` on <html> for global CSS performance rules. */
export function initPerfMobileClass(): () => void {
  const mobile = window.matchMedia(MOBILE_MQ);
  const reduced = window.matchMedia(REDUCED_MQ);
  const apply = () => {
    const on = mobile.matches || reduced.matches;
    document.documentElement.classList.toggle("perf-mobile", on);
    document.documentElement.classList.toggle("reduce-motion", reduced.matches);
  };
  apply();
  mobile.addEventListener("change", apply);
  reduced.addEventListener("change", apply);
  return () => {
    mobile.removeEventListener("change", apply);
    reduced.removeEventListener("change", apply);
    document.documentElement.classList.remove("perf-mobile", "reduce-motion");
  };
}
