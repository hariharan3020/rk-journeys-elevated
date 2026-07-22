import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Public-site scroll orchestration. Admin screens keep native scrolling. */
export function ScrollExperience({ enabled = true }: { enabled?: boolean }) {
  useEffect(() => {
    if (!enabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: false,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 42, rotateX: 3 },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 86%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
        const children = group.querySelectorAll<HTMLElement>("[data-reveal-item]");
        gsap.fromTo(
          children,
          { autoAlpha: 0, y: 34, scale: 0.98 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: { trigger: group, start: "top 82%", once: true },
          },
        );
      });

      const heroImage = document.querySelector<HTMLElement>("[data-hero-parallax]");
      if (heroImage) {
        gsap.to(heroImage, {
          yPercent: 12,
          scale: 1.08,
          ease: "none",
          scrollTrigger: { trigger: heroImage, start: "top top", end: "bottom top", scrub: true },
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-depth]").forEach((element) => {
        gsap.to(element, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      context.revert();
      lenis.destroy();
    };
  }, [enabled]);

  return null;
}
