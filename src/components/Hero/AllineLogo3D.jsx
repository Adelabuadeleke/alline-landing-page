import React, { useRef, useEffect, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'

const CAM = {
  // state1: { pos: [0, 4, 0.3],  target: [0, 0.29, 0] },
  state1: { pos: [0, 12, 0.3],  target: [0, 0.29, 0] },
  state2: { pos: [5.5, 3.5, 5], target: [0, 0.29, 0] },

  // More zoomed-in overhead view (bigger flat logo)
//  state1: { pos: [0, 4, 0.001], target: [0, 0.29, 0] },
 // Closer isometric view (bigger 3D building)
//  state2: { pos: [2.5, 2.5, 3.5], target: [0, 0.29, 0] },
}

export default function AllineLogo3D({ cameraState = '1', isHovered = false }) {
  const { camera } = useThree()
  const groupRef     = useRef()
  const camTargetRef = useRef(new THREE.Vector3(...CAM.state1.target))
  const mouseRef     = useRef({ x: 0, y: 0 })

  const { nodes } = useGLTF('/Alline_logo_3D.glb')

  const mat1 = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#f5f5f3'), roughness: 0.9, metalness: 0.0,
  }), [])

  const mat2 = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#f0ede8'), roughness: 0.55, metalness: 0.05,
    clearcoat: 0.15, clearcoatRoughness: 0.4,
  }), [])

  /* Initial camera — overhead/flat to match where the SVG was */
  useEffect(() => {
    const [x, y, z] = CAM.state1.pos
    camera.position.set(x, y, z)
    camera.lookAt(...CAM.state1.target)
    camera.fov = 21
    camera.near = 0.01
    camera.updateProjectionMatrix()
  }, [])

  /* One-shot camera orbit when cameraState changes 1→2 */
  useEffect(() => {
    const cfg = cameraState === '2' ? CAM.state2 : CAM.state1
    gsap.to(camera.position, { x: cfg.pos[0], y: cfg.pos[1], z: cfg.pos[2], duration: 1.4, ease: 'power3.inOut' })
    gsap.to(camTargetRef.current, { x: cfg.target[0], y: cfg.target[1], z: cfg.target[2], duration: 1.4, ease: 'power3.inOut' })
    const timer = setTimeout(() => {
      if (!groupRef.current) return
      const mat = cameraState === '2' ? mat2 : mat1
      groupRef.current.traverse((obj) => { if (obj.isMesh) obj.material = mat })
    }, 700)
    return () => clearTimeout(timer)
  }, [cameraState])

  /* Per-frame: keep camera lookAt synced + hover tilt only (NO auto-rotation) */
  useFrame(() => {
    camera.lookAt(camTargetRef.current)
    if (!groupRef.current) return
    if (cameraState === '2' && isHovered) {
      groupRef.current.rotation.y += (mouseRef.current.x * 0.4 - groupRef.current.rotation.y) * 0.06
      groupRef.current.rotation.x += (mouseRef.current.y * 0.2 - groupRef.current.rotation.x) * 0.06
    } else {
      /* Lerp back to neutral when not hovered */
      groupRef.current.rotation.y += (0 - groupRef.current.rotation.y) * 0.06
      groupRef.current.rotation.x += (0 - groupRef.current.rotation.x) * 0.06
    }
  })

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth  - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const meshNodes = useMemo(() =>
    Object.values(nodes).filter((n) => n.isMesh && n.name !== 'Plane'), [nodes])

  return (
    <group ref={groupRef}>
      {meshNodes.map((node) => (
        <mesh key={node.uuid} geometry={node.geometry} material={mat1}
          position={node.position} rotation={node.rotation} scale={node.scale}
          castShadow receiveShadow />
      ))}
    </group>
  )
}

useGLTF.preload('/Alline_logo_3D.glb')