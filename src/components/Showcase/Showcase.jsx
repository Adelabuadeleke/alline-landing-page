import React, { useRef } from 'react'
import FloorPlan from './FloorPlan.jsx'
import useShowcaseAnimation from '../../hooks/useShowcaseAnimation.js'
import styles from './Showcase.module.css'

/*
 * Showcase flow...
 * ─────────────────────────────────────────────────────────
 * Section layout (desktop, absolute-positioned "stage"):
 *
 *   [Draft in Minutes]                    [AI That Speaks Architecture]
 *               \                                  /
 *                \          FLOOR PLAN            /
 *                 \         (draws on scroll)    /
 *                  \                            /
 *   [Smart edits]                      [Collaborative design]
 *
 * See useShowcaseAnimation.js for the full animation sequence.
 */
export default function Showcase() {
  const sectionRef = useRef(null)
  const pinRef     = useRef(null)
  const svgRef     = useRef(null)
  const draftRef   = useRef(null)
  const aiRef      = useRef(null)
  const smartRef   = useRef(null)
  const collabRef  = useRef(null)

  useShowcaseAnimation({
    sectionRef,
    pinRef,
    svgRef,
    draftRef,
    aiRef,
    smartRef,
    collabRef,
  })

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="features"
      aria-label="Product features"
    >
      <div ref={pinRef} className={styles.pinWrap}>
        <div className={styles.stage}>

          {/* ── Draft in Minutes (top-left) ── */}
          <div ref={draftRef} className={`${styles.block} ${styles.draftMinutes}`}>
            <h3 className={styles.heading}>
              Draft in
              <br />
              Minutes
            </h3>
            <p className={styles.body}>
              Generate floor plans, layouts, and technical drawings from
              simple prompts — in a fraction of the time.
            </p>
          </div>

          {/* ── Floor plan illustration (center) ── */}
          <div className={styles.illustration}>
            <FloorPlan ref={svgRef} />
          </div>

          {/* ── AI That Speaks Architecture (right, upper-mid) ── */}
          <div ref={aiRef} className={`${styles.block} ${styles.aiSpeaks}`}>
            <h3 className={styles.heading}>
              AI That Speaks
              <br />
              Architecture
            </h3>
            <p className={styles.body}>
              Trained on real design workflows. It understands dimensions,
              spatial logic, and building standards.
            </p>
          </div>

          {/* ── Smart edits (left, lower-mid) ── */}
          <div ref={smartRef} className={`${styles.block} ${styles.smartEdits}`}>
            <h3 className={styles.heading}>Smart edits</h3>
            <p className={styles.body}>
              Change a brief, not your whole drawing. Smart edits propagate
              instantly across your project.
            </p>
          </div>

          {/* ── Collaborative design (bottom-right) ── */}
          <div ref={collabRef} className={`${styles.block} ${styles.collaborative}`}>
            <h3 className={styles.heading}>
              Collaborative
              <br />
              design
            </h3>
            <p className={styles.body}>
              Change a brief, not your whole drawing. Smart edits propagate
              instantly across your project.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}