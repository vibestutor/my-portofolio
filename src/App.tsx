import { useEffect, useState, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import './i18n'

import Cursor     from './components/Cursor'
import ScrollToTop from './components/ScrollToTop'
import PreferencesSelector from './components/PreferencesSelector'
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
import AppsheetDetail from './pages/appsheetdetail'


gsap.registerPlugin(ScrollTrigger)

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
    // Suspense menahan render UI sampai file translation.json selesai di-download
    <Suspense fallback={<div className="h-screen w-screen bg-black"></div>}>
      <Cursor />
      <ScrollToTop />

      <PreferencesSelector />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/projects/appsheet-stock" element={<AppsheetDetail />} />
      </Routes>
    </Suspense>
  )
}