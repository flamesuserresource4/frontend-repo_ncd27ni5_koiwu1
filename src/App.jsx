import React, { useEffect } from 'react'
import Hero from './components/Hero'
import Story from './components/Story'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import Navbar from './components/Navbar'
import Testimonials from './components/Testimonials'
import Marquee from './components/Marquee'
import BackgroundFX from './components/BackgroundFX'
import CursorGlow from './components/CursorGlow'

export default function App() {
  useEffect(() => {
    // Improve hover lighting effect coordinates for service cards
    const container = document.getElementById('services')
    const cards = document.querySelectorAll('#services .group')
    const handler = (e) => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        card.style.setProperty('--x', `${x}%`)
        card.style.setProperty('--y', `${y}%`)
      })
    }
    if (container) container.addEventListener('mousemove', handler)
    return () => container && container.removeEventListener('mousemove', handler)
  }, [])

  return (
    <main className="relative min-h-screen w-full bg-[#0b0c0f]">
      <CursorGlow />
      <BackgroundFX />
      <Navbar />
      <Hero />
      <Marquee items={[
        'Product design', 'Web apps', 'Design systems', 'Motion', 'Brand', 'Ecommerce', 'Platforms', 'SaaS', 'Mobile', 'WebGL'
      ]} />
      <Story />
      <section id="services">
        <Services />
      </section>
      <Portfolio />
      <Testimonials />
      <Contact />
      <footer className="bg-[#0b0c0f] py-10 text-center text-xs text-white/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-3 flex items-center justify-center gap-2 text-white/70">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-sky-400" />
            Limitless — Design & Engineering
          </div>
          © {new Date().getFullYear()} Limitless. All rights reserved.
        </div>
      </footer>
    </main>
  )
}
