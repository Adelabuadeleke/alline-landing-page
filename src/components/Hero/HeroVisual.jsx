import React, { useRef, useEffect, forwardRef } from 'react'
import styles from './HeroVisual.module.css'

/* ═══════════════════════════════════════════════════════════
   SVGVersion — State 1
   The Alline logo drawn as architectural linework.
   Stroke-dashoffset animation is driven by the parent
   via the ref passed in (GSAP animates strokeDashoffset).
═══════════════════════════════════════════════════════════ */
export const SVGVersion = forwardRef(function SVGVersion(props, ref) {
  return (
    <svg
      ref={ref}
      className={styles.svgLogo}
      viewBox="0 0 520 429"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Alline logo – architectural line drawing"
    >
      {/*
        Two paths: outer boundary + inner contour.
        Each has its own ref so GSAP can sequence them.
        strokeDasharray / strokeDashoffset set programmatically
        in useHeroAnimation after getTotalLength().
      */}
      <path
        className={styles.logoPathOuter}
        data-logo-path="outer"
        d="M332.156 0.5V0.503906C351.22 0.675474 368.853 10.6485 378.81 26.9209L511.166 243.131L511.168 243.134L511.644 243.925L511.646 243.929C519.783 257.705 521.458 274.176 516.606 289.104H517.781L517.372 289.846L450.235 411.474L449.914 412.056L449.907 412.049C438.226 432.259 409.074 432.711 396.789 412.733L396.785 412.729L396.755 412.679L188.006 71.6367C183.618 64.4775 173.165 64.7292 169.128 72.0469L169.094 72.1094L169.092 72.1104L56.7158 275.683C54.8174 279.149 54.9066 283.331 56.9561 286.694L112.057 376.698H112.058C116.445 383.858 126.9 383.607 130.937 376.289L214.855 224.173L215.281 223.43C224.433 208.062 246.809 207.851 256.209 223.26H256.208L311.057 312.854L311.062 312.86L311.461 313.538L311.465 313.545C315.495 320.643 315.63 329.342 311.763 336.589L311.769 336.595L311.587 336.924L273.217 406.455C265.94 419.649 252.068 427.824 237 427.824H107.563C88.308 427.824 70.4528 417.818 60.4092 401.402L8.63477 316.751C-1.72832 299.803 -2.23577 278.569 7.37598 261.146L7.41016 261.083L7.41113 261.081L135.477 29.083C145.118 11.5859 163.466 0.68462 183.392 0.504883V0.5H332.156Z"
      />
      <path
        className={styles.logoPathInner}
        data-logo-path="inner"
        d="M183.896 7.5L183.068 7.50586L183.069 7.50684C165.813 7.79988 149.964 17.2984 141.608 32.4619L13.5049 264.526C5.11111 279.742 5.55108 298.292 14.6055 313.1L66.3799 397.749C75.1509 412.084 90.7442 420.824 107.563 420.824H237C249.524 420.824 261.046 414.031 267.088 403.073L305.458 333.543L305.459 333.542C308.421 328.205 308.266 321.695 305.089 316.512V316.511L250.232 226.906H250.231C243.58 216.003 227.752 216.162 221.286 227.028L220.985 227.554L137.065 379.67L137.062 379.678L136.627 379.429L137.061 379.678L136.751 380.217L136.747 380.224C130.006 391.522 113.694 391.894 106.433 380.896L106.428 380.89L106.094 380.364L106.09 380.356L50.9795 290.338L50.9785 290.337C47.6135 284.815 47.4841 277.954 50.5869 272.304V272.303L162.998 68.666C169.631 56.6409 186.786 56.2493 193.975 67.9785V67.9795L402.725 409.025C412.308 424.676 435.239 424.177 444.106 408.092L505.922 296.104H505.891L506.3 295.363C514.694 280.147 514.284 261.598 505.199 246.791V246.79L372.841 30.5752C364.207 16.4635 348.961 7.77485 332.443 7.50684V7.50586L331.652 7.5H183.896Z"
      />
    </svg>
  )
})

