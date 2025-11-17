import React, { useRef } from 'react'

// Accessible magnetic button: follows cursor slightly and keeps strong focus styles
export default function MagneticButton({ as: As = 'a', href, children, className = '', onClick, ...rest }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const mx = e.clientX - rect.left - rect.width / 2
    const my = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${mx * 0.1}px, ${my * 0.1}px)`
  }

  const reset = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0,0)'
  }

  const base = 'relative inline-flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400 focus-visible:ring-offset-[#0b0c0f] transition will-change-transform'

  const Comp = As

  return (
    <div className="inline-block" onMouseMove={onMove} onMouseLeave={reset}>
      <Comp
        ref={ref}
        href={href}
        onClick={onClick}
        className={`${base} ${className}`}
        {...rest}
      >
        {/* Sweep highlight */}
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        {children}
      </Comp>
    </div>
  )
}
