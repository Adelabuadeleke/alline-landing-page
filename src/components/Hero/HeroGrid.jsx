import React, { useEffect, useRef } from 'react'
import styles from './HeroGrid.module.css'

/**
 * HeroGrid
 * ─────────────────────────────────────────────────────────
 * Full-viewport architectural grid background.
 * - SVG pattern tiles edge-to-edge with no gaps
 * - Small 40px cells + major 200px grid lines
 * - Parallax drift driven by mouse position (lerped)
 * - Respects prefers-reduced-motion
 */
export default function HeroGrid({ opacity = 1 }) {
  const containerRef = useRef(null)
  const rafRef       = useRef(null)
  const mouseRef     = useRef({ x: 0, y: 0 })
  const currentRef   = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const onMouseMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth  - 0.5) * 18,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      }
    }

    const tick = () => {
      const cur = currentRef.current
      const tgt = mouseRef.current
      cur.x += (tgt.x - cur.x) * 0.055
      cur.y += (tgt.y - cur.y) * 0.055

      if (containerRef.current) {
        containerRef.current.style.transform = `translate(${cur.x.toFixed(2)}px, ${cur.y.toFixed(2)}px)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    /*
     * Outer wrapper: position absolute, covers the entire hero section
     * overflow hidden on the hero section clips the parallax overshoot.
     * We extend the grid slightly beyond 100% so the ~18px parallax
     * shift never reveals a white edge.
     */
    <div className={styles.gridWrapper} aria-hidden="true">
      <div
        ref={containerRef}
        className={styles.gridInner}
        style={{ opacity }}
      >
        <svg
          className={styles.gridSvg}
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Minor grid cell: 40×40 */}
            <pattern
              id="alline-minor-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#e2e2e2"
                strokeWidth="1.53"
              />
            </pattern>

            {/* Major grid: 200×200 over minor pattern */}
            <pattern
              id="alline-major-grid"
              width="200"
              height="200"
              patternUnits="userSpaceOnUse"
            >
              <rect width="200" height="200" fill="url(#alline-minor-grid)" />
              <path
                d="M 200 0 L 0 0 0 200"
                fill="none"
                // stroke="#b0b0a8"
                stroke="#e2e2e2"
                strokeWidth="1.53"
              />
            </pattern>
          </defs>

          {/* Full-coverage rect — 110% on each axis absorbs parallax shift */}
          <rect
            x="-5%"
            y="-5%"
            width="110%"
            height="110%"
            fill="url(#alline-major-grid)"
          />
        </svg>
      </div>
    </div>
  )
}
