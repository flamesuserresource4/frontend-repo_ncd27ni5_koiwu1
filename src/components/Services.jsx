import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { Code, Palette, Rocket, Zap } from 'lucide-react'

const services = [
  { icon: Palette, title: 'Brand & Visual Systems', desc: 'Distinctive identities and design languages that scale.' },
  { icon: Code, title: 'Product Engineering', desc: 'Robust web apps with modern stacks and best practices.' },
  { icon: Rocket, title: 'Go-to-Market Sites', desc: 'High-performance marketing sites that convert.' },
  { icon: Zap, title: 'Motion & Interaction', desc: 'Micro-interactions that bring brands to life.' }
]

function TiltCard({ Icon, title, desc, index }) {
  const cardRef = useRef(null)
  const prefersReduced = useReducedMotion()

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const vx = useSpring(mx, { stiffness: 200, damping: 25, mass: 0.4 })
  const vy = useSpring(my, { stiffness: 200, damping: 25, mass: 0.4 })

  const rotateX = useTransform(vy, [0, 1], [8, -8])
  const rotateY = useTransform(vx, [0, 1], [-8, 8])
  const glowOpacity = useTransform(vx, [0, 1], [0.1, 0.25])

  const onMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    mx.set(x)
    my.set(y)
    cardRef.current?.style.setProperty('--mx', `${x * 100}%`)
    cardRef.current?.style.setProperty('--my', `${y * 100}%`)
  }
  const onLeave = () => {
    mx.set(0.5); my.set(0.5)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      whileHover={!prefersReduced ? { y: -6 } : undefined}
      style={!prefersReduced ? { rotateX, rotateY } : undefined}
      className="group relative origin-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 will-change-transform"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: prefersReduced ? 0 : glowOpacity,
          background: 'radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgba(14,165,233,0.25), transparent 45%)'
        }}
      />
      <Icon className="h-8 w-8 text-sky-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.35)]" />
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-white/70">{desc}</p>
      <div className="mt-6 flex items-center gap-2 text-xs text-white/50">
        <span className="h-1 w-1 rounded-full bg-sky-400" />
        {['Strategy','Design','Code'][index % 3]}
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.06) 35%, transparent 50%)' }} />
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" className="bg-[#0b0c0f] py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-2xl font-semibold text-white/90 sm:text-3xl">Services</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <TiltCard key={i} Icon={s.icon} title={s.title} desc={s.desc} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
