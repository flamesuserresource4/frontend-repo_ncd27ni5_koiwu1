import React, { useEffect, useRef } from 'react'

// Full-screen, GPU-friendly cursor-follow glow with accessibility and user-preference respect
export default function CursorGlow({ color = '14,165,233' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduce.matches) return

    const move = (e) => {
      const x = e.clientX
      const y = e.clientY
      el.style.setProperty('--x', x + 'px')
      el.style.setProperty('--y', y + 'px')
    }

    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  // Use CSS variable for alpha so theme can control intensity
  const alpha = getComputedStyle(document.documentElement).getPropertyValue('--cursor-glow-alpha') || '0.18'

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] mix-blend-screen"
      style={{
        background: `radial-gradient(180px_180px_at_var(--x,_-200px)_var(--y,_-200px), rgba(${color}, ${alpha}), transparent_60%)`,
        transition: 'background-position 120ms linear',
      }}
    />
  )
}
