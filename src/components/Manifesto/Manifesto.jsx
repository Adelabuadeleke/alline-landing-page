import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BuildingIllustration from './BuildingIllustration.jsx'
import styles from './Manifesto.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function Manifesto() {
  const sectionRef   = useRef(null)
  const para1Ref     = useRef(null)
  const para2Ref     = useRef(null)
  const para3Ref     = useRef(null)
  const logoRef      = useRef(null)
  const buildingRef  = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {

      if (prefersReduced) {
        gsap.set(
          [para1Ref.current, para2Ref.current, para3Ref.current, logoRef.current],
          { opacity: 1, y: 0 }
        )
        return
      }

      const textEls = [
        para1Ref.current,
        para2Ref.current,
        para3Ref.current,
        logoRef.current,
      ].filter(Boolean)

      textEls.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // if (buildingRef.current) {
      //   gsap.to(buildingRef.current, {
      //     y: -60,
      //     ease: 'none',
      //     scrollTrigger: {
      //       trigger: sectionRef.current,
      //       start: 'top bottom',
      //       end: 'bottom top',
      //       scrub: 1.2,
      //     },
      //   })
      // }

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

        <p ref={para1Ref} className={styles.para}>
          FOR DECADES,{' '}
          <span className={styles.accent}>BUILDING PROFESSIONALS</span>{' '}
          HAVE PAID A FORTUNE TO USE SOFTWARE THAT WAS DESIGNED BEFORE
          AI &amp; THE INTERNET WAS MAINSTREAM.
        </p>

        <p ref={para2Ref} className={styles.para}>
          SOFTWARE THAT&apos;S COMPLEX BY ACCIDENT,
          NOT BY NECESSITY.
        </p>

        <p ref={para3Ref} className={styles.para}>
          WE ASKED A{' '}
          <span className={styles.accent}>SIMPLE QUESTION:</span>
          <br />
          WHAT WOULD A DESIGN TOOL LOOK LIKE IF IT WAS BUILT
          TODAY, FOR THE PEOPLE ACTUALLY USING IT?
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