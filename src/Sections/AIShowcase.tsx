import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Layers, Cpu, Database, Workflow, BarChart3, ShieldCheck } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  {
    icon: Layers,
    title: 'Full-Stack Web Development',
    desc: 'Membangun aplikasi web modern yang cepat, interaktif, dan responsif dari sisi tampilan hingga manajemen database backend.',
    badge: 'Production',
  },
  {
    icon: Cpu,
    title: 'Visual & UI/UX Design',
    desc: 'Merancang antarmuka bersih dan pengalaman pengguna yang nyaman, didukung aset grafis vektor presisi tinggi.',
    badge: 'Creative',
  },
  {
    icon: Database,
    title: 'Database Architecture',
    desc: 'Perancangan struktur data yang rapi dan aman untuk memastikan performa aplikasi tetap stabil dan minim celah *error*.',
    badge: 'Optimized',
  },
  {
    icon: Workflow,
    title: 'Workflow & Low-Code Automation',
    desc: 'Membuat sistem otomatisasi proses bisnis (seperti manajemen stok gudang) agar operasional jadi cepat dan efisien.',
    badge: 'Practical',
  },
  {
    icon: BarChart3,
    title: 'Data & Inventory Management',
    desc: 'Sistem pencatatan terpusat secara *real-time* untuk memantau arus barang masuk, keluar, dan laporan finansial.',
    badge: 'Live',
  },
  {
    icon: ShieldCheck,
    title: 'Print & Production Pipeline',
    desc: 'Menyiapkan berkas digital siap cetak berstandar tinggi (CorelDRAW & Photoshop) untuk kebutuhan produksi fisik / konveksi.',
    badge: 'Specialized',
  },
]

export default function AIShowcase() {
  const sectionRef = useRef<HTMLElement>(null)

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
    <section id="ai-showcase" className="section" ref={sectionRef} aria-label="Keahlian & Layanan">
      <div className="container">
        <div className="reveal" style={{ marginBottom: 16 }}>
          <span className="eyebrow">Keahlian Utama</span>
        </div>
        <div className="section-header-inner reveal" style={{ marginBottom: 0 }}>
          <h2 className="display-lg" style={{ maxWidth: 640 }}>
            Solusi digital fungsional, dirancang tuntas.
          </h2>
          <p className="body-lg" style={{ maxWidth: 340 }}>
            Menggabungkan logika pemrograman modern dan ketelitian desain visual untuk menyelesaikan masalah nyata.
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