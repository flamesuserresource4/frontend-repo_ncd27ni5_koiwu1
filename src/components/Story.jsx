import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const stories = [
  {
    title: 'Origins',
    text: 'We started with a conviction: great products emerge where design and engineering work as one.',
    img: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Principles',
    text: 'Clarity, velocity, and craft. We deliver momentum without sacrificing quality.',
    img: 'https://images.unsplash.com/photo-1529336953121-ad3a5f9464fd?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Today',
    text: 'A small, senior team partnering with leaders to ship category-defining experiences.',
    img: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1600&auto=format&fit=crop',
  },
]

export default function Story() {
  const sectionRef = useRef(null)
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })

  return (
    <section id="story" ref={sectionRef} className="relative w-full bg-[#0b0c0f] py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex items-end justify-between">
          <h2 className="text-2xl font-semibold text-white/90 sm:text-3xl">Our Story</h2>
          <motion.div
            aria-hidden
            className="h-1 flex-1 ml-6 rounded bg-white/10"
          >
            <motion.div
              style={{ scaleX: prefersReduced ? 0 : scrollYProgress, transformOrigin: 'left' }}
              className="h-full w-full rounded bg-gradient-to-r from-sky-500/80 via-sky-400/60 to-cyan-300/60"
            />
          </motion.div>
        </div>
      </div>

      <div className="relative">
        <div className="sticky top-0 z-10 mx-auto flex h-[50vh] max-w-7xl items-center px-6 sm:h-[60vh]">
          <motion.p
            className="max-w-2xl text-base text-white/70 sm:text-lg"
            style={{ opacity: prefersReduced ? 1 : useTransform(scrollYProgress, [0, 0.2], [1, 0.6]) }}
          >
            Built on craft, accelerated by systems. This is how we make momentum feel effortless.
          </motion.p>
        </div>

        <div className="mx-auto max-w-7xl px-6">
          <ul className="relative space-y-20">
            {stories.map((s, i) => {
              const start = i * (1 / stories.length)
              const end = (i + 0.9) * (1 / stories.length)
              const y = prefersReduced ? 0 : useTransform(scrollYProgress, [start, end], [40, -40])
              const o = prefersReduced ? 1 : useTransform(scrollYProgress, [start, start + 0.08], [0, 1])
              const scale = prefersReduced ? 1 : useTransform(scrollYProgress, [start, end], [0.98, 1])

              return (
                <motion.li
                  key={i}
                  style={{ y, opacity: o, scale }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm"
                >
                  <div className="grid grid-cols-1 gap-0 sm:grid-cols-12">
                    <div className="relative sm:col-span-7">
                      <img
                        src={s.img}
                        alt={s.title}
                        loading="lazy"
                        decoding="async"
                        className="h-72 w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.03] sm:h-full"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0b0c0f] via-transparent to-transparent" />
                    </div>
                    <div className="relative p-6 sm:col-span-5 sm:p-10">
                      <div className="absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgba(14,165,233,0.15), transparent 40%)' }} />
                      <h3 className="text-xl font-semibold sm:text-2xl">{s.title}</h3>
                      <p className="mt-3 text-sm text-white/80 sm:text-base">{s.text}</p>
                    </div>
                  </div>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
