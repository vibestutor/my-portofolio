import { useLayoutEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Zap, Database, Smartphone, CheckCircle2, FileText, Cpu, DollarSign, PieChart, ShieldCheck, ExternalLink } from 'lucide-react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'

import Navbar from '../components/Navbar'
import Footer from '../Sections/Contact'

gsap.registerPlugin(ScrollTrigger)

export default function AppsheetDetail() {
  const { id } = useParams()
  const pageRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  useLayoutEffect(() => {
    // Rumus easing matematika Lenis sudah diperbaiki
    const lenis = new Lenis({
      duration: 1.3,
      easing: (time: number) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
     })

    lenis.on('scroll', ScrollTrigger.update)

    const rafCallback = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)

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
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
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
          invalidateOnRefresh: true,
        },
      })
    }, pageRef)

    ScrollTrigger.refresh()

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
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
          <ArrowLeft size={16} /> {t('appsheet_detail.back_home')}
        </Link>

        {/* Header Case Study */}
        <div className="anim-reveal" style={{ marginBottom: '3rem' }}>
          <span className="eyebrow" style={{ color: 'var(--accent)', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '2px', display: 'block', marginBottom: '12px' }}>
            {t('appsheet_detail.header.eyebrow')} ({id || 'f2'})
          </span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', letterSpacing: '-0.02em', marginBottom: '16px', lineHeight: '1.1' }}>
            {t('appsheet_detail.header.title')}
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.15rem', lineHeight: '1.7', maxWidth: '850px' }}>
            {t('appsheet_detail.header.desc')}
          </p>
        </div>

        {/* HERO SHOWCASE SCREENSHOT */}
        <div className="anim-reveal detail-hero-wrapper" style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)', marginBottom: '4rem', background: 'var(--card)' }}>
          <div style={{ overflow: 'hidden', width: '100%', maxHeight: '520px' }}>
            <img 
              src="/images/gloomie-stock.webp" 
              alt="Smart Stock Opname & Cashflow AppSheet Preview" 
              className="detail-hero-img"
              style={{ width: '100%', height: '120%', objectFit: 'cover', display: 'block', willChange: 'transform', transform: 'translateZ(0)', backfaceVisibility: 'hidden', }} 
            />
          </div>
          <div style={{ padding: '1.5rem 2rem', background: 'var(--card)', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '13px', color: 'var(--muted)', display: 'block' }}>{t('appsheet_detail.hero.status_label')}</span>
              <strong style={{ color: 'var(--text)' }}>{t('appsheet_detail.hero.status_value')}</strong>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'rgba(255,255,255,0.05)', color: 'var(--muted)', borderRadius: '8px', fontSize: '14px', fontWeight: 500, border: '1px solid var(--border)' }}>
                {t('appsheet_detail.hero.badge')}
              </span>
              <a 
                href="https://www.appsheet.com/start/c817474f-f604-41d3-9328-ad4cd2532ab6?platform=desktop#appName=MRinventorymanagementDEMO-63102697&vss=H4sIAAAAAAAAA52OvQ4CIRCE32VqnoDWmGiMNhobscBjSYh3cDk49UJ4dxd_Yqt2u7PzzU7GxdF1m3Rzhjzkz7aiCRJZYTf1pCAVZsGnIbQKQmGju6e4CHUoKEfxZhNFyPw9Kv__KuAM-eSso6HmVIr5F8PnSrBQ_SgC3Zj0qaVHSfaXwpoNzRjJ7LnCj6_j0s9vvfZmHQzHWd1GKndbTHqGUQEAAA==&view=Home" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'var(--accent)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}
              >
                {t('appsheet_detail.hero.demo_btn')} <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* SECTION 1: PROBLEM & SOLUTION */}
        <section className="anim-reveal" style={{ background: 'var(--card)', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Cpu style={{ color: 'var(--accent)' }} size={24} />{t('appsheet_detail.sec1.title')}
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', color: 'var(--muted)' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--text)' }}>{t('appsheet_detail.sec1.card1_title')}</h3>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                {t('appsheet_detail.sec1.card1_desc')}
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--text)' }}>{t('appsheet_detail.sec1.card2_title')}</h3>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                {t('appsheet_detail.sec1.card2_desc')}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: CORE FEATURES */}
        <section className="anim-reveal" style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Smartphone style={{ color: 'var(--accent)' }} size={24} /> {t('appsheet_detail.sec2.title')}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <Zap style={{ color: 'var(--accent)', marginBottom: '1rem' }} size={24} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{t('appsheet_detail.sec2.card1_title')}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                {t('appsheet_detail.sec2.card1_desc')}
              </p>
            </div>

            <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <Database style={{ color: 'var(--accent)', marginBottom: '1rem' }} size={24} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{t('appsheet_detail.sec2.card2_title')}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                {t('appsheet_detail.sec2.card2_desc')}
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <DollarSign style={{ color: 'var(--accent)', marginBottom: '1rem' }} size={24} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{t('appsheet_detail.sec2.card3_title')}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                {t('appsheet_detail.sec2.card3_desc')}
              </p>
            </div>

            <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <PieChart style={{ color: 'var(--accent)', marginBottom: '1rem' }} size={24} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{t('appsheet_detail.sec2.card4_title')}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                {t('appsheet_detail.sec2.card4_desc')}
              </p>
            </div>
          </div>

          {/* FITUR KEAMANAN LOGIN ROLE */}
          <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <ShieldCheck style={{ color: 'var(--accent)', marginBottom: '1rem' }} size={24} />
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{t('appsheet_detail.sec2.card5_title')}</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              {t('appsheet_detail.sec2.card5_desc')}
            </p>
          </div>
        </section>

        {/* SECTION 3: WORKFLOW & BENEFITS */}
        <section className="anim-reveal" style={{ background: 'var(--card)', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText style={{ color: 'var(--accent)' }} size={24} /> {t('appsheet_detail.sec3.title')}
          </h2>

          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--muted)' }}>
            <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <CheckCircle2 style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} size={18} />
              <div><strong style={{ color: 'var(--text)' }}>{t('appsheet_detail.sec3.list1_title')}</strong> {t('appsheet_detail.sec3.list1_desc')}</div>
            </li>
            <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <CheckCircle2 style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} size={18} />
              <div><strong style={{ color: 'var(--text)' }}>{t('appsheet_detail.sec3.list2_title')}</strong> {t('appsheet_detail.sec3.list2_desc')}</div>
            </li>
            <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <CheckCircle2 style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} size={18} />
              <div><strong style={{ color: 'var(--text)' }}>{t('appsheet_detail.sec3.list3_title')}</strong> {t('appsheet_detail.sec3.list3_desc')}</div>
            </li>
          </ul>
        </section>

        {/* FOOTER CTA */}
        <div className="anim-reveal" style={{ textAlign: 'center', padding: '3.5rem 2rem', background: 'var(--card)', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '12px', textTransform: 'lowercase' }}>{t('appsheet_detail.cta.title')}</h3>
          <p style={{ color: 'var(--muted)', marginBottom: '1.5rem', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
            {t('appsheet_detail.cta.desc')}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <a 
              href="https://www.appsheet.com/start/c817474f-f604-41d3-9328-ad4cd2532ab6?platform=desktop#appName=MRinventorymanagementDEMO-63102697&vss=H4sIAAAAAAAAA52OvQ4CIRCE32VqnoDWmGiMNhobscBjSYh3cDk49UJ4dxd_Yqt2u7PzzU7GxdF1m3Rzhjzkz7aiCRJZYTf1pCAVZsGnIbQKQmGju6e4CHUoKEfxZhNFyPw9Kv__KuAM-eSso6HmVIr5F8PnSrBQ_SgC3Zj0qaVHSfaXwpoNzRjJ7LnCj6_j0s9vvfZmHQzHWd1GKndbTHqGUQEAAA==&view=Home" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'var(--accent)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}
            >
              {t('appsheet_detail.cta.demo_btn')} <ExternalLink size={16} />
            </a>
            <Link to="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', background: 'rgba(255,255,255,0.05)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
              {t('appsheet_detail.cta.back_btn')}
            </Link>
          </div>
        </div>

      </div>

      <Footer />
    </>
  )
}