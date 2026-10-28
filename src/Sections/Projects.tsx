import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const FEATURED = [
  {
    id: 'f1',
    category: 'Full-Stack E-Commerce & Retail App',
    title: 'Gloomie Sunday — Online Store & Web App',
    desc: 'Platform toko online serba cepat yang bikin proses pilih produk, keranjang, sampai checkout jadi mulus banget tanpa ribet.',
    img: '/images/gloomie-ecommerce-cover.webp',
  },
  {
    id: 'f2',
    category: 'Logistics Automation & Low-Code System',
    title: 'Smart Stock Opname — Otomasi Stok Gudang Tanpa Pusing',
    desc: 'Sistem pengecekan inventaris gudang cerdas berbasis otomatisasi untuk menghilangkan kesalahan hitung manual dan bikin laporan jadi instan.',
    img: '/images/gloomie-stock.webp',
  },
]

const LIST_PROJECTS = [
  { 
    num: '001', 
    title: 'Gloomie Interactive E-Commerce Experience', 
    tags: ['Laravel', 'GSAP', 'Lenis', 'Vite'],
    url: 'https://gloomiesundayapparel.com',
    actionText: 'Kunjungi Website'
  },
  { 
    num: '002', 
    title: 'Vector Artwork & Apparel Print Prep', 
    tags: ['CorelDRAW', 'Photoshop', 'Vector Graphic', 'Print Production'],
    url: '/designs',
    actionText: 'Lihat Galeri'
  },
  { 
    num: '003', 
    title: 'Smart Stock Opname & Warehouse Logistics', 
    tags: ['AppSheet', 'Automation', 'Inventory'],
    url: 'https://www.appsheet.com/demo...',
    actionText: 'Cek Demo'
  },
  { 
    num: '004', 
    title: 'Interactive 3D Web Product Preview', 
    tags: ['Three.js', 'GLTFLoader', 'JavaScript'],
    url: '#',
    actionText: 'Segera Hadir'
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)

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

  return (
    <section id="projects" className="section" ref={sectionRef} aria-label="Featured Projects">
      <div className="container">
        <div className="section-header-inner reveal" style={{ marginBottom: 60 }}>
          <div>
            <span className="eyebrow" style={{ display: 'block', marginBottom: 14 }}>Karya Pilihan</span>
            <h2 className="display-lg">Aplikasi siap pakai yang langsung menyelesaikan masalah.</h2>
          </div>
          <a href="#contact" className="btn-ghost">
            Semua Proyek <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Featured grid */}
        <div className="project-featured reveal">
          {FEATURED.map((p) => (
            <article key={p.id} className="project-card" role="article" aria-label={p.title}>
              <img src={p.img} alt={p.title} loading="lazy" />
              <div className="project-card-overlay">
                <div className="project-card-category">{p.category}</div>
                <div className="project-card-title">{p.title}</div>
                <div className="project-card-desc">{p.desc}</div>
              </div>
            </article>
          ))}
        </div>

        {/* List */}
        <ul className="projects-list" role="list" style={{ marginTop: 2 }}>
          {LIST_PROJECTS.map((p) => {
            const isExternal = p.url.startsWith('http')
            const hasValidUrl = p.url && p.url !== '#'

            return (
              <li key={p.num}>
                <a 
                  href={hasValidUrl ? p.url : undefined}
                  target={isExternal ? '_blank' : '_self'}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="project-item" 
                  role="button" 
                  tabIndex={0} 
                  aria-label={p.title}
                  onClick={(e) => {
                    if (!hasValidUrl) {
                      e.preventDefault()
                      alert('Proyek ini sedang dalam tahap dokumentasi.')
                    }
                  }}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}
                >
                  <span className="project-num">{p.num}</span>
                  <div className="project-info">
                    <span className="project-title">{p.title}</span>
                    <div className="project-tags">
                      {p.tags.map((t) => (
                        <span key={t} className="project-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Bagian Arrow & Hover Text */}
                  <div className="project-action-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
                    <span className="project-action-text" style={{ fontSize: '0.85rem', opacity: 0, transition: 'opacity 0.3s ease, transform 0.3s ease', transform: 'translateX(10px)' }}>
                      {p.actionText}
                    </span>
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

      {/* CSS Tambahan khusus untuk animasi teks saat hover */}
      <style>{`
        .project-item:hover .project-action-text {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
      `}</style>
    </section>
  )
}