import React, { useRef, useEffect, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BuildingIllustration from './BuildingIllustration.jsx'
import styles from './Manifesto.module.css'

gsap.registerPlugin(ScrollTrigger)

/*
 * createDelayTracker
 * ─────────────────────────────────────────────────────────
 * Returns a getDelay(index, lineCycle) function.
 *
 * When multiple lines enter the viewport "simultaneously"
 * (within WINDOW ms of each other), they form a batch.
 * Each line in the batch gets a delay equal to its position
 * within the batch × lineCycle — so they play sequentially
 * in DOM order even though their ScrollTriggers all fired
 * at the same time.
 *
 * Lines that enter the viewport on later scroll events
 * (genuinely later in time) get delay 0 — they fire
 * immediately since no earlier lines are competing.
 */
function createDelayTracker() {
  const fired  = new Map()
  const WINDOW = 120  // ms — tune up if lines still overlap

  return function getDelay(index, lineCycle) {
    const now = Date.now()

    // Count how many lower-index lines fired within the batch window
    let position = 0
    for (const [i, t] of fired.entries()) {
      if (i < index && now - t < WINDOW) {
        position++
      }
    }

    // Register this line's fire time
    fired.set(index, now)

    return position * lineCycle
  }
}

/*
 * ManifestoLine
 * ─────────────────────────────────────────────────────────
 * Each line has its own ScrollTrigger (fires when THIS line
 * enters the viewport). The delay from getDelay() ensures
 * that if multiple lines enter view simultaneously, they
 * still animate one-after-another in DOM order.
 */
function ManifestoLine({ children, className, index, getDelay }) {
  const wrapRef = useRef(null)
  const barRef  = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      gsap.set(textRef.current, { opacity: 1 })
      gsap.set(barRef.current,  { scaleX: 0 })
      return
    }

    const LINE_CYCLE = 0.76  // bar-in + bar-out duration

    gsap.set(textRef.current, { opacity: 0 })
    gsap.set(barRef.current,  { scaleX: 0, transformOrigin: 'left center' })

    const st = ScrollTrigger.create({
      trigger: wrapRef.current,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        const delay = getDelay(index, LINE_CYCLE)

        const tl = gsap.timeline({ delay })

        tl
          .to(barRef.current, {
            scaleX: 1,
            duration: 0.38,
            ease: 'power2.inOut',
            transformOrigin: 'left center',
          })
          .set(barRef.current, { transformOrigin: 'right center' })
          .to(barRef.current, {
            scaleX: 0,
            duration: 0.38,
            ease: 'power2.inOut',
          })
          .to(textRef.current, {
            opacity: 1,
            duration: 0.28,
            ease: 'power1.out',
          }, '-=0.22')
      },
    })

    return () => st.kill()
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span
      ref={wrapRef}
      className={`${styles.line} ${className || ''}`}
      data-manifesto-line
    >
      <span ref={barRef} className={styles.lineBar} aria-hidden="true" />
      <span ref={textRef} className={styles.lineText}>
        {children}
      </span>
    </span>
  )
}

export default function Manifesto() {
  const sectionRef  = useRef(null)
  const buildingRef = useRef(null)
  const logoRef     = useRef(null)

  /*
   * One shared delay tracker for all lines in this section.
   * useMemo ensures it's created once and shared across
   * all ManifestoLine instances via the getDelay prop.
   */
  const getDelay = useMemo(() => createDelayTracker(), [])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {

      if (!prefersReduced && buildingRef.current) {
        gsap.to(buildingRef.current, {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        })
      }

      if (logoRef.current) {
        gsap.fromTo(
          logoRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: logoRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="manifesto"
      aria-label="Our manifesto"
    >
      <div className={styles.content}>

        <p className={styles.para}>
          <ManifestoLine index={0} getDelay={getDelay}>FOR DECADES, <span className={styles.accent}>BUILDING</span></ManifestoLine>
          <ManifestoLine index={1} getDelay={getDelay}>
            <span className={styles.accent}>PROFESSIONALS</span> HAVE PAID A
          </ManifestoLine>
          <ManifestoLine index={2} getDelay={getDelay}> FORTUNE TO USE SOFTWARE</ManifestoLine>
          <ManifestoLine index={3} getDelay={getDelay}>THAT WAS DESIGNED BEFORE</ManifestoLine>
          <ManifestoLine index={4} getDelay={getDelay}>AI &amp; THE INTERNET WAS</ManifestoLine>
          <ManifestoLine index={5} getDelay={getDelay}>MAINSTREAM.</ManifestoLine>
        </p>

        <p className={styles.para}>
          <ManifestoLine index={6} getDelay={getDelay}>SOFTWARE THAT&apos;S COMPLEX </ManifestoLine>
          <ManifestoLine index={7} getDelay={getDelay}>BY ACCIDENT, NOT BY</ManifestoLine>
          <ManifestoLine index={8} getDelay={getDelay}>NECESSITY.</ManifestoLine>
        </p>

        <p className={styles.para}>
          <ManifestoLine index={9} getDelay={getDelay}>
            WE ASKED A <span className={styles.accent}>SIMPLE</span>
          </ManifestoLine>
          <ManifestoLine index={10} getDelay={getDelay}><span className={styles.accent}>QUESTION:</span></ManifestoLine>

          <ManifestoLine index={11} getDelay={getDelay}>WHAT WOULD A DESIGN TOOL </ManifestoLine>
          <ManifestoLine index={12} getDelay={getDelay}>LOOK LIKE IF IT WAS BUILT </ManifestoLine>
          <ManifestoLine index={13} getDelay={getDelay}>TODAY, FOR THE PEOPLE</ManifestoLine>
          <ManifestoLine index={14} getDelay={getDelay}>ACTUALLY USING IT?</ManifestoLine>
        </p>

        <div ref={logoRef} className={styles.logoMark} aria-hidden="true">
          <svg width="32" height="26" viewBox="0 0 35 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M33.7744 19.5038L29.5692 27.122C28.9574 28.2318 27.3754 28.2662 26.7143 27.1864L12.6069 4.13861C12.1347 3.36799 11.0077 3.39374 10.572 4.18369L2.97523 17.9454C2.7713 18.3168 2.77989 18.7676 3.00099 19.1303L6.7253 25.2137C7.19755 25.9844 8.32451 25.9586 8.76026 25.1687L14.4315 14.8887C14.8673 14.0966 15.9964 14.073 16.4665 14.8436L20.1736 20.8991C20.3947 21.2597 20.4055 21.7127 20.1994 22.084L17.6063 26.7829C17.192 27.5342 16.4021 28 15.5435 28H6.79614C5.64772 28 4.58302 27.4032 3.98412 26.4244L0.485193 20.7038C-0.133023 19.6927 -0.163075 18.4263 0.410062 17.3873L9.06722 1.70439C9.6468 0.652561 10.7544 0 11.9544 0H21.9403C23.0887 0 24.1534 0.596749 24.7523 1.57559L33.6971 16.1874C34.3175 17.1984 34.3454 18.4649 33.7722 19.5038H33.7744Z"
              fill="white"
            />
          </svg>
        </div>

      </div>

      <div ref={buildingRef} className={styles.buildingWrapper}>
        <BuildingIllustration />
      </div>

    </section>
  )
}