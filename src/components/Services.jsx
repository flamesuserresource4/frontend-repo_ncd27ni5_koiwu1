import React from 'react'
import { motion } from 'framer-motion'
import { Code, Palette, Rocket, Zap } from 'lucide-react'

const services = [
  {
    icon: Palette,
    title: 'Brand & Visual Systems',
    desc: 'Distinctive identities and design languages that scale.'
  },
  {
    icon: Code,
    title: 'Product Engineering',
    desc: 'Robust web apps with modern stacks and best practices.'
  },
  {
    icon: Rocket,
    title: 'Go-to-Market Sites',
    desc: 'High-performance marketing sites that convert.'
  },
  {
    icon: Zap,
    title: 'Motion & Interaction',
    desc: 'Micro-interactions that bring brands to life.'
  }
]

export default function Services() {
  return (
    <section id="services" className="bg-[#0b0c0f] py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-2xl font-semibold text-white/90 sm:text-3xl">Services</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6"
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(14,165,233,0.15), transparent 40%)' }} />
              <s.icon className="h-8 w-8 text-sky-400" />
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-white/70">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
