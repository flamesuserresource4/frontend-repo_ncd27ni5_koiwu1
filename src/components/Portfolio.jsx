import React, { useEffect, useMemo, useRef, useState } from 'react'
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
  const [active, setActive] = useState(null)
  const closeBtnRef = useRef(null)
  const dialogRef = useRef(null)
  const projects = useMemo(() => (filter === 'All' ? allProjects : allProjects.filter(p => p.tag === filter)), [filter])

  // a11y: focus trap and Esc close
  useEffect(() => {
    if (!active) return
    const dialog = dialogRef.current
    const closeBtn = closeBtnRef.current
    const prev = document.activeElement
    closeBtn?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setActive(null)
      } else if (e.key === 'Tab') {
        const focusables = dialog?.querySelectorAll('a,button,input,textarea,select,[tabindex]:not([tabindex="-1"])')
        if (!focusables || focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      if (prev && prev.focus) prev.focus()
    }
  }, [active])

  return (
    <section id="portfolio" className="bg-[#0b0c0f] py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-white/90 sm:text-3xl">Selected Work</h2>
          <div className="flex gap-2" role="tablist" aria-label="Filter projects">
            {tags.map(t => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                role="tab"
                aria-selected={filter === t}
                aria-controls={`panel-${t}`}
                id={`tab-${t}`}
                className={`rounded-full border px-3 py-1 text-sm transition ${filter === t ? 'border-sky-400 text-sky-300' : 'border-white/15 text-white/70 hover:text-white hover:border-white/30'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3 [column-fill:_balance]" role="region" aria-live="polite">
          <AnimatePresence>
            {projects.map((p, i) => (
              <motion.button
                key={p.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, delay: (i % 6) * 0.03 }}
                onClick={() => setActive(p)}
                className="group relative mb-6 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70"
                aria-haspopup="dialog"
                aria-label={`Open details for ${p.title}`}
              >
                <img src={p.img} alt={p.title} loading="lazy" decoding="async" className="max-h-[60vh] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0f] via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="text-xs text-white/70">{p.tag}</p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-6"
            onClick={() => setActive(null)}
          >
            <motion.div
              ref={dialogRef}
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 20, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 10, scale: 0.98, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/15 bg-zinc-900/80 backdrop-blur-sm"
            >
              <img src={active.img} alt="" className="h-80 w-full object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold">{active.title}</h3>
                <p className="mt-2 text-sm text-white/75">{active.tag} — Crafted with performance, accessibility, and motion principles.</p>
                <div className="mt-6 flex justify-end gap-3">
                  <button ref={closeBtnRef} onClick={() => setActive(null)} className="rounded-md border border-white/20 px-3 py-1.5 text-sm text-white/80 hover:text-white hover:border-white/40">Close</button>
                  <a href="#" className="rounded-md bg-sky-500/20 px-3 py-1.5 text-sm text-sky-300 ring-1 ring-inset ring-sky-400/30 hover:bg-sky-500/30">View Case</a>
                </div>
              </div>
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60 mix-blend-overlay" style={{ background: 'radial-gradient(50%_60%_at_50%_0%, rgba(14,165,233,0.25), transparent 70%)' }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
