import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useHeroAnimation
 * ─────────────────────────────────────────────────────────
 * Orchestrates the full State 1 entrance animation sequence:
 *
 *   0.0s  SVG outer path draws (stroke-dashoffset → 0)
 *   0.3s  SVG inner path draws (offset start)
 *   1.2s  Grid fades in
 *   1.6s  Headline slides up + fades in
 *   2.0s  Description slides up + fades in
 *   2.3s  CTA form slides up + fades in
 *
 * All timings use GSAP power2.out / power3.out easing.
 * Fully respects prefers-reduced-motion.
 *
 * Returns: { gridOpacity } — reactive value for the grid component
 */
export default function useHeroAnimation({
  svgRef,
  gridRef,
  headlineRef,
  descriptionRef,
  formRef,
}) {
  const prefersReduced = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  )

  useEffect(() => {
    /* ── No-animation path ── */
    if (prefersReduced.current) {
      gsap.set(
        [
          svgRef?.current,
          gridRef?.current,
          headlineRef?.current,
          descriptionRef?.current,
          formRef?.current,
        ].filter(Boolean),
        { opacity: 1, y: 0 }
      )

      /* Make paths visible immediately */
      if (svgRef?.current) {
        svgRef.current
          .querySelectorAll('[data-logo-path]')
          .forEach((path) => {
            path.style.strokeDashoffset = '0'
          })
      }
      return
    }

    /* ── Measure path lengths ── */
    const svgEl = svgRef?.current
    if (!svgEl) return

    const outerPath = svgEl.querySelector('[data-logo-path="outer"]')
    const innerPath = svgEl.querySelector('[data-logo-path="inner"]')

    function initPath(path) {
      if (!path) return 0
      try {
        const len = path.getTotalLength()
        path.style.strokeDasharray  = len
        path.style.strokeDashoffset = len
        return len
      } catch {
        path.style.strokeDasharray  = 3200
        path.style.strokeDashoffset = 3200
        return 3200
      }
    }

    const outerLen = initPath(outerPath)
    const innerLen = initPath(innerPath)

    /* ── Set initial hidden states ── */
    gsap.set(svgEl, { opacity: 0 })
    gsap.set(
      [
        gridRef?.current,
        headlineRef?.current,
        descriptionRef?.current,
        formRef?.current,
      ].filter(Boolean),
      { opacity: 0, y: 20 }
    )

    /* ── Main timeline ── */
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl
      /* Reveal SVG container */
      .to(svgEl, { opacity: 1, duration: 0.2 })

      /* Draw outer path */
      .to(
        outerPath,
        { strokeDashoffset: 0, duration: 1.55, ease: 'power2.inOut' },
        '<'
      )

      /* Draw inner path (slight offset — blueprint drafting feel) */
      .to(
        innerPath,
        { strokeDashoffset: 0, duration: 1.3, ease: 'power2.inOut' },
        '-=1.15'
      )

      /* Grid fades in */
      .to(
        gridRef?.current,
        { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' },
        '-=0.7'
      )

      /* Headline slides up */
      .to(
        headlineRef?.current,
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.5'
      )

      /* Description */
      .to(
        descriptionRef?.current,
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )

      /* CTA form */
      .to(
        formRef?.current,
        { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' },
        '-=0.35'
      )

    return () => {
      tl.kill()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /*
   * ── Future: State transition hooks ────────────────────
   *
   * transitionToWireframe() — State 1 → 2
   *   gsap.to(svgEl, { opacity: 0, duration: 0.5, onComplete: () => setMode('wireframe') })
   *   gsap.from(wireframeEl, { opacity: 0, y: 20, duration: 0.8 })
   *
   * Trigger options (configurable via HERO_CONFIG):
   *   A) Auto: setTimeout(transitionToWireframe, HERO_CONFIG.transitionDelay)
   *   B) Scroll: ScrollTrigger.create({ trigger: hero, start: 'top-=80px', onEnter: transitionToWireframe })
   *
   * transitionToRendered() — State 2 → 3
   *   Driven by hover on the .renderedContainer (see HeroVisual.jsx)
   *   The clip-path circle reveal is CSS-driven (cursor-following via JS in RenderedVersion).
   *
   * SVG morphing (State 1 → 2 deep upgrade):
   *   Use GSAP MorphSVGPlugin (Club GreenSock) or flubber.js for d-attribute interpolation.
   *   Sequence: logo flat → extrude → depth → architectural form → wireframe building.
   */
}
