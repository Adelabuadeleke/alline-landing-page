import React from 'react'
import styles from './CornerMark.module.css'

/*
 * CornerMark
 * ─────────────────────────────────────────────────────────
 * Print-registration-style corner mark (matches the provided
 * Group_6.svg exactly): a long dashed horizontal line and a
 * long dashed vertical line crossing near the corner, plus a
 * short diagonal tick at the intersection.
 *
 * The source SVG is drawn for a TOP-LEFT corner (lines run
 * from the corner outward to the right/down, tick points
 * up-right). For the other 3 corners we rotate the whole
 * mark 90/180/270° with a CSS transform — same geometry,
 * just spun to face the right direction — rather than
 * hand-authoring 4 separate path sets.
 *
 * Props:
 *   position — 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
 *   color    — any valid CSS color. Defaults to currentColor,
 *              so it can also be set via the parent's `color`
 *              CSS property if you don't pass this prop.
 */
export default function CornerMark({ position = 'top-left', color }) {
  return (
    <svg
      className={`${styles.mark} ${styles[position]}`}
      data-corner-mark
      width="143"
      height="143"
      viewBox="0 0 143 143"
      fill="none"
      style={color ? { color } : undefined}
      aria-hidden="true"
    >
      {/* Horizontal dashed line (3 segments, matching source gaps) */}
      <path
        d="M143 15.75H83M0 15.75H35.75H59M62.5625 15.75H71.5H80.4375"
        className={styles.dash}
      />
      {/* Vertical dashed line (3 segments, matching source gaps) */}
      <path
        d="M15.25 143V83.5M15.25 0V35.75V57.5M15.25 59.5V80.4375"
        className={styles.dash}
      />
      {/* Diagonal tick at the crossing point */}
      <path d="M11 20.5L19.5 12" className={styles.tick} />
    </svg>
  )
}