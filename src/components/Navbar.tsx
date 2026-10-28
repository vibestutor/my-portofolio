import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const NAV_LINKS = [
  { label: 'Work',       href: '#projects'   },
  { label: 'About',      href: '#about'       },
  { label: 'Journal',    href: '#journal'     },
  { label: 'Experience', href: '#experience'  },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Entrance
    gsap.fromTo(
      navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    )

    // Scroll class
    const handler = () => {
      if (!navRef.current) return
      navRef.current.classList.toggle('scrolled', window.scrollY > 60)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav id="navbar" ref={navRef} role="navigation" aria-label="Main navigation">
      <a href="/" className="nav-logo flex items-center">
        <img 
          src="/logo/logo-mr.svg" 
          alt="Muhamad Rahman Logo" 
          className="h-7 w-auto object-contain" 
        />
      </a>
      <ul className="nav-links" role="list">
        {NAV_LINKS.map((l) => (
          <li key={l.href}>
            <a href={l.href} onClick={(e) => scrollTo(e, l.href)}>{l.label}</a>
          </li>
        ))}
      </ul>
      <a
        href="#contact"
        className="nav-cta"
        onClick={(e) => scrollTo(e, '#contact')}
        aria-label="Get in touch"
      >
        Contact
      </a>
    </nav>
  )
}
