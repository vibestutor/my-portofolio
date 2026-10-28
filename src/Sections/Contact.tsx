import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, Mail, Globe, FileText } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

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
    label: 'Resume (PDF)', 
    href: '/cv-muhamad-rahman.pdf', 
    external: true 
  },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)

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
      <section id="contact" className="section" ref={sectionRef} aria-label="Kontak">
        <div className="contact-glow" aria-hidden="true" />
        <div className="container">
          <div className="contact-inner">
            <span className="eyebrow reveal" style={{ display: 'block', marginBottom: 28 }}>
              Mari Bekerja Sama
            </span>

            <h2 className="display-xl reveal" style={{ marginBottom: 24 }}>
              Punya ide atau proyek menarik?
            </h2>

            <p className="body-lg reveal" style={{ marginBottom: 48 }}>
              Aku selalu terbuka untuk berdiskusi seputar pengembangan web, sistem otomatisasi bisnis, maupun kebutuhan desain grafis dan cetak. Yuk, ngobrol santai atau wujudkan proyek impianmu bersama!
            </p>

            <a
              href="mailto:vibesgaming33@gmail.com"
              className="contact-email reveal"
              aria-label="Kirim Email ke Muhamad Rahman"
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
              © 2026 Muhamad Rahman. Crafted with precision.
            </span>
            <nav className="footer-links" aria-label="Footer navigation">
              <a href="#hero">Top</a>
              <a href="#projects">Work</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>
        </div>
      </footer>
    </>
  )
}