import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface FeaturedProject {
  id: string
  category: string
  title: string
  desc: string
  img: string
  detailUrl: string 
  actionText: string
}

interface ListProject {
  num: string
  title: string
  tags: string[]
  url: string
  actionText: string
}

const FEATURED: FeaturedProject[] = [
  {
    id: 'f1',
    category: 'Full-Stack E-Commerce & Retail App',
    title: 'Gloomie Sunday — Online Store & Web App',
    desc: 'Platform toko online serba cepat yang bikin proses pilih produk, keranjang, sampai checkout jadi mulus banget tanpa ribet.',
    img: '/images/gloomie-ecommerce-cover.webp',
    detailUrl: '/projects/gloomie-sunday', // 
    actionText: 'Baca Case Study' //
  },
  {
    id: 'f2',
    category: 'Logistics Automation & Low-Code System',
    title: 'Smart Stock Opname — Otomasi Stok Gudang Tanpa Pusing',
    desc: 'Sistem pengecekan inventaris gudang cerdas berbasis otomatisasi untuk menghilangkan kesalahan hitung manual dan bikin laporan jadi instan.',
    img: '/images/gloomie-stock.webp',
    detailUrl: '#',
    actionText: 'Segera Hadir'
  },
]

const LIST_PROJECTS: ListProject[] = [
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

export default function projects() {
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

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    if (!url || url === '#') {
      e.preventDefault()
      alert('Proyek ini sedang dalam tahap dokumentasi/pembuatan.')
    }
  }

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
                      {p.tags.map((t) => (
                        <span key={t} className="project-tag">{t}</span>
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