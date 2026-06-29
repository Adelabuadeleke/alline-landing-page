import React, { useRef, useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei'
import AllineLogo3D from './AllineLogo3D.jsx'
import styles from './HeroCanvas.module.css'

/*
 * HeroCanvas
 * Props:
 *   startOrbit — passed through to AllineLogo3D as cameraState='2',
 *                which fires the one-shot overhead→isometric orbit.
 *                After the orbit the camera holds still.
 */
export default function HeroCanvas({ startOrbit = false }) {
  const [isHovered, setIsHovered] = useState(false)
  const overlayRef    = useRef(null)
  const revealBorderRef = useRef(null)
  const canvasWrapRef = useRef(null)
  const cursorRef = useRef(null)


  const HALF = 110 

  const handleMouseMove = useCallback((e) => {
     if (!startOrbit || !canvasWrapRef.current) return

      const rect = canvasWrapRef.current.getBoundingClientRect()
      const cx = e.clientX - rect.left
      const cy = e.clientY - rect.top
      const half = HALF

      // clip-path on the overlay (the image cutout)
      if (overlayRef.current) {
        const top    = Math.max(0, cy - half)
        const left   = Math.max(0, cx - half)
        const bottom = Math.max(0, rect.height - cy - half)
        const right  = Math.max(0, rect.width  - cx - half)
        overlayRef.current.style.clipPath =
          `inset(${top}px ${right}px ${bottom}px ${left}px)`
      }

      // blue border square that tracks the cursor — positioned in fixed coords
      // so it's never clipped by overflow:hidden on the canvas wrapper
      if (revealBorderRef.current) {
        revealBorderRef.current.style.left   = `${e.clientX - half}px`
        revealBorderRef.current.style.top    = `${e.clientY - half}px`
        revealBorderRef.current.style.width  = `${half * 2}px`
        revealBorderRef.current.style.height = `${half * 2}px`
        revealBorderRef.current.style.opacity = '1'
      }
  }, [startOrbit])

  const handleMouseEnter = useCallback(() => {
    if (startOrbit) setIsHovered(true)
  }, [startOrbit])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    if (overlayRef.current)
      overlayRef.current.style.clipPath = 'inset(0% 50% 100% 50%)'  // fully hidden
    if (revealBorderRef.current)
      revealBorderRef.current.style.opacity = '0'
  }, [])

  return (
    <div className={styles.hero}>
      <div
        ref={canvasWrapRef}
        className={styles.canvasWrap}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-hidden="true"
      >
        <Canvas
          className={styles.canvas}
          gl={{ antialias: true, alpha: true }}
          camera={{ fov: 38, near: 0.01, far: 200 }}
          shadows
          dpr={[1, 2]}
        >
          <AdaptiveDpr pixelated />
          <ambientLight intensity={0.8} />
          <directionalLight position={[-6, 12, 8]} intensity={1.4} castShadow
            shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
          <directionalLight position={[8, -4, 4]} intensity={0.4} color="#ddeeff" />
          <directionalLight position={[0, -8, -6]} intensity={0.2} color="#fff8ee" />
          <AllineLogo3D
            cameraState={startOrbit ? '2' : '1'}
            isHovered={isHovered}
          />
        </Canvas>

        <div
          ref={overlayRef}
          // className={`${styles.photoOverlay} ${startOrbit ? styles.photoOverlayActive : ''}`}
          className={`${styles.photoOverlay} ${startOrbit ? styles.photoOverlayActive : ''}`}
          aria-hidden="true"
        >
          <img src="/hero-building.png" alt="" className={styles.photoImg} draggable={false} />
        </div>

        {/* {startOrbit && (
          <p className={styles.hoverHint} aria-hidden="true">hover to reveal</p>
        )} */}

        {startOrbit && (
          <></>
        //  <div
        //    ref={cursorRef}
        //    style={{
        //      position: 'fixed',
        //      width: '24px',
        //      height: '24px',
        //      border: '2px solid #0081F3',
        //      pointerEvents: 'none',
        //      transform: 'translate(-50%, -50%)',
        //      zIndex: 9999,
        //      transition: 'opacity 0.2s',
        //      opacity: isHovered ? 1 : 0,
        //    }}
        //    aria-hidden="true"
        //  />
       )}

       {startOrbit && (
          <div
            ref={revealBorderRef}
            style={{
              position: 'fixed',
              border: '2px solid #0081F3',
              pointerEvents: 'none',
              zIndex: 9999,
              opacity: 0,
              transition: 'opacity 0.2s ease',
            }}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  )
}