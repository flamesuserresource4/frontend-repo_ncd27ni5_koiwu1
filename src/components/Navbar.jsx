import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function Navbar({ theme = 'ultra', onToggleTheme = () => {} }) {
  const items = [
    { href: '#story', label: 'Story' },
    { href: '#services', label: 'Services' },
    { href: '#portfolio', label: 'Work' },
    { href: '#contact', label: 'Contact' },
  ]

  const themeLabel = theme === 'ultra' ? 'Ultra‑Futuristic' : 'Minimal‑Lux'

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="pointer-events-auto fixed top-0 z-50 w-full"
    >
      <div className="mx-auto mt-4 max-w-7xl px-6">
        <div className="flex items-center justify-between rounded-full border border-white/10 bg-[#0b0c0f]/60 px-4 py-2 backdrop-blur">
          <a href="#" className="flex items-center gap-2 text-sm font-semibold text-white/90">
            <span className="inline-block h-2 w-2 rounded-full bg-sky-400 ring-4 ring-sky-400/20" />
            Limitless
          </a>
          <nav className="hidden items-center gap-6 sm:flex">
            {items.map((it) => (
              <a key={it.href} href={it.href} className="text-xs text-white/70 transition hover:text-white">
                {it.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleTheme}
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-white/80 outline-none transition hover:border-white/20 hover:text-white focus-visible:ring-2 focus-visible:ring-sky-400/70"
              aria-pressed={theme === 'ultra'}
              aria-label={`Toggle motion theme. Current: ${themeLabel}`}
            >
              <Sparkles className="h-3.5 w-3.5 text-sky-300" aria-hidden />
              <span className="hidden sm:inline">{themeLabel}</span>
              <span className="sm:hidden">{theme === 'ultra' ? 'Ultra' : 'Lux'}</span>
            </button>
            <a
              href="#contact"
              className="rounded-full bg-gradient-to-r from-sky-600 to-cyan-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm shadow-sky-500/20 hover:shadow-sky-500/30"
            >
              Start
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
