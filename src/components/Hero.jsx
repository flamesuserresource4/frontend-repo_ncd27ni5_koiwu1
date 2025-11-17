import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import Particles from './Particles'
import MagneticButton from './MagneticButton'

export default function Hero() {
  const containerRef = useRef(null)
  const [wordIndex, setWordIndex] = useState(0)
  const [showSpline, setShowSpline] = useState(false)
  const words = ['Limitless', 'Boundless', 'Futuristic']

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const amp = Number(getComputedStyle(document.documentElement).getPropertyValue('--motion-amp') || '1')
      const cx = (x / rect.width - 0.5) * amp
      const cy = (y / rect.height - 0.5) * amp
      el.style.setProperty('--mx', String(cx))
      el.style.setProperty('--my', String(cy))
      el.style.setProperty('--px', x + 'px')
      el.style.setProperty('--py', y + 'px')
    }

    if (!reduce.matches) {
      el.addEventListener('pointermove', onMove, { passive: true })
    }
    return () => el.removeEventListener('pointermove', onMove)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % words.length), 2200)
    return () => clearInterval(id)
  }, [])

  // Performance: defer heavy Spline until first idle or intersection
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if ('requestIdleCallback' in window) {
            requestIdleCallback(() => setShowSpline(true))
          } else {
            setTimeout(() => setShowSpline(true), 200)
          }
          observer.disconnect()
        }
      })
    }, { rootMargin: '200px' })

    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-[#0b0c0f] text-white">
      {/* Spline Background Cover (deferred) */}
      <div className="absolute inset-0" aria-hidden>
        {showSpline && (
          <Spline scene="https://prod.spline.design/BWzdo650n-g-M9RS/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        )}
      </div>

      {/* Ultra glow and kinetic mask layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(600px_600px_at_var(--px,-200px)_var(--py,-200px), rgba(14,165,233,calc(var(--cursor-glow-alpha,0.18))), transparent_60%), radial-gradient(900px_900px_at_20%_10%, rgba(99,102,241,0.10), transparent_60%)',
          mixBlendMode: 'screen',
          transition: 'background-position 100ms linear',
        }}
      />

      {/* Kinetic luminance mask to intensify Spline under cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          WebkitMaskImage:
            'radial-gradient(180px_180px_at_var(--px,-200px)_var(--py,-200px), rgba(0,0,0,1), rgba(0,0,0,0.0)_60%)',
          maskImage:
            'radial-gradient(180px_180px_at_var(--px,-200px)_var(--py,-200px), rgba(0,0,0,1), rgba(0,0,0,0.0)_60%)',
          background:
            'radial-gradient(circle_at_50%_50%, rgba(255,255,255,0.35), transparent_60%)',
          mixBlendMode: 'overlay',
          opacity: 0.7,
          transition: 'mask-position 100ms linear',
        }}
      />

      {/* Particle layer */}
      <Particles className="pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center px-6 pt-28 pb-20 text-center md:pt-36">
        {/* Parallax group */}
        <motion.div
          style={{
            transform:
              'translate3d(calc(var(--mx,0)*-12px), calc(var(--my,0)*-12px), 0)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="will-change-transform"
        >
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            Design & Development
          </h1>
          <div className="relative mt-2 inline-flex items-baseline gap-3">
            <span className="text-lg uppercase tracking-widest text-white/50">Without</span>
            <div className="relative h-14 overflow-hidden sm:h-16 md:h-20">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="inline-block bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-5xl font-extrabold text-transparent sm:text-6xl md:text-7xl"
                  style={{
                    textShadow: '0 0 32px rgba(14,165,233,0.25)',
                    filter: 'drop-shadow(0_6px_24px_rgba(14,165,233,0.25))',
                  }}
                >
                  {words[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
          className="mt-6 max-w-2xl text-base text-white/80 sm:text-lg"
        >
          We blend strategy, art direction, and engineering to craft expressive, high‑performance experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.25 }}
          className="mt-9 flex flex-col items-center gap-4 sm:flex-row"
          style={{
            transform:
              'translate3d(calc(var(--mx,0)*-6px), calc(var(--my,0)*-6px), 0)'
          }}
        >
          <div className="group">
            <MagneticButton
              as="a"
              href="#story"
              className="rounded-full bg-[#0ea5e9] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_40px_-10px_rgba(14,165,233,0.6)] hover:bg-sky-400"
            >
              Explore the Work
            </MagneticButton>
          </div>
          <div className="group">
            <MagneticButton
              as="a"
              href="#contact"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur hover:border-white/40 hover:text-white"
            >
              Start a Project
            </MagneticButton>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <div className="flex items-center gap-2 text-xs text-white/70">
            <div className="h-6 w-[1px] animate-pulse bg-gradient-to-b from-transparent via-white/50 to-transparent" />
            <span>Scroll to explore</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
