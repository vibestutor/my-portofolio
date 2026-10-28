import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TIMELINE = [
  {
    year: '2026 – Present',
    role: 'Full-Stack Developer & E-Commerce Lead',
    company: 'Gloomie Sunday Apparel, Tasikmalaya',
    desc: 'Mengelola pengembangan aplikasi e-commerce secara penuh menggunakan Laravel dan Vite, sekaligus merancang alur produksi digital dan aset visual untuk kebutuhan operasional harian.',
  },
  {
    year: '2021 – 2026',
    role: 'Full-Stack & Web Developer',
    company: 'Gloomie Sunday Apparel (Fase Pengembangan Awal)',
    desc: 'Merintis arsitektur backend, manajemen database, dan integrasi antarmuka web untuk membangun fondasi toko online dan sistem manajemen produk.',
  },
  {
    year: '2021 – Present',
    role: 'Logistics & Systems Automation Specialist',
    company: 'Smart Stock Opname Project',
    desc: 'Membangun dan mengembangkan sistem otomatisasi inventaris gudang berbasis low-code/AppSheet yang terintegrasi secara real-time untuk memangkas kesalahan hitung manual.',
  },
  {
    year: '2020 – Present',
    role: 'IT & Operations Support',
    company: 'Alias Fashion, Tasikmalaya',
    desc: 'Menangani infrastruktur sistem operasional harian, manajemen data inventaris, dan tata kelola teknologi pendukung untuk kelancaran bisnis.',
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)

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
    <section id="experience" className="section" ref={sectionRef} aria-label="Jalur Pengalaman">
      <div className="container">
        <div className="reveal" style={{ marginBottom: 16 }}>
          <span className="eyebrow">Pengalaman Kerja</span>
        </div>
        <h2 className="display-lg reveal" style={{ marginBottom: 0 }}>
          Lima tahun, terus berkembang.
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