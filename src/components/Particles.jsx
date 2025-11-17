import React, { useEffect, useRef, useState } from 'react'

// Lightweight, GPU-friendly particle field that subtly reacts to mouse
export default function Particles({ className = '' }) {
  const canvasRef = useRef(null)
  const [dpr, setDpr] = useState(1)
  const mouse = useRef({ x: 0, y: 0, vx: 0, vy: 0 })
  const animRef = useRef(0)
  const particlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })

    const handleResize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      setDpr(ratio)
      const { innerWidth: w, innerHeight: h } = window
      canvas.width = w * ratio
      canvas.height = h * ratio
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      initParticles()
    }

    const initParticles = () => {
      const count = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 22000))
      const parts = []
      for (let i = 0; i < count; i++) {
        parts.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.6 + 0.2,
        })
      }
      particlesRef.current = parts
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(59,130,246,0.08)' // subtle electric blue glow

      const parts = particlesRef.current
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i]
        // gentle mouse repulsion
        const dx = p.x - mouse.current.x
        const dy = p.y - mouse.current.y
        const dist2 = dx * dx + dy * dy
        const influence = dist2 > 0 ? Math.min(40 / dist2, 0.03) : 0
        p.vx += dx * influence
        p.vy += dy * influence

        // friction + drift
        p.vx *= 0.985
        p.vy *= 0.985
        p.x += p.vx
        p.y += p.vy

        // wrap around
        if (p.x < -10) p.x = window.innerWidth + 10
        if (p.x > window.innerWidth + 10) p.x = -10
        if (p.y < -10) p.y = window.innerHeight + 10
        if (p.y > window.innerHeight + 10) p.y = -10

        ctx.globalAlpha = p.alpha
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      animRef.current = requestAnimationFrame(draw)
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current.x = e.clientX - rect.left
      mouse.current.y = e.clientY - rect.top
    }

    window.addEventListener('resize', handleResize)
    canvas.addEventListener('mousemove', onMove)
    handleResize()
    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${className}`}
      aria-hidden="true"
    />
  )
}
