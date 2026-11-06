import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Zap, Database, Smartphone, CheckCircle2, FileText, Cpu, DollarSign, PieChart, ShieldCheck, ExternalLink } from 'lucide-react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from '../components/Navbar'
import Footer from '../Sections/Contact'

gsap.registerPlugin(ScrollTrigger)

export default function AppsheetDetail() {
  const { id } = useParams()
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Setup Smooth Scroll Lenis khusus halaman detail dengan rumus easing yang valid
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 * Math.pow(2, -10 * t)),
    })

    lenis.on('scroll', ScrollTrigger.update)

    const rafCallback = (time: number) => { lenis.raf(time * 1000) }
    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)

    // Setup GSAP Scroll Animations
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.anim-reveal').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 50 },
          {
            opacity: 1, 
            y: 0, 
            duration: 0.9, 
            ease: 'power3.out',
            scrollTrigger: { 
              trigger: el, 
              start: 'top 85%', 
              toggleActions: 'play none none none' 
            },
          }
        )
      })

      // Parallax effect pada gambar hero
      gsap.to('.detail-hero-img', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.detail-hero-wrapper',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, pageRef)

    return () => {
      ctx.revert()
      lenis.destroy()
      gsap.ticker.remove(rafCallback)
    }
  }, [])

  return (
    <>
      <Navbar />

      <div ref={pageRef} className="project-detail-page" style={{ padding: '8rem 2rem 5rem', color: 'var(--text)', maxWidth: '1050px', margin: '0 auto' }}>
        
        {/* Tombol Navigasi Kembali */}
        <Link to="/" className="anim-reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', textDecoration: 'none', marginBottom: '2.5rem', fontWeight: 500 }}>
          <ArrowLeft size={16} /> kembali ke beranda
        </Link>

        {/* Header Case Study */}
        <div className="anim-reveal" style={{ marginBottom: '3rem' }}>
          <span className="eyebrow" style={{ color: 'var(--accent)', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '2px', display: 'block', marginBottom: '12px' }}>
            low-code enterprise automation ({id || 'f2'})
          </span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', letterSpacing: '-0.02em', marginBottom: '16px', lineHeight: '1.1' }}>
            Smart Stock Opname & Financial Asset Management System
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.15rem', lineHeight: '1.7', maxWidth: '850px' }}>
            Sistem terpadu berbasis AppSheet yang mengombinasikan otomasi stok gudang, pelacakan aset menyeluruh, pencatatan arus kas perusahaan, serta keamanan akses berbasis *role* (Staff Gudang vs Owner).
          </p>
        </div>

        {/* HERO SHOWCASE SCREENSHOT */}
        <div className="anim-reveal detail-hero-wrapper" style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)', marginBottom: '4rem', background: 'var(--card)' }}>
          <div style={{ overflow: 'hidden', width: '100%', maxHeight: '520px' }}>
            <img 
              src="/images/gloomie-stock.webp" 
              alt="Smart Stock Opname & Cashflow AppSheet Preview" 
              className="detail-hero-img"
              style={{ width: '100%', height: '120%', objectFit: 'cover', display: 'block', willChange: 'transform' }} 
            />
          </div>
          <div style={{ padding: '1.5rem 2rem', background: 'var(--card)', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '13px', color: 'var(--muted)', display: 'block' }}>Platform & Status</span>
              <strong style={{ color: 'var(--text)' }}>Google AppSheet & Cloud Database — Enterprise Ready</strong>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'rgba(255,255,255,0.05)', color: 'var(--muted)', borderRadius: '8px', fontSize: '14px', fontWeight: 500, border: '1px solid var(--border)' }}>
                Siap Digunakan
              </span>
              <a 
                href="https://www.appsheet.com/start/c817474f-f604-41d3-9328-ad4cd2532ab6?platform=desktop#appName=MRinventorymanagementDEMO-63102697&vss=H4sIAAAAAAAAA52OvQ4CIRCE32VqnoDWmGiMNhobscBjSYh3cDk49UJ4dxd_Yqt2u7PzzU7GxdF1m3Rzhjzkz7aiCRJZYTf1pCAVZsGnIbQKQmGju6e4CHUoKEfxZhNFyPw9Kv__KuAM-eSso6HmVIr5F8PnSrBQ_SgC3Zj0qaVHSfaXwpoNzRjJ7LnCj6_j0s9vvfZmHQzHWd1GKndbTHqGUQEAAA==&view=Home" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'var(--accent)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}
              >
                Cek Demo Live <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* SECTION 1: PROBLEM & SOLUTION */}
        <section className="anim-reveal" style={{ background: 'var(--card)', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Cpu style={{ color: 'var(--accent)' }} size={24} /> 1. Tantangan Operasional & Solusi Terintegrasi
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', color: 'var(--muted)' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--text)' }}>Masalah Konvensional</h3>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                Pencatatan inventaris gudang yang terpisah dari pembukuan keuangan membuat manajemen kesulitan memantau valuasi aset rill dan arus kas keluar-masuk perusahaan secara akurat.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--text)' }}>Solusi All-in-One AppSheet</h3>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                Menggabungkan manajemen stok, audit aset, dan pelacakan *cashflow* finansial dalam satu ekosistem aplikasi mobile/desktop yang terotomasi penuh.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: CORE FEATURES */}
        <section className="anim-reveal" style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Smartphone style={{ color: 'var(--accent)' }} size={24} /> 2. Fitur Utama & Multi-Role Security
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <Zap style={{ color: 'var(--accent)', marginBottom: '1rem' }} size={24} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Scan Barcode & QR Cepat</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Identifikasi produk dan aset fisik secara kilat menggunakan kamera perangkat untuk opname gudang tanpa risiko kesalahan hitung manual.
              </p>
            </div>

            <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <Database style={{ color: 'var(--accent)', marginBottom: '1rem' }} size={24} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Real-Time Inventory Sync</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Setiap pergerakan barang otomatis memperbarui database pusat detik itu juga, menjaga akurasi data stok antara fisik dan sistem.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <DollarSign style={{ color: 'var(--accent)', marginBottom: '1rem' }} size={24} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Cashflow (Uang Masuk & Keluar)</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Pencatatan arus kas operasional harian terintegrasi, memudahkan manajemen melacak pendapatan, pengeluaran, dan sisa saldo perusahaan secara transparan.
              </p>
            </div>

            <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <PieChart style={{ color: 'var(--accent)', marginBottom: '1rem' }} size={24} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Comprehensive Asset Overview</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Memantau seluruh valuasi aset perusahaan secara menyeluruh melalui dashboard analitik ringkas untuk mendukung pengambilan keputusan bisnis.
              </p>
            </div>
          </div>

          {/* FITUR KEAMANAN LOGIN ROLE */}
          <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <ShieldCheck style={{ color: 'var(--accent)', marginBottom: '1rem' }} size={24} />
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Role-Based Access Control (Staff vs Owner)</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Meskipun berada dalam satu aplikasi terpusat, sistem dilengkapi sistem login otomatis berbasis email. Staff gudang hanya dapat mengakses menu operasional stok, sementara menu laporan keuangan, *cashflow*, dan valuasi aset eksklusif hanya dapat diakses oleh Admin/Owner perusahaan.
            </p>
          </div>
        </section>

        {/* SECTION 3: WORKFLOW & BENEFITS */}
        <section className="anim-reveal" style={{ background: 'var(--card)', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText style={{ color: 'var(--accent)' }} size={24} /> 3. Keunggulan & Dampak Efisiensi Bisnis
          </h2>

          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--muted)' }}>
            <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <CheckCircle2 style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} size={18} />
              <div><strong style={{ color: 'var(--text)' }}>Kontrol Finansial & Aset Penuh:</strong> Pimpinan perusahaan dapat melihat kondisi kesehatan keuangan dan total valuasi aset kapan pun secara real-time.</div>
            </li>
            <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <CheckCircle2 style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} size={18} />
              <div><strong style={{ color: 'var(--text)' }}>Audit & Rekap Instan:</strong> Memangkas waktu opname gudang dan pencatatan kas hingga 70%, menghindari risiko kebocoran data atau selisih nominal.</div>
            </li>
            <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <CheckCircle2 style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} size={18} />
              <div><strong style={{ color: 'var(--text)' }}>Keamanan Akses Terjamin:</strong> Hak akses menu dibatasi secara otomatis berdasarkan akun login, memastikan kerahasiaan data finansial perusahaan tetap aman.</div>
            </li>
          </ul>
        </section>

        {/* FOOTER CTA */}
        <div className="anim-reveal" style={{ textAlign: 'center', padding: '3.5rem 2rem', background: 'var(--card)', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '12px' }}>tertarik mengotomasi sistem operasional & keuangan perusahaan Anda?</h3>
          <p style={{ color: 'var(--muted)', marginBottom: '1.5rem', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
            mari diskusikan pembuatan aplikasi custom berbasis low-code atau web app sesuai kebutuhan bisnis Anda.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <a 
              href="https://www.appsheet.com/start/c817474f-f604-41d3-9328-ad4cd2532ab6?platform=desktop#appName=MRinventorymanagementDEMO-63102697&vss=H4sIAAAAAAAAA52OvQ4CIRCE32VqnoDWmGiMNhobscBjSYh3cDk49UJ4dxd_Yqt2u7PzzU7GxdF1m3Rzhjzkz7aiCRJZYTf1pCAVZsGnIbQKQmGju6e4CHUoKEfxZhNFyPw9Kv__KuAM-eSso6HmVIr5F8PnSrBQ_SgC3Zj0qaVHSfaXwpoNzRjJ7LnCj6_j0s9vvfZmHQzHWd1GKndbTHqGUQEAAA==&view=Home" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'var(--accent)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}
            >
              Coba Demo AppSheet <ExternalLink size={16} />
            </a>
            <Link to="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', background: 'rgba(255,255,255,0.05)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
              kembali ke beranda
            </Link>
          </div>
        </div>

      </div>

      <Footer />
    </>
  )
}