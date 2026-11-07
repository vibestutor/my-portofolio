import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, Mail, Globe, FileText } from 'lucide-react'
import { useTranslation } from 'react-i18next'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useTranslation()

  // Array SOCIALS dipindah ke dalam agar bisa menggunakan t()
  const SOCIALS = [
    { 
      icon: Globe,        
      label: 'GitHub',   
      href: 'https://github.com/vibestutor',
      external: true 
    },
    { 
      icon: ExternalLink, 
      label: 'LinkedIn', 
      href: 'https://www.linkedin.com/in/muhamad-rahman-290518297/',
      external: true 
    },
    { 
      icon: Mail,         
      label: 'WhatsApp', 
      href: 'https://wa.me/6289507759244',
      external: true 
    },
    { 
      icon: FileText,     
      label: t('contact.socials.resume'), 
      href: '/cv-ats-muhamad-rahman.pdf', 
      external: true 
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* ── CONTACT ───────────────────────────────────────── */}
      <section id="contact" className="section" ref={sectionRef} aria-label={t('footer.nav.contact')}>
        <div className="contact-glow" aria-hidden="true" />
        <div className="container">
          <div className="contact-inner">
            <span className="eyebrow reveal" style={{ display: 'block', marginBottom: 28 }}>
              {t('contact.eyebrow')}
            </span>

            <h2 className="display-xl reveal" style={{ marginBottom: 24 }}>
              {t('contact.headline')}
            </h2>

            <p className="body-lg reveal" style={{ marginBottom: 48 }}>
              {t('contact.desc')}
            </p>

            <a
              href="mailto:vibesgaming33@gmail.com"
              className="contact-email reveal"
              aria-label={t('contact.email_aria')}
            >
              vibesgaming33@gmail.com
            </a>

            <div className="contact-links reveal">
              {SOCIALS.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    className="contact-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                  >
                    <Icon size={15} />
                    {s.label}
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer id="footer" aria-label="Footer">
        <div className="container">
          <div className="footer-inner">
            <span className="footer-copy">
              {t('footer.copy')}
            </span>
            <nav className="footer-links" aria-label="Footer navigation">
              <a href="#hero">{t('footer.nav.top')}</a>
              <a href="#projects">{t('footer.nav.work')}</a>
              <a href="#about">{t('footer.nav.about')}</a>
              <a href="#contact">{t('footer.nav.contact')}</a>
            </nav>
          </div>
        </div>
      </footer>
    </>
  )
}