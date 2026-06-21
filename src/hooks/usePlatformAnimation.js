import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * usePlatformAnimation
 * ─────────────────────────────────────────────────────────
 * Drives the "One platform. Every stage of design." section.
 *
 * SEQUENCE on scroll into view:
 *   1. Heading fades up.
 *   2. The 4 cards fade/slide in ONE AT A TIME (not simultaneous),
 *      in reading order: 2D → 3D → Sketch → AI. Each card's
 *      corner marks fade in alongside it.
 *   3. As each card settles, ITS illustration starts its own
 *      stroke-draw animation — so the four illustrations draw
 *      in a staggered relay rather than all at once, matching
 *      "svgs keep drawing at intervals, one at a time."
 *
 * Card N's illustration begins drawing shortly after card N
 * arrives, while card N+1 is still animating in — this keeps
 * the whole sequence feeling alive rather than blocking step
 * by step, similar to the Showcase section's overlap approach.
 *
 * Respects prefers-reduced-motion: everything appears in its
 * final state, illustrations fully drawn, no stagger.
 */
export default function usePlatformAnimation({
  sectionRef,
  headingRef,
  cardRefs,
}) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const cards = cardRefs.map((r) => r.current).filter(Boolean);

      const cardDrawTargets = cards.map((card) =>
        card ? Array.from(card.querySelectorAll("[data-draw]")) : [],
      );

      cardDrawTargets.forEach((paths) => {
        paths.forEach((el) => {
          try {
            const len = el.getTotalLength();
            el.style.strokeDasharray = len;
            el.style.strokeDashoffset = prefersReduced ? 0 : len;
          } catch {
            /* non-path element (shouldn't happen, data-draw is path-only) */
          }
        });
      });

      if (prefersReduced) {
        gsap.set([headingRef.current, ...cards], { opacity: 1, y: 0 });
        return;
      }

      gsap.set(headingRef.current, { opacity: 0, y: 24 });
      gsap.set(cards, { opacity: 0, y: 36 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      cards.forEach((card, i) => {
        const cardStart = 0.25 + i * 0.32;

        tl.to(
          card,
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          cardStart,
        );

        const marks = card.querySelectorAll("[data-corner-mark]");
        if (marks.length) {
          tl.to(
            marks,
            { opacity: 1, duration: 0.5, ease: "power2.out" },
            cardStart + 0.1,
          );
        }

        const paths = cardDrawTargets[i];
        if (paths.length) {
          tl.to(
            paths,
            {
              strokeDashoffset: 0,
              duration: 1.1,
              ease: "power2.inOut",
              stagger: 0.06,
            },
            cardStart + 0.2,
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
