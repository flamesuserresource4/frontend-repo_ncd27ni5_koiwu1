import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const allProjects = [
  { id: 1, title: 'Neon Commerce', tag: 'Web', img: 'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?q=80&w=1600&auto=format&fit=crop' },
  { id: 2, title: 'Aurora OS', tag: 'App', img: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=1600&auto=format&fit=crop' },
  { id: 3, title: 'Quantum Labs', tag: 'Brand', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop' },
  { id: 4, title: 'Vector Finance', tag: 'Web', img: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop' },
  { id: 5, title: 'Nimbus Health', tag: 'Brand', img: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1600&auto=format&fit=crop' },
  { id: 6, title: 'Pulse UI', tag: 'App', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop' },
]

const tags = ['All', 'Web', 'App', 'Brand']

export default function Portfolio() {
  const [filter, setFilter] = useState('All')
  const projects = useMemo(() => (filter === 'All' ? allProjects : allProjects.filter(p => p.tag === filter)), [filter])

  return (
    <section id="portfolio" className="bg-[#0b0c0f] py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-white/90 sm:text-3xl">Selected Work</h2>
          <div className="flex gap-2">
            {tags.map(t => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`rounded-full border px-3 py-1 text-sm transition ${filter === t ? 'border-sky-400 text-sky-300' : 'border-white/15 text-white/70 hover:text-white hover:border-white/30'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {projects.map((p, i) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, delay: (i % 6) * 0.03 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <img src={p.img} alt={p.title} className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0f] via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="text-xs text-white/70">{p.tag}</p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
