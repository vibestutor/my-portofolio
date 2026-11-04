import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Globe, Truck, Layers, CheckCircle2, ShoppingBag, Video, Tag } from 'lucide-react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Impor Navbar dan Footer utama portofulumu agar konsisten
import Navbar from '../components/Navbar'
import Footer from '../Sections/Contact'

gsap.registerPlugin(ScrollTrigger)

export default function projectwebdetail() {
  const { id } = useParams()
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Setup Smooth Scroll Lenis khusus halaman detail
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
      {/* 1. Konsisten menggunakan Navbar di bagian atas */}
      <Navbar />

      <div ref={pageRef} className="project-detail-page" style={{ padding: '8rem 2rem 5rem', color: 'var(--text)', maxWidth: '1050px', margin: '0 auto' }}>
        
        {/* Tombol Navigasi Kembali */}
        <Link to="/" className="anim-reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', textDecoration: 'none', marginBottom: '2.5rem', fontWeight: 500 }}>
          <ArrowLeft size={16} /> kembali ke beranda
        </Link>

        {/* Header Case Study */}
        <div className="anim-reveal" style={{ marginBottom: '3rem' }}>
          <span className="eyebrow" style={{ color: 'var(--accent)', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '2px', display: 'block', marginBottom: '12px' }}>
            full-stack case study & architecture ({id})
          </span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', letterSpacing: '-0.02em', marginBottom: '16px', lineHeight: '1.1' }}>
            Gloomie Sunday Apparel — Direct-to-Consumer (D2C) E-Commerce & Web App Ecosystem
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.15rem', lineHeight: '1.7', maxWidth: '850px' }}>
            Platform toko online independen berkinerja tinggi yang menggabungkan fitur interaktif setara Shopee & TikTok Seller Center, arsitektur *checkout* ganda instan, serta integrasi admin logistik & analitik terpusat.
          </p>
        </div>

        {/* 1. HERO SHOWCASE SCREENSHOT */}
        <div className="anim-reveal detail-hero-wrapper" style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)', marginBottom: '4rem', background: 'var(--card)' }}>
          <div style={{ overflow: 'hidden', width: '100%', maxHeight: '520px' }}>
            <img 
              src="/images/gloomie-ecommerce-cover.webp" 
              alt="Gloomie Sunday Store Front Showcase" 
              className="detail-hero-img"
              style={{ width: '100%', height: '120%', objectFit: 'cover', display: 'block', willChange: 'transform' }} 
            />
          </div>
          <div style={{ padding: '1.5rem 2rem', background: 'var(--card)', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '13px', color: 'var(--muted)', display: 'block' }}>Status Platform</span>
              <strong style={{ color: 'var(--text)' }}>Production Live — D2C Online Store & Enterprise Seller Admin</strong>
            </div>
            <a 
              href="https://gloomiesundayapparel.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'var(--accent)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}
            >
              kunjungi live website <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* SECTION 1: PILAR FRONTEND & INTERACTION SHOWCASE */}
        <section className="anim-reveal" style={{ background: 'var(--card)', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Video style={{ color: 'var(--accent)' }} size={24} /> 1. Dynamic Video Hero & Collection Controller
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--muted)', marginBottom: '2rem' }}>
            <div>
              <h4 style={{ color: 'var(--text)', fontSize: '1.1rem', marginBottom: '4px' }}>Video Hero Slider & Article Controller</h4>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                Slider 5 video sinematik artikel fashion (Pitstop, Raised by Hope, Flowtrack). Tombol <strong>Shop Now</strong> dan <strong>Campaign</strong> bekerja dinamis mengikuti video artikel yang aktif, langsung mengarahkan pembeli ke koleksi spesifik.
              </p>
            </div>

            <div>
              <h4 style={{ color: 'var(--text)', fontSize: '1.1rem', marginBottom: '4px' }}>Interactive Notch Header & 3D Logo</h4>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                Header terinspirasi Notch iPhone 12. Saat di-scroll, teks brand berubah mulus menjadi logo Gloomie 3D interaktif yang berputar.
              </p>
            </div>
          </div>

          {/* SCREENSHOT SLOT SECTION 1 */}
          <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', background: '#111' }}>
            <img 
              src="/images/gloomie-ecommerce-video-hero.webp" 
              alt="Gloomie Sunday Video Hero & Collection Controller" 
              style={{ width: '100%', height: 'auto', display: 'block' }} 
            />
            <div style={{ padding: '12px 16px', fontSize: '12px', color: 'var(--muted)', background: 'rgba(0,0,0,0.4)' }}>
              Visual Showcase: Dynamic Video Hero Slider, Article Controller Buttons, & Notch Header.
            </div>
          </div>
        </section>

        {/* SECTION 2: PILAR SHOPPING EXPERIENCE & PROMO ENGINE */}
        <section className="anim-reveal" style={{ background: 'var(--card)', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Tag style={{ color: 'var(--accent)' }} size={24} /> 2. Weekly Drop Flash Sale & Auto-Play Video Reviews
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text)' }}>Weekly Drop Flash Sale</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Section khusus promo mingguan dengan header visual, banner interaktif, dan penanda harga dicoret (misal: 400k menjadi 200k) untuk meningkatkan keputusan beli instan.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text)' }}>Music-Card Customer Reviews</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Slider testimoni berformat video potret layaknya pemutar musik yang dapat digeser dan otomatis berputar (*auto-play*) saat pertama kali memasuki viewport scroll.
              </p>
            </div>
          </div>

          {/* SCREENSHOT SLOT SECTION 2 */}
          <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', background: '#111' }}>
            <img 
              src="/images/gloomie-ecommerce-cust-review.webp" 
              alt="Gloomie Sunday Weekly Drops & Video Reviews Showcase" 
              style={{ width: '100%', height: 'auto', display: 'block' }} 
            />
            <div style={{ padding: '12px 16px', fontSize: '12px', color: 'var(--muted)', background: 'rgba(0,0,0,0.4)' }}>
              Visual Showcase: Weekly Drop Campaign, Diskon Harga Coret, & Auto-Play Video Customer Reviews.
            </div>
          </div>
        </section>

        {/* SECTION 3: PILAR DUAL-FLOW CHECKOUT UX */}
        <section className="anim-reveal" style={{ background: 'var(--card)', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag style={{ color: 'var(--accent)' }} size={24} /> 3. High-Conversion Dual Checkout Engine
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            Menghilangkan friksi alur transaksi untuk mencegah pembeli membatalkan niat belanja (*cart abandonment*):
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--text)' }}>Express "Buy Now" Direct Flow</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Pembeli 1 artikel bisa langsung klik *Buy Now* dari halaman produk untuk melompat langsung ke pembayaran tanpa masuk halaman keranjang.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--text)' }}>Traditional Cart & Address Vault</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Mendukung *guest checkout* tanpa paksaan login, serta fitur *Address Vault* bagi user terdaftar agar tidak perlu mengetik ulang form alamat.
              </p>
            </div>
          </div>

          {/* SCREENSHOT SLOT SECTION 3 */}
          <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', background: '#111' }}>
            <img 
              src="/images/gloomie-ecommerce-cover.webp" 
              alt="Gloomie Sunday Dual-Flow Checkout & Cart Showcase" 
              style={{ width: '100%', height: 'auto', display: 'block' }} 
            />
            <div style={{ padding: '12px 16px', fontSize: '12px', color: 'var(--muted)', background: 'rgba(0,0,0,0.4)' }}>
              Visual Showcase: Express Buy Now Flow, Dynamic Cart Manager, & Guest/Registered Checkout.
            </div>
          </div>
        </section>

        {/* SECTION 4: PILAR GEOLOCATION & LOGISTICS ARCHITECTURE */}
        <section className="anim-reveal" style={{ background: 'var(--card)', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Globe style={{ color: 'var(--accent)' }} size={24} /> 4. Auto-Geolocation & Hybrid Logistics Engine
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <Globe style={{ color: 'var(--accent)', marginBottom: '1rem' }} size={24} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text)' }}>Auto Currency & Language</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Deteksi otomatis lokasi visitor (misal: Jepang/China) lalu mengonversi harga ke JPY/CNY dan bahasa setempat secara instan, plus switcher manual via sidebar.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <Truck style={{ color: 'var(--accent)', marginBottom: '1rem' }} size={24} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text)' }}>Biteship API & Midtrans</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Otomasi ongkir ekspedisi domestik (J&T dll.) & penanganan pengiriman internasional via POS, didukung payment gateway lengkap (QRIS, Bank, Visa/Mastercard).
              </p>
            </div>
          </div>

          {/* SCREENSHOT SLOT SECTION 4 */}
          <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', background: '#111' }}>
            <img 
              src="/images/gloomie-ecommerce-checkout.webp" 
              alt="Gloomie Sunday Geolocation & Logistics Showcase" 
              style={{ width: '100%', height: 'auto', display: 'block' }} 
            />
            <div style={{ padding: '12px 16px', fontSize: '12px', color: 'var(--muted)', background: 'rgba(0,0,0,0.4)' }}>
              Visual Showcase: Auto-Currency Switching, Multi-Language Sidebar, & Biteship Logistics Integration.
            </div>
          </div>
        </section>

        {/* SECTION 5: PILAR ENTERPRISE SELLER ADMIN CENTER */}
        <section className="anim-reveal" style={{ background: 'var(--card)', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Layers style={{ color: 'var(--accent)' }} size={24} /> 5. Enterprise Seller Admin Center
          </h2>
          
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            Panel kelola mandiri yang dirancang setara Dasbor Operasional Shopee/TikTok Seller Center:
          </p>

          <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', background: '#111', marginBottom: '2rem' }}>
            <img 
              src="/images/gloomie-ecommerce-dashboard.webp" 
              alt="Enterprise Seller Admin Center Dashboard" 
              style={{ width: '100%', height: 'auto', display: 'block' }} 
            />
            <div style={{ padding: '12px 16px', fontSize: '12px', color: 'var(--muted)', background: 'rgba(0,0,0,0.4)' }}>
              Visual Showcase: Dashboard Admin, Request Auto-Pickup Kurir, & Suite Integrasi GA4 Looker Studio & Pixel Analytics.
            </div>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--muted)' }}>
            <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <CheckCircle2 style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} size={18} />
              <div><strong style={{ color: 'var(--text)' }}>1-Click Auto-Pickup Courier:</strong> Begitu pesanan diterima, 1 klik akan otomatis memanggil kurir menjemput paket ke gudang.</div>
            </li>
            <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <CheckCircle2 style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} size={18} />
              <div><strong style={{ color: 'var(--text)' }}>Tracking Resi & Live Order Status:</strong> Halaman khusus pembeli dan admin untuk memantau perjalanan paket dari diproses hingga sampai ke tujuan.</div>
            </li>
            <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <CheckCircle2 style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} size={18} />
              <div><strong style={{ color: 'var(--text)' }}>Analytics & Cloudflare Security Suite:</strong> Terintegrasi dengan GA4 Looker Studio, Meta & TikTok Pixel, serta Cloudflare Anti-Bot.</div>
            </li>
          </ul>
        </section>

        {/* FOOTER CTA */}
        <div className="anim-reveal" style={{ textAlign: 'center', padding: '3.5rem 2rem', background: 'var(--card)', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '12px' }}>tertarik membangun platform e-commerce / web app serupa?</h3>
          <p style={{ color: 'var(--muted)', marginBottom: '1.5rem', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
            mari diskusikan bagaimana saya dapat membantu Anda membangun sistem aplikasi web berkinerja tinggi.
          </p>
          <Link to="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', background: 'var(--accent)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
            kembali ke beranda
          </Link>
        </div>

      </div>

      {/* 2. Konsisten menggunakan Footer di bagian bawah */}
      <Footer />
    </>
  )
}