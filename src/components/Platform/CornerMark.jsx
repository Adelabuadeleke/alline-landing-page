import React from 'react'
import styles from './CornerMark.module.css'

/*
 * CornerMark
 * ─────────────────────────────────────────────────────────
 * The small dashed-line + crosshair decoration sitting at
 * each card's corners in the reference design (a "print
 * registration mark" motif, reinforcing the technical/CAD
 * theme of the section).
 *
 * position: which corner — used to flip the dash directions
 * so the lines always point outward/away from the card.
 */
export default function CornerMark({ position = 'top-left' }) {
  const isTop = position.startsWith('top')
  const isLeft = position.endsWith('left')

  return (
    <svg
      className={`${styles.mark} ${styles[position]}`}
      data-corner-mark
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      aria-hidden="true"
    >
      {/* Horizontal dashed line */}
      <line
        x1={isLeft ? 0 : 34}
        y1="17"
        x2={isLeft ? 28 : 6}
        y2="17"
        className={styles.dash}
      />
      {/* Vertical dashed line */}
      <line
        x1="17"
        y1={isTop ? 0 : 34}
        x2="17"
        y2={isTop ? 28 : 6}
        className={styles.dash}
      />
      {/* Crosshair plus mark */}
      <line x1="11" y1="17" x2="23" y2="17" className={styles.cross} />
      <line x1="17" y1="11" x2="17" y2="23" className={styles.cross} />
    </svg>
  )
}