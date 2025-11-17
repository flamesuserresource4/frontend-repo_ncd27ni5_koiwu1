import React from 'react'
import { motion } from 'framer-motion'

export default function BackgroundFX({ className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      {/* Deep atmospheric glows */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.65, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute left-[-10%] top-[-10%] h-96 w-96 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.25), transparent 60%)' }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.55, scale: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut', delay: 0.1 }}
        className="absolute bottom-[-10%] right-[-10%] h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.22), transparent 60%)' }}
      />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(1100px_circle_at_center,transparent,rgba(0,0,0,0.6))]" />
      {/* Neon grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            `linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(800px_800px_at_50%_50%,#000,transparent 70%)',
          WebkitMaskImage: 'radial-gradient(800px_800px_at_50%_50%,#000,transparent 70%)',
        }}
      />
    </div>
  )
}
