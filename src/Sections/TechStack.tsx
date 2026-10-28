import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Code2, Database, Globe, Server, Cpu, GitBranch,
  Box, Layers, Terminal, Cloud, Lock, Zap,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const STACK = [
  { icon: Code2,     name: 'TypeScript',   type: 'Language'   },
  { icon: Server,    name: 'Laravel',      type: 'Framework'  },
  { icon: Globe,     name: 'React',        type: 'Framework'  },
  { icon: Database,  name: 'PostgreSQL',   type: 'Database'   },
  { icon: Box,       name: 'Three.js',     type: '3D / WebGL' },
  { icon: Cpu,       name: 'Python',       type: 'Language'   },
  { icon: Zap,       name: 'FastAPI',      type: 'Framework'  },
  { icon: Layers,    name: 'Redis',        type: 'Cache'      },
  { icon: Cloud,     name: 'AWS',          type: 'Cloud'      },
  { icon: Terminal,  name: 'Docker',       type: 'DevOps'     },
  { icon: GitBranch, name: 'GitHub Actions', type: 'CI/CD'   },
  { icon: Lock,      name: 'Auth0',        type: 'Identity'   },
]

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.tech-item',
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out', stagger: 0.04,
          scrollTrigger: { trigger: '.tech-grid', start: 'top 84%', toggleActions: 'play none none none' },
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
    <section id="tech-stack" className="section" ref={sectionRef} aria-label="Technology Stack">
      <div className="container">
        <div className="reveal" style={{ marginBottom: 16 }}>
          <span className="eyebrow">Tech Stack</span>
        </div>
        <h2 className="display-lg reveal">Precision tools.</h2>

        <div className="tech-grid">
          {STACK.map((t) => {
            const Icon = t.icon
            return (
              <div key={t.name} className="tech-item" aria-label={`${t.name} — ${t.type}`}>
                <div className="tech-item-icon" aria-hidden="true">
                  <Icon size={22} />
                </div>
                <span className="tech-item-name">{t.name}</span>
                <span className="tech-item-type">{t.type}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
