import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Cursor     from './components/Cursor'
import Loader     from './components/Loader'
import Navbar     from './components/Navbar'
import Hero       from './Sections/Hero'
import About      from './Sections/About'
import Projects   from './Sections/Projects'
import AIShowcase from './Sections/AIShowcase'
import Experience from './Sections/Experience'
import TechStack  from './Sections/TechStack'
import Journal    from './Sections/Journal'
import Contact    from './Sections/Contact'

import ProjectDetail from './pages/projectwebdetail'

gsap.registerPlugin(ScrollTrigger)

// Komponen penampung untuk Home Page
function Home() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!loaded) return

    const lenis = new Lenis({
      duration: 1.3,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    lenis.on('scroll', ScrollTrigger.update)

    const rafCallback = (time: number) => { lenis.raf(time * 1000) }
    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(rafCallback)
    }
  }, [loaded])

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      <Navbar />
      <main id="main-content" aria-label="Portfolio content">
        <Hero />
        <About />
        <Projects />
        <AIShowcase />
        <Experience />
        <TechStack />
        <Journal />
        <Contact />
      </main>
    </>
  )
}

export default function App() {
  return (
    <>
      <Cursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
    </>
  )
}