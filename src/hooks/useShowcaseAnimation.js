import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useShowcaseAnimation
 * ─────────────────────────────────────────────────────────
 * Drives the Showcase section:
 *
 * DESKTOP (≥1024px):
 *   The section is PINNED for the duration of a scroll-scrubbed
 *   master timeline. Nothing advances to the next section until
 *   the timeline completes.
 *
 *   Timeline (normalized 0 → ~0.9):
 *     0.00 → 0.85  Floor plan draws (shell first, then details,
 *                   staggered stroke-dashoffset 0)
 *     0.00 → 0.35  "Draft in Minutes" slides up + fades in
 *     0.14 → 0.49  "AI That Speaks Architecture" slides up + fades in
 *     0.28 → 0.63  "Smart edits" slides up + fades in
 *     0.42 → 0.77  "Collaborative design" slides up + fades in
 *
 *   Each block's tween uses power3.out easing for a smooth
 *   deceleration into place. Overlapping start times create the
 *   "sequential but not blocking" feel requested.
 *
 * MOBILE (<1024px):
 *   Pinning a tall stacked layout feels heavy on small screens,
 *   so instead each block fades up independently as it enters
 *   the viewport (toggleActions: play once), and the floor plan
 *   draws once when it scrolls into view.
 *
 * Respects prefers-reduced-motion: everything is shown in its
 * final state immediately, no pin, no draw animation.
 */
export default function useShowcaseAnimation({
  sectionRef,
  pinRef,
  svgRef,
  draftRef,
  aiRef,
  smartRef,
  collabRef,
}) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    const ctx = gsap.context(() => {
      const svgEl = svgRef.current;
      const shapes = svgEl
        ? Array.from(svgEl.querySelectorAll("path, rect"))
        : [];

      /* ── Prepare stroke-dasharray / dashoffset for every shape ── */
      shapes.forEach((el) => {
        try {
          const len = el.getTotalLength();
          el.style.strokeDasharray = len;
          el.style.strokeDashoffset = prefersReduced ? 0 : len;
        } catch {
          /* getTotalLength unsupported — element stays fully visible */
        }
      });

      const blocks = [draftRef, aiRef, smartRef, collabRef]
        .map((r) => r.current)
        .filter(Boolean);

      /* ── Reduced motion: show final state, no pin, no draw ── */
      if (prefersReduced) {
        gsap.set(blocks, { opacity: 1, y: 0 });
        return;
      }

      /* ── Mobile: simple sequential reveal, no pin ── */
      if (!isDesktop) {
        blocks.forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            },
          );
        });

        if (shapes.length) {
          gsap.to(shapes, {
            strokeDashoffset: 0,
            duration: 1.6,
            ease: "power2.out",
            stagger: { each: 0.006, from: "start" },
            scrollTrigger: {
              trigger: svgEl,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
        }
        return;
      }

      /* ── Desktop: pinned, scroll-scrubbed master timeline ── */
      gsap.set(blocks, { opacity: 0, y: 60 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => "+=" + window.innerHeight * 1.4,
          scrub: 1,
          pin: pinRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /* Floor plan draws across most of the timeline */
      if (shapes.length) {
        tl.to(
          shapes,
          {
            strokeDashoffset: 0,
            ease: "none",
            duration: 0.4,
            stagger: { each: 0.0065, from: "start" },
          },
          0,
        );
      }

      /* Sequential, overlapping text reveals — power3.out for smooth easing */
      const [draft, ai, smart, collab] = blocks;

      if (draft) {
        tl.fromTo(
          draft,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, ease: "power3.out", duration: 0.35 },
          0,
        );
      }
      if (ai) {
        tl.fromTo(
          ai,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, ease: "power3.out", duration: 0.35 },
          0.14,
        );
      }
      if (smart) {
        tl.fromTo(
          smart,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, ease: "power3.out", duration: 0.35 },
          0.28,
        );
      }
      if (collab) {
        tl.fromTo(
          collab,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, ease: "power3.out", duration: 0.35 },
          0.42,
        );
      }

      /*
       * tl.duration() is now the max of the floor-plan draw end
       * (~0.4 + 0.0065*63 ≈ 0.81) and the collab text end (0.77).
       * The remaining scroll distance (~0.81 → 1.0 of the pin)
       * acts as a brief "hold" on the completed state before the
       * section unpins and normal scroll resumes.
       */
    }, sectionRef);

    return () => ctx.revert();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
