import { useEffect, useRef, type ReactNode } from "react";

type LandingScrollMotionProps = {
  children: ReactNode;
};

export function LandingScrollMotion({ children }: LandingScrollMotionProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup = () => undefined;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapModule, scrollTriggerModule]) => {
        if (cancelled || !rootRef.current) return;

        const gsap = gsapModule.default;
        const { ScrollTrigger } = scrollTriggerModule;
        gsap.registerPlugin(ScrollTrigger);

        const media = gsap.matchMedia();
        const context = gsap.context(() => {
          media.add(
            {
              motion: "(prefers-reduced-motion: no-preference)",
              desktop: "(min-width: 768px)",
            },
            ({ conditions }) => {
              if (!conditions?.motion) return;

              const distance = conditions.desktop ? 44 : 24;

              gsap.to("[data-gsap-progress]", {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: rootRef.current,
                  start: "top top",
                  end: "bottom bottom",
                  scrub: 0.2,
                },
              });

              gsap.utils
                .toArray<HTMLElement>("[data-gsap-reveal]")
                .forEach((element) => {
                  gsap.fromTo(
                    element,
                    {
                      autoAlpha: 0,
                      y: distance,
                      scale: conditions.desktop ? 0.992 : 1,
                    },
                    {
                      autoAlpha: 1,
                      y: 0,
                      scale: 1,
                      duration: conditions.desktop ? 0.95 : 0.72,
                      ease: "power3.out",
                      clearProps: "willChange",
                      scrollTrigger: {
                        trigger: element,
                        start: "top 88%",
                        once: true,
                      },
                    },
                  );
                });

              if (conditions.desktop) {
                gsap.utils
                  .toArray<HTMLElement>("[data-gsap-depth]")
                  .forEach((element) => {
                    gsap.fromTo(
                      element,
                      { yPercent: 2.5 },
                      {
                        yPercent: -2.5,
                        ease: "none",
                        scrollTrigger: {
                          trigger: element,
                          start: "top bottom",
                          end: "bottom top",
                          scrub: 0.8,
                        },
                      },
                    );
                  });
              }

              ScrollTrigger.refresh();
            },
          );
        }, rootRef);

        cleanup = () => {
          media.revert();
          context.revert();
        };
      },
    );

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <div
        aria-hidden="true"
        data-gsap-progress
        className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[2px] origin-left scale-x-0 bg-[#2563EB]"
      />
      {children}
    </div>
  );
}