/* ═══════════════════════════════════════════════════════════
   WireframeVersion — State 2
   ─────────────────────────────────────────────────────────
   SLOT: Drop the isometric wireframe building SVG here.
   Match: alline_header_2.png

   Architecture notes:
   - Replace the placeholder <svg> below with the real asset.
   - Or mount a React Three Fiber canvas for the 3D version:
       import { Canvas } from '@react-three/fiber'
       <Canvas><WireframeModel /></Canvas>
   - Exposed via: <HeroVisual mode="wireframe" />
═══════════════════════════════════════════════════════════ */
export const WireframeVersion = forwardRef(function WireframeVersion(props, ref) {
  return (
    <div ref={ref} className={styles.wireframeContainer}>
      {/* ── REPLACE THIS with your isometric wireframe SVG / R3F canvas ── */}
      <svg
        viewBox="0 0 600 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.placeholderSvg}
        aria-label="Architectural wireframe building"
      >
        <text x="300" y="220" textAnchor="middle" fontFamily="Inter" fontSize="13" fill="#a0a09c">
          State 2 – Wireframe 3D
        </text>
        <text x="300" y="242" textAnchor="middle" fontFamily="Inter" fontSize="11" fill="#c0c0bc">
          Replace with alline_header_2 asset
        </text>
      </svg>
    </div>
  )
})

/* ═══════════════════════════════════════════════════════════
   RenderedVersion — State 3
   ─────────────────────────────────────────────────────────
   SLOT: Wireframe base + hover-revealed rendered photo.
   Match: alline_header_1.png (with hover reveal)

   Hover mechanic:
   - Base: wireframe SVG (same as state 2)
   - Overlay: rendered architectural photo
   - Mouse tracking drives clipPath for cursor-following reveal
   - CSS fallback: simple inset clip on :hover
   - Future: WebGL shader reveal (GLSL mask)
═══════════════════════════════════════════════════════════ */
export const RenderedVersion = forwardRef(function RenderedVersion(props, ref) {
  const overlayRef = useRef(null)
  const containerRef = useRef(null)

  /* Cursor-following clip-path reveal */
  useEffect(() => {
    const el = containerRef.current
    const overlay = overlayRef.current
    if (!el || !overlay) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1)
      const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1)
      /* Reveal a circular region around the cursor */
      overlay.style.clipPath = `circle(28% at ${x}% ${y}%)`
    }

    const onLeave = () => {
      overlay.style.clipPath = 'circle(0% at 50% 50%)'
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={(node) => {
        containerRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      }}
      className={styles.renderedContainer}
    >
      {/* ── Base layer: wireframe ── */}
      <div className={styles.renderedBase}>
        {/* REPLACE: wireframe SVG / image */}
        <svg
          viewBox="0 0 600 460"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.placeholderSvg}
          aria-hidden="true"
        >
          <text x="300" y="220" textAnchor="middle" fontFamily="Inter" fontSize="13" fill="#a0a09c">
            State 3 – Wireframe base
          </text>
          <text x="300" y="242" textAnchor="middle" fontFamily="Inter" fontSize="11" fill="#c0c0bc">
            Hover to reveal rendered preview
          </text>
        </svg>
      </div>

      {/* ── Overlay layer: rendered photo (clip-path reveal) ── */}
      <div
        ref={overlayRef}
        className={styles.renderedOverlay}
        aria-hidden="true"
      >
        {/*
          REPLACE: <img src={renderedBuilding} alt="" className={styles.renderedImg} />
          Image: alline_header_3.png or similar rendered architectural photo
        */}
        <div className={styles.renderedPlaceholder}>
          Rendered photo goes here
        </div>
      </div>
    </div>
  )
})

/* ═══════════════════════════════════════════════════════════
   HeroVisual — main export
   ─────────────────────────────────────────────────────────
   Props:
     mode: 'svg' | 'wireframe' | 'rendered' | '3d'
     svgRef: ref forwarded to SVGVersion for GSAP
   ─────────────────────────────────────────────────────────
   Future 3D mode:
     mode="3d" mounts a Three.js / R3F canvas in place of
     the SVG. The hero layout doesn't change at all.

     Example:
       case '3d':
         return <ThreeVersion ref={ref} />
═══════════════════════════════════════════════════════════ */
export default function HeroVisual({ mode = 'svg', svgRef }) {
  switch (mode) {
    case 'wireframe':
      return <WireframeVersion />
    case 'rendered':
      return <RenderedVersion />
    /*
     * Future: case '3d': return <ThreeVersion />
     */
    case 'svg':
    default:
      return <SVGVersion ref={svgRef} />
  }
}
