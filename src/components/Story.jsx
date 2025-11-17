import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

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
  const ref = useRef(null)
  const { scrollXProgress } = useScroll({ container: ref })
  const opacity = useTransform(scrollXProgress, [0, 1], [1, 0.9])

  return (
    <section id="story" className="relative w-full bg-[#0b0c0f] py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-8 text-2xl font-semibold text-white/90 sm:text-3xl">Our Story</h2>
      </div>
      <motion.div
        ref={ref}
        style={{ opacity }}
        className="no-scrollbar mx-auto flex max-w-7xl snap-x snap-mandatory gap-6 overflow-x-auto px-6"
      >
        {stories.map((s, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="group relative h-[60vh] w-4/5 min-w-[85%] snap-center overflow-hidden rounded-2xl bg-zinc-900/60 ring-1 ring-white/10 sm:min-w-[70%] md:min-w-[55%]"
          >
            <img src={s.img} alt={s.title} className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0f] via-transparent to-transparent" />
            <div className="absolute bottom-0 p-6">
              <h3 className="text-xl font-semibold sm:text-2xl">{s.title}</h3>
              <p className="mt-2 max-w-xl text-sm text-white/80 sm:text-base">{s.text}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
