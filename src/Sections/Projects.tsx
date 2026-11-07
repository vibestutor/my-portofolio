import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useTranslation()

  // Array dipindah ke dalam fungsi komponen agar bisa menggunakan hook t()
  const FEATURED = [
    {
      id: 'f1',
      category: t('projects.featured.f1.category'),
      title: t('projects.featured.f1.title'),
      desc: t('projects.featured.f1.desc'),
      img: '/images/gloomie-ecommerce-cover.webp',
      detailUrl: '/projects/gloomie-sunday',
      actionText: t('projects.featured.f1.action')
    },
    {
      id: 'f2',
      category: t('projects.featured.f2.category'),
      title: t('projects.featured.f2.title'),
      desc: t('projects.featured.f2.desc'),
      img: '/images/gloomie-stock.webp',
      detailUrl: '/projects/appsheet-stock',
      actionText: t('projects.featured.f2.action')
    },
  ]

  const LIST_PROJECTS = [
    { 
      num: '001', 
      title: t('projects.list.l1.title'), 
      tags: ['Laravel', 'GSAP', 'Lenis', 'Vite'],
      url: 'https://gloomiesundayapparel.com',
      actionText: t('projects.list.l1.action')
    },
    { 
      num: '002', 
      title: t('projects.list.l2.title'), 
      tags: ['CorelDRAW', 'Photoshop', 'Vector Graphic', 'Print Production'],
      url: '/designs',
      actionText: t('projects.list.l2.action')
    },
    { 
      num: '003', 
      title: t('projects.list.l3.title'), 
      tags: ['AppSheet', 'Automation', 'Inventory'],
      url: 'https://www.appsheet.com/start/c817474f-f604-41d3-9328-ad4cd2532ab6?platform=desktop#appName=MRinventorymanagementDEMO-63102697&vss=H4sIAAAAAAAAA52OvQ4CIRCE32VqnoDWmGiMNhobscBjSYh3cDk49UJ4dxd_Yqt2u7PzzU7GxdF1m3Rzhjzkz7aiCRJZYTf1pCAVZsGnIbQKQmGju6e4CHUoKEfxZhNFyPw9Kv__KuAM-eSso6HmVIr5F8PnSrBQ_SgC3Zj0qaVHSfaXwpoNzRjJ7LnCj6_j0s9vvfZmHQzHWd1GKndbTHqGUQEAAA==&view=Home',
      actionText: t('projects.list.l3.action')
    },
    { 
      num: '004', 
      title: t('projects.list.l4.title'), 
      tags: ['Three.js', 'GLTFLoader', 'JavaScript'],
      url: '#',
      actionText: t('projects.list.l4.action')
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
          }
        )
      })

      // Stagger list items
      gsap.fromTo('.project-item',
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: { trigger: '.projects-list', start: 'top 82%', toggleActions: 'play none none none' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    if (!url || url === '#') {
      e.preventDefault()
      // Teks alert diambil dari JSON agar sesuai bahasa
      alert(t('projects.alert_dev'))
    }
  }

  return (
    <section id="projects" className="section" ref={sectionRef} aria-label={t('projects.eyebrow')}>
      <div className="container">
        <div className="section-header-inner reveal" style={{ marginBottom: 60 }}>
          <div>
            <span className="eyebrow" style={{ display: 'block', marginBottom: 14 }}>
              {t('projects.eyebrow')}
            </span>
            <h2 className="display-lg">{t('projects.headline')}</h2>
          </div>
          <a href="#contact" className="btn-ghost">
            {t('projects.button')} <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Featured Grid (Menggunakan <Link> untuk masuk ke halaman detail internal) */}
        <div className="project-featured reveal">
          {FEATURED.map((p) => {
            const isValidDetail = p.detailUrl && p.detailUrl !== '#'
            
            return (
              <Link
                key={p.id}
                to={isValidDetail ? p.detailUrl : '#'}
                className="project-card"
                onClick={(e) => handleLinkClick(e, p.detailUrl)}
              >
                <img src={p.img} alt={p.title} loading="lazy" />
                <div className="project-card-overlay">
                  <div className="project-card-top">
                    <span className="project-card-category">{p.category}</span>
                    <div className="project-card-arrow">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                  <div>
                    <h3 className="project-card-title">{p.title}</h3>
                    <p className="project-card-desc">{p.desc}</p>
                    <span className="project-card-action">
                      {p.actionText} <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Projects List (Tetap menggunakan tag <a> untuk direct link ke live website) */}
        <ul className="projects-list" role="list" style={{ marginTop: 2 }}>
          {LIST_PROJECTS.map((p) => {
            const isExternal = p.url.startsWith('http')
            return (
              <li key={p.num}>
                <a 
                  href={p.url !== '#' ? p.url : undefined}
                  target={isExternal ? '_blank' : '_self'}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="project-item" 
                  onClick={(e) => handleLinkClick(e, p.url)}
                >
                  <span className="project-num">{p.num}</span>
                  <div className="project-info">
                    <span className="project-title">{p.title}</span>
                    <div className="project-tags">
                      {p.tags.map((t_tag) => (
                        <span key={t_tag} className="project-tag">{t_tag}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="project-action-wrapper">
                    <span className="project-action-text">{p.actionText}</span>
                    <div className="project-arrow" aria-hidden="true">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}