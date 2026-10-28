import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const POSTS = [
  {
    id: 'p1',
    date: 'Okt 24, 2026',
    title: 'Membangun E-Commerce Fesyen yang Cepat dan Fungsional dengan Laravel',
    excerpt: 'Cerita di balik layar pembuatan platform Gloomie Sunday: bagaimana mengoptimalkan performa halaman, keranjang belanja, hingga proses checkout agar serba cepat tanpa ribet.',
    img: '/images/gloomie-ecommerce-cover.webp',
  },
  {
    id: 'p2',
    date: 'Sep 15, 2026',
    title: 'Otomasi Stok Gudang: Mengganti Pencatatan Manual dengan Sistem AppSheet',
    excerpt: 'Langkah praktis mendigitalkan alur inventaris barang masuk dan keluar untuk bisnis konveksi agar laporan keuangan serta stok selalu sinkron secara real-time.',
    img: '/images/gloomie-stock.webp',
  },
  {
    id: 'p3',
    date: 'Agu 02, 2026',
    title: 'Ketelitian File Vektor: Dari Layar CorelDRAW Menuju Produksi Cetak Fisik',
    excerpt: 'Pentingnya memahami persiapan berkas grafis secara presisi—mulai dari garis, warna, hingga format bersih—sebelum masuk ke mesin cetak pakaian.',
    img: '/images/journal-vector.webp',
  },
]

export default function Journal() {
  const sectionRef = useRef<HTMLElement>(null)

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
    <section id="journal" className="section" ref={sectionRef} aria-label="Jurnal & Catatan">
      <div className="container">
        <div className="section-header-inner reveal" style={{ marginBottom: 60 }}>
          <div>
            <span className="eyebrow" style={{ display: 'block', marginBottom: 14 }}>Jurnal</span>
            <h2 className="display-lg">Catatan & Pengalaman Teknis.</h2>
          </div>
          <a href="#contact" className="btn-ghost">
            Semua Artikel <ArrowUpRight size={14} />
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