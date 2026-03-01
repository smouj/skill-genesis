'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
  text?: string
}

const COLORS = ['#8B00FF', '#FFD700', '#9B30FF', '#FFDF00', '#AA44FF', '#FFC200', '#00FFCC']
const SKILL_NAMES = ['/seo-audit', '/code-review', '/security-scan', '/test-gen', '/api-docs', '/db-optimize', '/cloud-deploy', '/perf-monitor']

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const frameRef = useRef<number>(undefined)
  const [, forceRender] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let frameCount = 0

    const spawnParticles = (cx: number, cy: number) => {
      for (let i = 0; i < 2; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 2 + 0.3
        particlesRef.current.push({
          x: cx + (Math.random() - 0.5) * 80,
          y: cy + (Math.random() - 0.5) * 80,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.8,
          life: 0,
          maxLife: 60 + Math.random() * 60,
          size: Math.random() * 3 + 1,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        })
      }
      if (frameCount % 100 === 0) {
        const text = SKILL_NAMES[Math.floor(Math.random() * SKILL_NAMES.length)]
        const angle = (Math.random() - 0.5) * Math.PI * 0.7
        particlesRef.current.push({
          x: cx + (Math.random() - 0.5) * 60,
          y: cy,
          vx: Math.sin(angle) * 2.5,
          vy: -Math.abs(Math.cos(angle)) * 2 - 0.5,
          life: 0,
          maxLife: 110,
          size: 13,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          text,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frameCount++

      const cx = canvas.width * 0.5
      const cy = canvas.height * 0.38
      spawnParticles(cx, cy)

      if (particlesRef.current.length > 200) {
        particlesRef.current = particlesRef.current.slice(-150)
      }

      particlesRef.current = particlesRef.current.filter((p) => p.life < p.maxLife)

      particlesRef.current.forEach((p) => {
        p.life++
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.025
        p.vx *= 0.985

        const progress = p.life / p.maxLife
        const alpha = progress < 0.15 ? progress / 0.15 : 1 - (progress - 0.15) / 0.85

        ctx.save()
        ctx.globalAlpha = Math.max(0, alpha)

        if (p.text) {
          ctx.font = `bold ${p.size}px 'Courier New', monospace`
          ctx.fillStyle = p.color
          ctx.shadowColor = p.color
          ctx.shadowBlur = 12
          ctx.fillText(p.text, p.x, p.y)
        } else {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.shadowColor = p.color
          ctx.shadowBlur = p.size * 4
          ctx.fill()
        }
        ctx.restore()
      })

      const pts = particlesRef.current.filter((p) => !p.text)
      for (let i = 0; i < pts.length; i += 2) {
        for (let j = i + 1; j < Math.min(i + 8, pts.length); j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 70) {
            ctx.save()
            ctx.globalAlpha = (1 - dist / 70) * 0.15
            ctx.strokeStyle = '#8B00FF'
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
            ctx.restore()
          }
        }
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)
    forceRender(1)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, #1a0033 0%, #0A0A0A 70%)' }}
    >
      {/* Canvas particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, #0A0A0A 100%)' }}
      />

      {/* Orbit particles decoration */}
      <div className="absolute" style={{ top: '30%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <div className="relative w-1 h-1">
          <div className="orbit-particle absolute w-2 h-2 rounded-full" style={{ background: '#8B00FF', boxShadow: '0 0 8px #8B00FF' }} />
          <div className="orbit-particle-2 absolute w-1.5 h-1.5 rounded-full" style={{ background: '#FFD700', boxShadow: '0 0 6px #FFD700' }} />
          <div className="orbit-particle-3 absolute w-1 h-1 rounded-full" style={{ background: '#00FFCC', boxShadow: '0 0 5px #00FFCC' }} />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
        {/* Dragon Claw */}
        <motion.div
          initial={{ scale: 0, rotate: -45, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <svg
              viewBox="0 0 200 220"
              className="w-28 h-28 floating claw-glow"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="heroClawGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="40%" stopColor="#8B00FF" />
                  <stop offset="100%" stopColor="#4B0082" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                d="M100 10 C85 30, 72 55, 78 95 C81 115, 72 138, 56 162 C66 155, 80 142, 84 124 C87 145, 82 168, 70 185 C83 173, 94 155, 93 132 C96 152, 94 170, 88 188 C100 172, 105 150, 102 128 C106 148, 106 169, 100 188 C115 168, 117 145, 110 122 C116 142, 116 165, 110 183 C122 158, 123 132, 113 108 C126 72, 118 35, 100 10Z"
                fill="url(#heroClawGrad)"
                stroke="#8B00FF"
                strokeWidth="1.5"
                filter="url(#glow)"
              />
              <ellipse cx="100" cy="55" rx="18" ry="10" fill="rgba(139,0,255,0.3)" />
              <ellipse cx="100" cy="35" rx="12" ry="7" fill="rgba(255,215,0,0.2)" />
            </svg>

            <div
              className="absolute inset-0 rounded-full pulse-ring pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(139,0,255,0.3), transparent)', transform: 'scale(1.5)' }}
            />
            <div
              className="absolute inset-0 rounded-full pulse-ring pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.15), transparent)', transform: 'scale(2)', animationDelay: '1s' }}
            />
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6 tracking-widest uppercase"
          style={{ border: '1px solid rgba(139,0,255,0.4)', background: 'rgba(139,0,255,0.08)', color: '#a855f7' }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#8B00FF' }} />
          Powered by Kilo AI · OpenClaw Ecosystem
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="text-7xl md:text-9xl font-black mb-4 leading-none tracking-tight"
        >
          <span
            className="block"
            style={{ color: '#FFD700', textShadow: '0 0 50px rgba(255,215,0,0.4), 0 0 100px rgba(255,215,0,0.15)' }}
          >
            SKILL
          </span>
          <span
            className="block holographic"
            style={{ fontSize: '0.9em' }}
          >
            GENESIS
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xl md:text-2xl text-gray-300 mb-3 max-w-3xl mx-auto leading-relaxed"
        >
          AI-powered autonomous skill generator for the{' '}
          <span style={{ color: '#8B00FF', fontWeight: 700 }}>OpenClaw</span> ecosystem.
          Create professional skills in <span style={{ color: '#FFD700', fontWeight: 700 }}>seconds</span>.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="text-gray-500 mb-10 text-sm md:text-base"
        >
          No configuration. No boilerplate. One command → AI generates, publishes to GitHub, notifies Telegram.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
        >
          <a
            href="#quick-start"
            className="px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #8B00FF, #6600CC)',
              color: 'white',
              boxShadow: '0 0 30px rgba(139,0,255,0.5), 0 0 60px rgba(139,0,255,0.2)',
            }}
          >
            <span>⚡</span>
            Get Started (1 min)
          </a>
          <a
            href="https://github.com/smouj/skill-genesis"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-xl font-bold text-lg border transition-all hover:scale-105 flex items-center justify-center gap-2"
            style={{
              borderColor: 'rgba(255,215,0,0.5)',
              color: '#FFD700',
              background: 'rgba(255,215,0,0.05)',
            }}
          >
            <span>★</span>
            Star on GitHub
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.35 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
        >
          {[
            { value: '10+', label: 'Skills Ready', icon: '⚡' },
            { value: '3×', label: 'AI Retry Logic', icon: '🔄' },
            { value: '200s', label: 'Kilo Timeout', icon: '⏱' },
            { value: '∞', label: 'Possibilities', icon: '✨' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + i * 0.1 }}
              className="text-center p-4 rounded-xl card-hover"
              style={{
                background: 'rgba(139,0,255,0.08)',
                border: '1px solid rgba(139,0,255,0.25)',
              }}
            >
              <div className="text-xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-black" style={{ color: '#FFD700' }}>{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0A0A0A)' }}
      />

      {/* Scroll indicator */}
      <motion.a
        href="#features"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 2.5, duration: 0.8 },
          y: { delay: 3.3, repeat: Infinity, repeatType: 'loop', duration: 2, ease: 'easeInOut' },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 hover:text-gray-400 transition-colors text-xs flex flex-col items-center gap-2"
      >
        <span>SCROLL</span>
        <span className="text-lg">↓</span>
      </motion.a>
    </section>
  )
}
