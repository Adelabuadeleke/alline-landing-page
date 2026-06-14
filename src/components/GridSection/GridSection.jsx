import React, { useRef } from 'react'
import DecorativeGrid from '../DecorativeGrid/DecorativeGrid.jsx'
import useDecorativeGridAnimation from '../../hooks/useDecorativeGridAnimation.js'
import styles from './GridSection.module.css'


export default function GridSection() {
  const sectionRef = useRef(null)
  const svgRef = useRef(null)

  useDecorativeGridAnimation({ sectionRef, svgRef })

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-hidden="true"
    >
      <div className={styles.inner}>
        <DecorativeGrid ref={svgRef} />
      </div>
    </section>
  )
}