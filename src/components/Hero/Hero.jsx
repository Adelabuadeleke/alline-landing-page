import React, { useRef, useState, useCallback } from 'react'
import HeroGrid from './HeroGrid.jsx'
import HeroVisual from './HeroVisual.jsx'
import Nav from '../Nav/Nav.jsx'
import useHeroAnimation from '../../hooks/useHeroAnimation.js'
import styles from './Hero.module.css'

export default function Hero() {
  const [visualMode] = useState('svg')

  /* svgDone flips true when useHeroAnimation fires onSVGComplete */
  const [svgDone, setSvgDone] = useState(false)

  const svgRef         = useRef(null)
  const gridRef        = useRef(null)
  const headlineRef    = useRef(null)
  const descriptionRef = useRef(null)
  const formRef        = useRef(null)

  const handleSVGComplete = useCallback(() => setSvgDone(true), [])

  useHeroAnimation({
    svgRef,
    gridRef,
    headlineRef,
    descriptionRef,
    formRef,
    onSVGComplete: handleSVGComplete,
  })

  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    console.log('Waitlist:', e.target.elements.email.value)
    setSubmitted(true)
  }, [])

  return (
    <section className={styles.hero} id="hero" aria-label="Hero section" data-visual-mode={visualMode}>
      <Nav />

      <div className={styles.visualArea}>
        <div ref={gridRef} className={styles.gridWrapper} style={{ opacity: 0 }}>
          <HeroGrid />
        </div>
        <HeroVisual mode={visualMode} svgRef={svgRef} svgDone={svgDone} />
      </div>

      <div className={styles.content}>
        <h1 ref={headlineRef} className={styles.headline}>
          AI design&nbsp;tool for&nbsp;AEC
        </h1>
        <p ref={descriptionRef} className={styles.description}>
          A professional 2D &amp; 3D design platform built for architects,
          interior designers, and building professionals - with AI working
          alongside you, not instead of you.
        </p>
        <form ref={formRef} className={styles.form} id="waitlist" onSubmit={handleSubmit}
          aria-label="Join the waitlist" noValidate>
          {submitted ? (
            <p className={styles.successMsg} role="status" aria-live="polite">
              You&apos;re on the list. We&apos;ll be in touch soon.
            </p>
          ) : (
            <>
              <label htmlFor="waitlist-email" className="sr-only">Email address</label>
              <input type="email" id="waitlist-email" name="email" className={styles.emailInput}
                placeholder="Email address" required autoComplete="email" aria-required="true" />
              <button type="submit" className={styles.submitBtn} aria-label="Join the waitlist">
                Join the waitlist
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  )
}