import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useThreeScene } from '../hooks/useThreeScene'

export default function Hero() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const line1Ref   = useRef<HTMLSpanElement>(null)
  const line2Ref   = useRef<HTMLSpanElement>(null)
  const line3Ref   = useRef<HTMLSpanElement>(null)
  const subRef     = useRef<HTMLParagraphElement>(null)
  const badgeRef   = useRef<HTMLDivElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  
  const { t } = useTranslation()

  useThreeScene(canvasRef)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 3.2 })

    tl.fromTo(badgeRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })

    tl.fromTo(
      [line1Ref.current, line2Ref.current, line3Ref.current],
      { y: '110%' },
      { y: '0%', duration: 1, ease: 'power3.out', stagger: 0.08 },
      '-=0.2'
    )

    tl.fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')

    tl.fromTo(actionsRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
  }, [])

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" aria-label="Hero">
      <canvas ref={canvasRef} id="three-canvas" aria-hidden="true" />

      <div className="container hero-content">
        <div ref={badgeRef} className="hero-available" style={{ opacity: 0 }}>
          <span className="hero-available-dot" />
          {t('hero.badge')}
        </div>

         <div className="hero-heading display-xl">
           <span className="hero-heading-line">
            <span ref={line1Ref} style={{ display: 'block' }}>{t('hero.heading.line1')}</span>
           </span>
           <span className="hero-heading-line">
             <span ref={line2Ref} style={{ display: 'block' }}>
              <span style={{ color: 'var(--accent)' }}>{t('hero.heading.line2_highlight')}</span>{t('hero.heading.line2_suffix')}
             </span>
           </span>
         </div>

        <p ref={subRef} className="body-lg hero-sub" style={{ opacity: 0 }}>
          {t('hero.desc')}
        </p>

        <div ref={actionsRef} className="hero-actions" style={{ opacity: 0 }}>
          <a
            href="#projects"
            className="btn-primary"
            onClick={(e) => { e.preventDefault(); scrollTo('#projects') }}
          >
            {t('hero.buttons.work')} <ArrowRight size={15} />
          </a>
          <a
            href="#about"
            className="btn-ghost"
            onClick={(e) => { e.preventDefault(); scrollTo('#about') }}
          >
            {t('hero.buttons.about')} <ArrowRight size={13} />
          </a>
        </div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <span className="hero-scroll-line" />
        <span className="hero-scroll-label">{t('hero.scroll')}</span>
      </div>
    </section>
  )
}