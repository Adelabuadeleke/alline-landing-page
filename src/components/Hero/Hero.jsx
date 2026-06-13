import React, { useRef, useState, useCallback } from 'react'
import HeroGrid from './HeroGrid.jsx'
import HeroVisual from './HeroVisual.jsx'
import useHeroAnimation from '../../hooks/useHeroAnimation.js'
import styles from './Hero.module.css'

/*
 * HERO_CONFIG — centralised transition settings.
 * Toggle these to change when/how state transitions trigger.
 * (Move to a context or env var for production config.)
 */
const HERO_CONFIG = {
  /*
   * visualMode controls which visual slot is shown.
   * Values: 'svg' | 'wireframe' | 'rendered'
   * In production, start at 'svg'. The animation system
   * will drive transitions based on the options below.
   */
  visualMode: 'svg',

  /*
   * autoTransition: auto-advance from State 1 → State 2 after a delay.
   * Set to true and configure transitionDelay (ms).
   */
  autoTransition: false,
  transitionDelay: 4500,

  /*
   * scrollTransition: trigger State 1 → 2 on scroll.
   * scrollThreshold: px from top of page before trigger fires.
   */
  scrollTransition: false,
  scrollThreshold: 80,
}

export default function Hero() {
  /* ── Visual mode state (drives which visual slot renders) ── */
  const [visualMode, setVisualMode] = useState(HERO_CONFIG.visualMode)

  /* ── Refs for GSAP targets ── */
  const svgRef         = useRef(null)
  const gridRef        = useRef(null)
  const headlineRef    = useRef(null)
  const descriptionRef = useRef(null)
  const formRef        = useRef(null)

  /* ── Entrance animation (State 1) ── */
  useHeroAnimation({
    svgRef,
    gridRef,
    headlineRef,
    descriptionRef,
    formRef,
  })

  /* ── Waitlist submit ── */
  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    const email = e.target.elements.email.value
    /* TODO: wire to Mailchimp / backend API */
    console.log('Waitlist:', email)
    setSubmitted(true)
  }, [])

  return (
    <section
      className={styles.hero}
      id="hero"
      aria-label="Hero section"
      data-visual-mode={visualMode}
    >

      {/*
        ── GRID BACKGROUND ──────────────────────────────────
        Full-viewport grid that fills the entire hero section.
        ref passed so GSAP can fade it in after the SVG draws.
        The grid wrapper uses position:absolute inset:0 so it
        covers every pixel regardless of hero height.
      */}
      <div ref={gridRef} className={styles.gridWrapper} style={{ opacity: 0 }}>
        <HeroGrid />
      </div>

      {/*
        ── HERO VISUAL ───────────────────────────────────────
        Swappable component. mode prop determines which version renders.
        <HeroVisual mode="svg" />       → State 1: SVG blueprint
        <HeroVisual mode="wireframe" /> → State 2: wireframe building
        <HeroVisual mode="rendered" />  → State 3: hover-reveal rendered
        <HeroVisual mode="3d" />        → Future: Three.js/R3F
      */}
      <div className={styles.visualArea}>
        <HeroVisual mode={visualMode} svgRef={svgRef} />
      </div>

      {/*
        ── HERO CONTENT ──────────────────────────────────────
        Headline, description, waitlist form.
        Each ref passed to useHeroAnimation for staggered entrance.
      */}
      <div className={styles.content}>

        <h1 ref={headlineRef} className={styles.headline}>
          AI design&nbsp;tool
          for&nbsp;<span className={styles.headlineAccent}>AEC</span>
        </h1>

        <p ref={descriptionRef} className={styles.description}>
          A professional 2D &amp; 3D design platform built for architects,
          interior designers, and building professionals — with AI working
          alongside you, not instead of you.
        </p>

        <form
          ref={formRef}
          className={styles.form}
          id="waitlist"
          onSubmit={handleSubmit}
          aria-label="Join the waitlist"
          noValidate
        >
          {submitted ? (
            <p className={styles.successMsg} role="status" aria-live="polite">
              You&apos;re on the list. We&apos;ll be in touch soon.
            </p>
          ) : (
            <>
              <label htmlFor="waitlist-email" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                id="waitlist-email"
                name="email"
                className={styles.emailInput}
                placeholder="Email address"
                required
                autoComplete="email"
                aria-required="true"
              />
              <button
                type="submit"
                className={styles.submitBtn}
                aria-label="Join the waitlist"
              >
                Join the waitlist
              </button>
            </>
          )}
        </form>

      </div>

      {/*
        ── DEV: State switcher ───────────────────────────────
        Remove this block before production.
        Lets you preview all 3 hero states during development.
      */}
      {import.meta.env.DEV && (
        <div className={styles.devSwitcher} aria-label="Dev: switch hero state">
          <span className={styles.devLabel}>State</span>
          {['svg', 'wireframe', 'rendered'].map((mode) => (
            <button
              key={mode}
              className={`${styles.devBtn} ${visualMode === mode ? styles.devBtnActive : ''}`}
              onClick={() => setVisualMode(mode)}
            >
              {mode === 'svg'       && '1 – Blueprint'}
              {mode === 'wireframe' && '2 – Wireframe'}
              {mode === 'rendered'  && '3 – Rendered'}
            </button>
          ))}
        </div>
      )}

    </section>
  )
}
