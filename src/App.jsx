import React, { useEffect, useState } from 'react'
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
  const [theme, setTheme] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('motion-theme') : null
    return saved === 'lux' || saved === 'ultra' ? saved : 'ultra'
  })

  useEffect(() => {
    // Apply motion theme to document for global CSS vars
    const root = document.documentElement
    root.dataset.theme = theme
    if (theme === 'ultra') {
      root.style.setProperty('--glow', '0.65')
      root.style.setProperty('--grid', '0.06')
      root.style.setProperty('--cursor-glow-alpha', '0.18')
      root.style.setProperty('--motion-amp', '1')
    } else {
      root.style.setProperty('--glow', '0.35')
      root.style.setProperty('--grid', '0.02')
      root.style.setProperty('--cursor-glow-alpha', '0.10')
      root.style.setProperty('--motion-amp', '0.55')
    }
    localStorage.setItem('motion-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'ultra' ? 'lux' : 'ultra'))

  useEffect(() => {
    // Improve hover lighting effect coordinates for service cards
    const servicesContainer = document.getElementById('services')
    const serviceCards = document.querySelectorAll('#services .group')
    const servicesHandler = (e) => {
      serviceCards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        card.style.setProperty('--x', `${x}%`)
        card.style.setProperty('--y', `${y}%`)
      })
    }
    if (servicesContainer) servicesContainer.addEventListener('mousemove', servicesHandler)

    // Story spotlight coordinates for radial accent
    const storyContainer = document.getElementById('story')
    const storyItems = () => Array.from(document.querySelectorAll('#story li.group'))
    const storyHandler = (e) => {
      storyItems().forEach((item) => {
        const rect = item.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        item.style.setProperty('--mx', `${x}%`)
        item.style.setProperty('--my', `${y}%`)
      })
    }
    if (storyContainer) storyContainer.addEventListener('mousemove', storyHandler)

    return () => {
      servicesContainer && servicesContainer.removeEventListener('mousemove', servicesHandler)
      storyContainer && storyContainer.removeEventListener('mousemove', storyHandler)
    }
  }, [])

  return (
    <main className="relative min-h-screen w-full bg-[#0b0c0f]">
      <CursorGlow />
      <BackgroundFX />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
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
