import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

gsap.registerPlugin(ScrollTrigger)

export default function Journal() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useTranslation()

  // Data POSTS dipindah ke dalam agar bisa dipasangkan dengan t()
  const POSTS = [
    {
      id: 'p1',
      date: t('journal.posts.p1.date'),
      title: t('journal.posts.p1.title'),
      excerpt: t('journal.posts.p1.excerpt'),
      img: '/images/gloomie-ecommerce-cover.webp',
    },
    {
      id: 'p2',
      date: t('journal.posts.p2.date'),
      title: t('journal.posts.p2.title'),
      excerpt: t('journal.posts.p2.excerpt'),
      img: '/images/gloomie-stock.webp',
    },
    {
      id: 'p3',
      date: t('journal.posts.p3.date'),
      title: t('journal.posts.p3.title'),
      excerpt: t('journal.posts.p3.excerpt'),
      img: '/images/journal-vector.webp',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.journal-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: '.journal-grid', start: 'top 82%', toggleActions: 'play none none none' },
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
    <section id="journal" className="section" ref={sectionRef} aria-label={t('journal.eyebrow')}>
      <div className="container">
        <div className="section-header-inner reveal" style={{ marginBottom: 60 }}>
          <div>
            <span className="eyebrow" style={{ display: 'block', marginBottom: 14 }}>
              {t('journal.eyebrow')}
            </span>
            <h2 className="display-lg">{t('journal.headline')}</h2>
          </div>
          <a href="#contact" className="btn-ghost">
            {t('journal.button')} <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="journal-grid">
          {POSTS.map((p) => (
            <article key={p.id} className="journal-card" aria-label={p.title}>
              <div className="journal-card-img">
                <img src={p.img} alt={p.title} loading="lazy" />
              </div>
              <div className="journal-card-body">
                <div className="journal-card-date">{p.date}</div>
                <h3 className="journal-card-title">{p.title}</h3>
                <p className="journal-card-excerpt">{p.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}