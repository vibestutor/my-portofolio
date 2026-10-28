import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TAGS = ['Systems Architecture', 'AI Integration', 'Three.js', 'Laravel', 'React', 'Node.js', 'PostgreSQL', 'DevOps']

const STATS = [
  { num: '5+',  label: 'Tahun Pengalaman' },
  { num: '5',   label: 'Aplikasi Siap Pakai' },
  { num: '2',   label: 'Sistem Terintegrasi AI' },
  { num: '100%',label: 'Fokus Solusi Bisnis' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

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
          <span className="eyebrow">About</span>
        </div>

        <div className="about-grid">
          {/* Left column */}
          <div>
            <div className="about-tag-row reveal">
              {TAGS.map((t) => (
                <span key={t} className="about-tag">{t}</span>
              ))}
            </div>

            <h2 className="display-lg reveal" style={{ marginBottom: 28 }}>
              "Ngetik kode pake logika, ngerapihin visual pake hati."
            </h2>

            <p className="body-lg reveal" style={{ marginBottom: 24 }}>
              "Saya Muhamad Rahman — seorang Senior Fullstack Engineer yang tinggal di Tasikmalaya.
              Keahlian saya adalah membangun sistem cerdas (AI),
              antarmuka website yang sinematik/estetik,
              dan rekayasa produk digital skala besar dengan performa tinggi.
            </p>

            <p className="body-lg reveal">
              Karya-karya saya menggabungkan arsitektur backend yang kokoh dengan keindahan frontend yang ekspresif — menghasilkan produk yang tidak hanya punya sistem mesin yang kuat di dalam, tapi juga terlihat cantik di luar."
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

          {/* Right column — portrait */}
          <div className="about-image-wrap reveal">
            <img
              src="/images/profile.webp"
              alt="Muhamad Rahman — Senior Fullstack Engineer"
              loading="lazy"
            />
            <div className="about-image-overlay" aria-hidden="true" />
            <div className="about-image-label">Muhamad Rahman — Tasikmalaya, 2026</div>
          </div>
        </div>
      </div>
    </section>
  )
}
