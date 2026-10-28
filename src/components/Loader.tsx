import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const rootRef  = useRef<HTMLDivElement>(null)
  const fillRef  = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)
  const wordRef  = useRef<HTMLDivElement>(null)
  const numRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Fade in wordmark + counter
    tl.to([wordRef.current, numRef.current], {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    })

    // Count 0 → 100, fill bar
    tl.to({ val: 0 }, {
      val: 100,
      duration: 2.2,
      ease: 'power1.inOut',
      onUpdate() {
        const v = Math.round((this as any).targets()[0].val)
        if (countRef.current) countRef.current.textContent = String(v).padStart(3, '0')
        if (fillRef.current)  fillRef.current.style.width = `${v}%`
      },
    }, '<')

    // Exit
    tl.to([wordRef.current, numRef.current], {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
    }, '+=0.2')

    tl.to(rootRef.current, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.9,
      ease: 'power3.inOut',
      onComplete,
    }, '-=0.1')

    return () => { tl.kill() }
  }, [onComplete])

  return (
    <div 
      id="loader" 
      ref={rootRef} 
      style={{ 
        clipPath: 'inset(0 0 0% 0)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100svh', // Menggunakan svh agar pas di layar HP (aman dari nabrak address bar browser)
        zIndex: 10000,
        background: 'var(--bg)',
        overflow: 'hidden',
        padding: '0 24px', // Mencegah konten mentok ke tepi layar HP
        boxSizing: 'border-box'
      }}
    >
      <div 
        className="loader-wordmark" 
        ref={wordRef}
        style={{ textAlign: 'center', width: '100%' }}
      >
        Muhamad Rahman
      </div>

      <div 
        className="loader-bar-track"
        style={{ margin: '24px 0' }} // Memberikan jarak aman atas-bawah
      >
        <div className="loader-bar-fill" ref={fillRef} />
      </div>

      <div 
        className="loader-count" 
        ref={numRef}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <span ref={countRef}>000</span>
        <span style={{ marginLeft: 4, color: 'var(--muted)', fontSize: 10 }}>%</span>
      </div>
    </div>
  )
}