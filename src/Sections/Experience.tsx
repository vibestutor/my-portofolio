import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useTranslation()

  // Timeline dipindah ke dalam untuk mengambil data terjemahan
  const TIMELINE = [
    {
      year: t('experience.jobs.gloomie_lead.year'),
      role: t('experience.jobs.gloomie_lead.role'),
      company: t('experience.jobs.gloomie_lead.company'),
      desc: t('experience.jobs.gloomie_lead.desc'),
    },
    {
      year: t('experience.jobs.gloomie_dev.year'),
      role: t('experience.jobs.gloomie_dev.role'),
      company: t('experience.jobs.gloomie_dev.company'),
      desc: t('experience.jobs.gloomie_dev.desc'),
    },
    {
      year: t('experience.jobs.smart_stock.year'),
      role: t('experience.jobs.smart_stock.role'),
      company: t('experience.jobs.smart_stock.company'),
      desc: t('experience.jobs.smart_stock.desc'),
    },
    {
      year: t('experience.jobs.alias.year'),
      role: t('experience.jobs.alias.role'),
      company: t('experience.jobs.alias.company'),
      desc: t('experience.jobs.alias.desc'),
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.timeline-item').forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.08,
            scrollTrigger: { trigger: item, start: 'top 86%', toggleActions: 'play none none none' },
          }
        )
      })
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" className="section" ref={sectionRef} aria-label={t('experience.eyebrow')}>
      <div className="container">
        <div className="reveal" style={{ marginBottom: 16 }}>
          <span className="eyebrow">{t('experience.eyebrow')}</span>
        </div>
        <h2 className="display-lg reveal" style={{ marginBottom: 0 }}>
          {t('experience.headline')}
        </h2>

        <div className="timeline">
          {TIMELINE.map((item) => (
            <div key={item.role + item.company} className="timeline-item">
              <div className="timeline-dot" aria-hidden="true" />
              <div className="timeline-year">{item.year}</div>
              <h3 className="timeline-role">{item.role}</h3>
              <div className="timeline-company">{item.company}</div>
              <p className="timeline-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}