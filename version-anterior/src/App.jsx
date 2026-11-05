import { useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useSmoothScroll } from './motion.jsx'
import Intro from './components/Intro.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import Gallery from './components/Gallery.jsx'
import Footer from './components/Footer.jsx'
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx'

export default function App() {
  const reduced = useReducedMotion()
  const [ready, setReady] = useState(reduced)
  useSmoothScroll()

  return (
    <>
      {!ready && <Intro onDone={() => setReady(true)} />}
      <Header ready={ready} />
      <Hero ready={ready} />
      <About />
      <Marquee />
      <Services />
      <Gallery />
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
