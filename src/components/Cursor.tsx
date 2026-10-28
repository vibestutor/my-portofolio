import { useEffect } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  useEffect(() => {
    const dot  = document.getElementById('cursor')
    const ring = document.getElementById('cursor-ring')
    if (!dot || !ring) return

    let dotX = 0, dotY = 0
    let ringX = 0, ringY = 0

    const onMove = (e: MouseEvent) => {
      dotX = e.clientX
      dotY = e.clientY
    }
    window.addEventListener('mousemove', onMove)

    const tick = () => {
      ringX += (dotX - ringX) * 0.12
      ringY += (dotY - ringY) * 0.12
      dot.style.left  = `${dotX}px`
      dot.style.top   = `${dotY}px`
      ring.style.left = `${ringX}px`
      ring.style.top  = `${ringY}px`
      requestAnimationFrame(tick)
    }
    tick()

    // Hover states
    const addBig = (e: Event) => {
      if (!(e.target instanceof Element)) return
      if (e.target.matches('a, button, [data-cursor]')) {
        gsap.to(dot,  { width: 14, height: 14, background: '#a78bfa', duration: 0.3 })
        gsap.to(ring, { width: 54, height: 54, borderColor: 'rgba(139,92,246,0.8)', duration: 0.4 })
      }
    }
    const removeBig = () => {
      gsap.to(dot,  { width: 8, height: 8, background: '#8B5CF6', duration: 0.3 })
      gsap.to(ring, { width: 36, height: 36, borderColor: 'rgba(139,92,246,0.5)', duration: 0.4 })
    }

    document.addEventListener('mouseover',  addBig)
    document.addEventListener('mouseout',   removeBig)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover',  addBig)
      document.removeEventListener('mouseout',   removeBig)
    }
  }, [])

  return (
    <>
      <div id="cursor" aria-hidden="true" />
      <div id="cursor-ring" aria-hidden="true" />
    </>
  )
}
