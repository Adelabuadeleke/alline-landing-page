import React, { forwardRef } from 'react'
import CornerMark from './CornerMark.jsx'
import styles from './PlatformCard.module.css'

/*
 * PlatformCard
 * ─────────────────────────────────────────────────────────
 * One card in the "One platform. Every stage of design."
 * grid. Renders:
 *   - heading + description (top-left, on a colored background)
 *   - the card's illustration (via Illustration prop, a
 *     forwardRef'd SVG component) positioned per `illustrationPos`
 *   - 4 corner registration marks
 *
 * Hover micro-interaction (see PlatformCard.module.css):
 *   On hover, the illustration's [data-draw] paths get a
 *   slightly thicker stroke + brightness lift, and the card
 *   lifts with a subtle shadow/translateY — all pure CSS,
 *   no JS needed for the hover state itself.
 *
 * `grow` — flex-grow ratio for this card within its parent
 * .column (set in Platform.module.css). Higher = taller
 * relative to its column sibling. This is what produces the
 * asymmetric card heights (e.g. Sketch to CAD taller than
 * 2D Design, 3D Design taller than AI Co-Driver).
 *
 * The outer ref (forwarded here) attaches to the card's root
 * <div>, which usePlatformAnimation uses both to animate the
 * card's own entrance AND to query its [data-draw] children
 * for the per-card illustration stroke-draw sequence.
 */
const PlatformCard = forwardRef(function PlatformCard(
  {
    tone, 
    heading, 
    description, 
    Illustration, 
    illustrationPos = 'br', 
    illustrationClassName, 
    grow = 1,
    cornerVariant = 'tl-br',
    cornerColor,
  },
  ref
) {
   const [cornerA, cornerB] =
    cornerVariant === 'tr-bl'
      ? ['top-right', 'bottom-left']
      : ['top-left', 'bottom-right']
  return (
    <div
      ref={ref}
      className={`${styles.card} ${styles[tone]}`}
      style={{ flexGrow: grow }}
      data-platform-card
    >
      <CornerMark position={cornerA} color={cornerColor} />
      <CornerMark position={cornerB} color={cornerColor} />
      {/* <CornerMark position="top-left" />
      <CornerMark position="top-right" />
      <CornerMark position="bottom-left" />
      <CornerMark position="bottom-right" /> */}

      <div className={styles.textBlock}>
        <h3 className={styles.heading} dangerouslySetInnerHTML={{__html: heading}}></h3>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={`${styles.illustrationSlot} ${styles[illustrationPos]}`}>
        <Illustration
          className={`${styles.illustrationSvg} ${illustrationClassName || ''}`}
          data-illustration
        />
      </div>
    </div>
  )
})

export default PlatformCard