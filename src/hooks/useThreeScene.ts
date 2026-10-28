import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function useThreeScene(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setClearColor(0x000000, 0)

    // Scene + Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
    camera.position.set(0, 0, 60)

    // Particle geometry — dual-layer star field
    const COUNT_FAR  = 2400
    const COUNT_NEAR = 600

    function makeParticles(count: number, spread: number, size: number, color: number, opacity: number) {
      const geo = new THREE.BufferGeometry()
      const pos = new Float32Array(count * 3)
      for (let i = 0; i < count; i++) {
        pos[i * 3]     = (Math.random() - 0.5) * spread
        pos[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.6
        pos[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.5
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      const mat = new THREE.PointsMaterial({
        size,
        color,
        transparent: true,
        opacity,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      return new THREE.Points(geo, mat)
    }

    const starsFar  = makeParticles(COUNT_FAR,  300, 0.3, 0xffffff, 0.45)
    const starsNear = makeParticles(COUNT_NEAR, 200, 0.7, 0x8B5CF6, 0.35)

    scene.add(starsFar, starsNear)

    // Nebula plane — thin glowing fog
    const nebulaGeo = new THREE.PlaneGeometry(180, 90)
    const nebulaMat = new THREE.MeshBasicMaterial({
      color: 0x8B5CF6,
      transparent: true,
      opacity: 0.025,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const nebula = new THREE.Mesh(nebulaGeo, nebulaMat)
    nebula.position.set(0, -8, -40)
    scene.add(nebula)

    // Mouse-parallax
    let mx = 0, my = 0
    const onMouseMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    // Resize
    const onResize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // Render loop
    let t = 0
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)
      t += 0.0004

      starsFar.rotation.y  = t * 0.5 + mx * 0.015
      starsFar.rotation.x  = my * 0.008
      starsNear.rotation.y = t * 0.8 - mx * 0.02
      starsNear.rotation.x = my * 0.012

      camera.position.x += (mx * 3 - camera.position.x) * 0.03
      camera.position.y += (-my * 2 - camera.position.y) * 0.03

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [canvasRef])
}