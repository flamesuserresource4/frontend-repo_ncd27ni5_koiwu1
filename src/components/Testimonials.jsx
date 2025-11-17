import React from 'react'
import { motion } from 'framer-motion'

const data = [
  {
    quote: 'They executed flawlessly and pushed our brand into a new category. The bar is higher now.',
    author: 'Maya Chen',
    role: 'VP Product, Vector Finance',
  },
  {
    quote: 'Velocity without compromise. The team shipped in weeks what others scoped for months.',
    author: 'Liam Patel',
    role: 'Head of Digital, Nimbus Health',
  },
  {
    quote: 'World-class craft and delightful motion. We felt like one integrated team.',
    author: 'Elena Rossi',
    role: 'Founder, Quantum Labs',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-[#0b0c0f] py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-2xl font-semibold text-white/90 sm:text-3xl">What partners say</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {data.map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-sm text-white/80">“{t.quote}”</p>
              <footer className="mt-4 text-xs text-white/60">
                <span className="font-medium text-white/80">{t.author}</span> — {t.role}
              </footer>
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(400px_circle_at_20%_0%,rgba(14,165,233,0.12),transparent)]" />
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
