import React, { useEffect, useRef } from 'react'

export default function Marquee({ items = [], speed = 40 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const animate = () => {
      el.scrollLeft += 1
      if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0
      requestAnimationFrame(animate)
    }
    let id = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(id)
  }, [])

  const content = [...items, ...items]

  return (
    <div ref={ref} className="no-scrollbar relative overflow-x-hidden">
      <div className="flex min-w-max gap-10 py-6" aria-hidden>
        {content.map((item, i) => (
          <div key={i} className="flex items-center gap-3 text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400/70" />
            <span className="text-xs uppercase tracking-widest">{item}</span>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0b0c0f] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0b0c0f] to-transparent" />
    </div>
  )
}
