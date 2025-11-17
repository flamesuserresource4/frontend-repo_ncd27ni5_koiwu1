import React from 'react'
import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import Particles from './Particles'

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0b0c0f] text-white">
      {/* Spline Background Cover */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/BWzdo650n-g-M9RS/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Subtle overlay to match brand palette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b0c0f]/40 via-[#0b0c0f]/60 to-[#0b0c0f]" />

      {/* Particle layer */}
      <Particles className="pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center px-6 pt-28 pb-20 text-center md:pt-36">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
        >
          Design & Development Without Limits
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
          className="mt-5 max-w-2xl text-base text-gray-300 sm:text-lg"
        >
          Limitless blends strategy, design, and engineering to craft digital products that move brands forward.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.25 }}
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#story"
            className="rounded-full bg-[#0ea5e9] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
          >
            Explore the Work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:border-white/40 hover:text-white"
          >
            Start a Project
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <div className="flex items-center gap-2 text-xs text-white/70">
            <div className="h-6 w-[1px] bg-gradient-to-b from-transparent via-white/50 to-transparent animate-pulse" />
            <span>Scroll to explore</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
