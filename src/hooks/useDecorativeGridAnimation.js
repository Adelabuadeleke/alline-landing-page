import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useDecorativeGridAnimation
 * ─────────────────────────────────────────────────────────
 * Draw-on animation for the 32-path DecorativeGrid SVG,
 * converted from the SVGArtista CSS keyframe export to GSAP.
 *
 * WHY GSAP OVER THE SVGARTISTA CSS EXPORT:
 *   - Hardcoded pixel lengths (830px / 436px / 1052px / ...)
 *     only work for THIS exact SVG at THIS exact viewBox.
 *     getTotalLength() measures each path at runtime, so the
 *     animation stays correct if paths ever change.
 *   - SVGArtista's CSS fires on mount (page load). Here it's
 *     scroll-triggered — the grid only draws once the section
 *     enters the viewport, matching the rest of the site
 *     (Manifesto, Showcase, PriorityAccess all reveal on scroll).
 *   - One GSAP context = one place to tune timing, easing,
 *     and reduced-motion handling, consistent with the other
 *     hooks in this project.
 *
 * TIMING:
 *   Replicates the original SVGArtista cadence — each of the
 *   32 paths draws over 1s with a 0.12s stagger (DOM order),
 *   total ≈ 1s + 31×0.12s ≈ 4.7s. Easing approximates the
 *   original cubic-bezier(0.47, 0, 0.745, 0.715) — an "ease-in"
 *   curve — via GSAP's 'power1.in'.
 *
 * Plays once when the section is ~75% into the viewport.
 * Respects prefers-reduced-motion (shows fully drawn, no pin).
 */
export default function useDecorativeGridAnimation({ sectionRef, svgRef }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const svgEl = svgRef.current;
      if (!svgEl) return;

      const paths = Array.from(svgEl.querySelectorAll("path"));

      /* ── Prepare stroke-dasharray / dashoffset per path ── */
      paths.forEach((el) => {
        try {
          const len = el.getTotalLength();
          el.style.strokeDasharray = len;
          el.style.strokeDashoffset = prefersReduced ? 0 : len;
        } catch {
          /* getTotalLength unsupported — path stays fully visible */
        }
      });

      if (prefersReduced) return;

      gsap.to(paths, {
        strokeDashoffset: 0,
        duration: 1,
        ease: "power1.in",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
