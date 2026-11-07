import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Layers, Cpu, Database, Workflow, BarChart3, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'

gsap.registerPlugin(ScrollTrigger)

export default function AIShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useTranslation()

  // Data array dipindah ke sini agar bisa menggunakan t()
  const CARDS = [
    {
      icon: Layers,
      title: t('showcase.cards.web.title'),
      desc: t('showcase.cards.web.desc'),
      badge: t('showcase.cards.web.badge'),
    },
    {
      icon: Cpu,
      title: t('showcase.cards.design.title'),
      desc: t('showcase.cards.design.desc'),
      badge: t('showcase.cards.design.badge'),
    },
    {
      icon: Database,
      title: t('showcase.cards.db.title'),
      desc: t('showcase.cards.db.desc'),
      badge: t('showcase.cards.db.badge'),
    },
    {
      icon: Workflow,
      title: t('showcase.cards.workflow.title'),
      desc: t('showcase.cards.workflow.desc'),
      badge: t('showcase.cards.workflow.badge'),
    },
    {
      icon: BarChart3,
      title: t('showcase.cards.inventory.title'),
      desc: t('showcase.cards.inventory.desc'),
      badge: t('showcase.cards.inventory.badge'),
    },
    {
      icon: ShieldCheck,
      title: t('showcase.cards.print.title'),
      desc: t('showcase.cards.print.desc'),
      badge: t('showcase.cards.print.badge'),
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ai-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: '.ai-grid', start: 'top 82%', toggleActions: 'play none none none' },
        }
      )
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
    <section id="ai-showcase" className="section" ref={sectionRef} aria-label={t('showcase.eyebrow')}>
      <div className="container">
        <div className="reveal" style={{ marginBottom: 16 }}>
          <span className="eyebrow">{t('showcase.eyebrow')}</span>
        </div>
        <div className="section-header-inner reveal" style={{ marginBottom: 0 }}>
          <h2 className="display-lg" style={{ maxWidth: 640 }}>
            {t('showcase.headline')}
          </h2>
          <p className="body-lg" style={{ maxWidth: 340 }}>
            {t('showcase.subhead')}
          </p>
        </div>

        <div className="ai-grid">
          {CARDS.map((c) => {
            const Icon = c.icon
            return (
              <article key={c.title} className="ai-card" aria-label={c.title}>
                <div className="ai-card-icon" aria-hidden="true">
                  <Icon size={22} />
                </div>
                <h3 className="ai-card-title">{c.title}</h3>
                
                {/* Deskripsinya di-render di sini menggunakan data dari JSON */}
                <p className="ai-card-desc">{c.desc}</p>
                
                <span className="ai-card-badge">{c.badge}</span>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}