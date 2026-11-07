import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'

gsap.registerPlugin(ScrollTrigger)

const TAGS = [
  'Systems Architecture', 
  'AI Integration', 
  'Three.js', 
  'Laravel', 
  'React', 
  'Node.js', 
  'PostgreSQL', 
  'DevOps'
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useTranslation()
  const STATS = [
    { num: '5+',   label: t('about.stats.experience') },
    { num: '5',    label: t('about.stats.apps') },
    { num: '2',    label: t('about.stats.ai') },
    { num: '100%', label: t('about.stats.focus') },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="section" ref={sectionRef} aria-label="About">
      <div className="container">
        <div className="section-header reveal">
          <span className="eyebrow">{t('about.eyebrow')}</span>
        </div>

        <div className="about-grid">
          <div>
            <div className="about-tag-row reveal">
              {TAGS.map((tag) => (
                <span key={tag} className="about-tag">{tag}</span>
              ))}
            </div>

            <h2 className="display-lg reveal" style={{ marginBottom: 28 }}>
              {t('about.headline')}
            </h2>

            <p className="body-lg reveal" style={{ marginBottom: 24 }}>
              {t('about.p1')}
            </p>

            <p className="body-lg reveal">
              {t('about.p2')}
            </p>

            <div className="about-stat-grid reveal">
              {STATS.map((s) => (
                <div key={s.label} className="about-stat">
                  <div className="about-stat-num">{s.num}</div>
                  <div className="about-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-image-wrap reveal">
            <img
              src="/images/profile.webp"
              alt="Muhamad Rahman — Senior Fullstack Engineer"
              loading="lazy"
            />
            <div className="about-image-overlay" aria-hidden="true" />
            <div className="about-image-label">{t('about.image_label')}</div>
          </div>
        </div>
      </div>
    </section>
  )
}