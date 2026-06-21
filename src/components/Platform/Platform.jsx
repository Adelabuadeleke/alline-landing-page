import React, { useRef } from 'react'
import PlatformCard from './PlatformCard.jsx'
import Illustration2D from './illustrations/Illustration2D.jsx'
import Illustration3D from './illustrations/Illustration3D.jsx'
import IllustrationSketch from './illustrations/IllustrationSketch.jsx'
import IllustrationAI from './illustrations/IllustrationAI.jsx'
import usePlatformAnimation from '../../hooks/usePlatformAnimation.js'
import styles from './Platform.module.css'

/*
 * Platform
 * ─────────────────────────────────────────────────────────
 * "One platform. Every stage of design." — asymmetric 2-column
 * grid of colored feature cards. Column 1 stacks 2D Design
 * (shorter) above Sketch to CAD (taller); column 2 stacks
 * 3D Design (taller) above AI Co-Driver (shorter) — matching
 * the reference design's uneven card heights.
 *
 * Each card's `grow` prop is a flex-grow ratio within its
 * column (see Platform.module.css .column > *), which is what
 * actually produces the different heights — see PlatformCard's
 * docblock for why a uniform CSS grid can't do this.
 *
 * Each card has its own line-drawing illustration that draws
 * itself on scroll, staggered one card at a time (see
 * usePlatformAnimation.js — note it iterates cardRefs by
 * array index, so the reveal order is still 2D → 3D → Sketch
 * → AI regardless of this visual column reshuffle).
 *
 * Hover on any card thickens its illustration's strokes and
 * reveals its CAD-style vertex handles — a small "this is
 * live, precise geometry" micro-interaction (pure CSS, see
 * PlatformCard.module.css).
 */
export default function Platform() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]

  usePlatformAnimation({ sectionRef, headingRef, cardRefs })

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="platform"
      aria-label="One platform, every stage of design"
    >
      <h2 ref={headingRef} className={styles.heading}>
        One platform.
        <br />
        Every stage of design.
      </h2>

      <div className={styles.grid}>
        <div className={styles.column}>
          <PlatformCard
            ref={cardRefs[0]}
            tone="orange"
            heading={`2D Design`}
            description="Draft, Design, and annotate floor plans & layouts in a clean, professional 2D workspace built around how designers actually work."
            Illustration={Illustration2D}
            illustrationPos="br"
            grow={3}
            cornerVariant="tl-br"
            cornerColor="#F66B01"
          />

          <PlatformCard
            ref={cardRefs[2]}
            tone="green"
            heading={`Sketch to <br/> CAD`}
            description="Convert your sketch to editable drawings."
            Illustration={IllustrationSketch}
            illustrationPos="br"
            grow={4}
            // cornerVariant="tr-bl"
            cornerVariant="tr-bl"
            cornerColor="#EEB0FF"
          />
        </div>

        <div className={styles.column}>
          <PlatformCard
            ref={cardRefs[1]}
            tone="blue"
            heading={`3D Design`}
            description="Move from plans to fully realized 3D models without switching tools. Visualize spaces, structures, and elevations — all in one environment."
            Illustration={Illustration3D}
            // illustrationPos="br"
            grow={11}
            cornerVariant="tr-bl"
            cornerColor="#0180F6"
          />

          <PlatformCard
            ref={cardRefs[3]}
            tone="yellow"
            heading={`AI as Your <br/> Co-Driver`}
            description="Your AI assistant anticipates, suggests, and speeds up the tedious parts while you stay in full creative control."
            Illustration={IllustrationAI}
            illustrationPos="br"
            grow={1.5}
            cornerVariant="tl-br"
            cornerColor="#FFDE4C"
          />
        </div>
      </div>
    </section>
  )
}