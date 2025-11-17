import React, { useEffect } from 'react'
import Hero from './components/Hero'
import Story from './components/Story'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'

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
    <main className="min-h-screen w-full bg-[#0b0c0f]">
      <Hero />
      <Story />
      <section id="services">
        <Services />
      </section>
      <Portfolio />
      <Contact />
      <footer className="bg-[#0b0c0f] py-8 text-center text-xs text-white/50">© {new Date().getFullYear()} Limitless</footer>
    </main>
  )
}
