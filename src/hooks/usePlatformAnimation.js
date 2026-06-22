import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * usePlatformAnimation
 * ─────────────────────────────────────────────────────────
 * Drives the "One platform. Every stage of design." section
 * with GENUINE stroke-drawn illustrations — every visible line
 * in every card animates via stroke-dashoffset, not a clip-path
 * fade. Filled shapes (knot bodies, cube faces, the 2D plan's
 * panels) stay hidden while their outline draws, then fade in
 * once the line finishes — so the fill visibly follows the
 * pen, rather than appearing as a flat wipe.
 *
 * ── Each illustration's elements ──
 *   [data-stroke-path]  the actual line(s) that draw via
 *                       stroke-dashoffset
 *   [data-fill-target]  a filled shape that should stay
 *                       invisible until its sibling stroke(s)
 *                       finish, then fade in
 *   [data-accent]       small dots/handles that pop in last,
 *                       after everything else in that
 *                       drawable is done
 *
 * ── Drawable units ──
 *   A "drawable" is either a [data-cube-group] / [data-knot-group]
 *   sub-unit (Sketch, AI — 3 each) or the single [data-draw-group]
 *   as a whole (2D, 3D). For multi-unit illustrations, ALL units
 *   are hidden up front, then they reveal one at a time.
 *
 * SEQUENCE:
 *
 *  Phase 1 — entrance (scroll-triggered, plays once):
 *    Heading fades up. Cards fade in and draw strictly one
 *    after another: 2D card fully drawn → 3D card fully drawn
 *    → Sketch (all 3 cubes hidden first, then cube 0 draws,
 *    then cube 1, then cube 2) → AI (all 3 knots hidden first,
 *    then knot 0, then knot 1, then knot 2).
 *
 *  Phase 2 — infinite loop (starts once Phase 1 completes):
 *    Repeats forever, one card at a time, same order: undraw
 *    the card's drawable(s) back to hidden, then redraw them,
 *    before moving to the next card.
 *
 * Respects prefers-reduced-motion: everything appears fully
 * drawn immediately, no animation, no loop.
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
    let loopTimeline = null;

    const ctx = gsap.context(() => {
      const cards = cardRefs.map((r) => r.current).filter(Boolean);

      /* ── Resolve each card's drawable unit(s) ── */
      function getDrawables(card) {
        const subGroups = Array.from(
          card.querySelectorAll("[data-cube-group], [data-knot-group]"),
        );
        if (subGroups.length) return subGroups;
        const mainGroup = card.querySelector("[data-draw-group]");
        return mainGroup ? [mainGroup] : [];
      }

      const cardDrawables = cards.map(getDrawables);

      /* ── Per-drawable element lookup ── */
      function strokesOf(drawable) {
        return Array.from(drawable.querySelectorAll("[data-stroke-path]"));
      }
      function fillsOf(drawable) {
        return Array.from(drawable.querySelectorAll("[data-fill-target]"));
      }
      function accentsOf(drawable) {
        return Array.from(drawable.querySelectorAll("[data-accent]"));
      }

      /* ── Measure + arm every stroke path's dash offset ── */
      function prepStrokes(drawable) {
        strokesOf(drawable).forEach((el) => {
          try {
            const len = el.getTotalLength();
            el.style.strokeDasharray = len;
            el.style.strokeDashoffset = prefersReduced ? 0 : len;
          } catch {
            /* not a measurable path */
          }
        });
      }
      cardDrawables.forEach((drawables) => drawables.forEach(prepStrokes));

      /* ── Hide / show a whole drawable (its fills + accents) ── */
      function hideDrawable(drawable) {
        const strokes = strokesOf(drawable);
        const fills = fillsOf(drawable);
        const accents = accentsOf(drawable);
        strokes.forEach((el) => {
          el.style.strokeDashoffset = el.getTotalLength
            ? el.getTotalLength()
            : el.style.strokeDasharray;
        });
        gsap.set(fills, { opacity: 0 });
        gsap.set(accents, { opacity: 0, scale: 0, transformOrigin: "50% 50%" });
      }
      function showDrawableInstant(drawable) {
        strokesOf(drawable).forEach((el) => {
          el.style.strokeDashoffset = 0;
        });
        gsap.set(fillsOf(drawable), { opacity: 1 });
        gsap.set(accentsOf(drawable), { opacity: 1, scale: 1 });
      }

      /* ── Reduced motion: show everything fully drawn, no animation ── */
      if (prefersReduced) {
        gsap.set([headingRef.current, ...cards], { opacity: 1, y: 0 });
        cardDrawables.forEach((drawables) =>
          drawables.forEach(showDrawableInstant),
        );
        return;
      }

      gsap.set(headingRef.current, { opacity: 0, y: 24 });
      gsap.set(cards, { opacity: 0, y: 36 });
      /* Hide ALL drawables of every card up front (incl. all 3 cubes /
         all 3 knots before any of them start revealing). */
      cardDrawables.forEach((drawables) => drawables.forEach(hideDrawable));

      /* ── Build a timeline that draws ONE drawable: stroke(s) first,
         fill fades in once the stroke finishes, accents pop in last. ── */
      function buildDrawableRevealTimeline(drawable) {
        const tl = gsap.timeline();
        const strokes = strokesOf(drawable);
        const fills = fillsOf(drawable);
        const accents = accentsOf(drawable);

        if (strokes.length) {
          tl.to(strokes, {
            strokeDashoffset: 0,
            duration: 2.85,
            ease: "power2.inOut",
            stagger: 0.08,
          });
        }
        if (fills.length) {
          tl.to(
            fills,
            { opacity: 1, duration: 0.35, ease: "power1.out" },
            strokes.length ? "-=0.25" : 0,
          );
        }
        if (accents.length) {
          tl.to(
            accents,
            {
              opacity: 1,
              scale: 1,
              duration: 0.3,
              ease: "back.out(2)",
              stagger: 0.02,
            },
            "-=0.1",
          );
        }
        return tl;
      }

      /* ── Build a timeline that undraws ONE drawable (reverse of above),
         then redraws it — used by the infinite loop. ── */
      function buildDrawableLoopTimeline(drawable) {
        const tl = gsap.timeline();
        const strokes = strokesOf(drawable);
        const fills = fillsOf(drawable);
        const accents = accentsOf(drawable);

        /* undraw: accents out, fill out, then line retracts */
        if (accents.length) {
          tl.to(accents, {
            opacity: 0,
            scale: 0,
            duration: 0.2,
            ease: "power1.in",
            stagger: 0.015,
          });
        }
        if (fills.length) {
          tl.to(
            fills,
            { opacity: 0, duration: 0.25, ease: "power1.in" },
            accents.length ? "-=0.1" : 0,
          );
        }
        if (strokes.length) {
          tl.to(
            strokes,
            {
              strokeDashoffset: (i, el) => el.getTotalLength(),
              duration: 2.6,
              ease: "power1.in",
              stagger: 0.05,
            },
            fills.length ? "-=0.05" : 0,
          );
        }

        /* brief hold while fully hidden */
        tl.to({}, { duration: 0.25 });

        /* redraw: same as the entrance reveal */
        if (strokes.length) {
          tl.to(strokes, {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: "power2.inOut",
            stagger: 0.08,
          });
        }
        if (fills.length) {
          tl.to(
            fills,
            { opacity: 1, duration: 0.35, ease: "power1.out" },
            strokes.length ? "-=0.25" : 0,
          );
        }
        if (accents.length) {
          tl.to(
            accents,
            {
              opacity: 1,
              scale: 1,
              duration: 0.3,
              ease: "back.out(2)",
              stagger: 0.02,
            },
            "-=0.1",
          );
        }

        return tl;
      }

      /* ═══════════════════════════════════════════════════════
         PHASE 1 — entrance (scroll-triggered, plays once)
         ═══════════════════════════════════════════════════════ */
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
        onComplete: startLoop,
      });

      entranceTl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      cards.forEach((card, i) => {
        entranceTl.to(
          card,
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "+=0.15",
        );

        const marks = card.querySelectorAll("[data-corner-mark]");
        if (marks.length) {
          entranceTl.to(
            marks,
            { opacity: 1, duration: 0.5, ease: "power2.out" },
            "<0.1",
          );
        }

        /* This card's drawable(s) reveal one after another — for
           Sketch/AI all 3 are already hidden (set above), and this
           loop reveals cube/knot 0, then 1, then 2, in sequence. */
        cardDrawables[i].forEach((drawable) => {
          entranceTl.add(buildDrawableRevealTimeline(drawable), "<0.15");
        });
      });

      /* ═══════════════════════════════════════════════════════
         PHASE 2 — infinite loop: undraw → redraw, one card
         (and within it, one drawable) at a time, forever, in
         the same 2D → 3D → Sketch → AI order.
         ═══════════════════════════════════════════════════════ */
      function startLoop() {
        loopTimeline = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });

        cards.forEach((_, i) => {
          cardDrawables[i].forEach((drawable) => {
            loopTimeline.add(buildDrawableLoopTimeline(drawable), "+=0.4");
          });
        });
      }
    }, sectionRef);

    return () => {
      if (loopTimeline) loopTimeline.kill();
      ctx.revert();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
