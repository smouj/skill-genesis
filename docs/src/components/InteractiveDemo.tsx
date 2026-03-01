'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const demoSteps = [
  { type: 'command', text: 'python3 skill_genesis.py', delay: 500 },
  { type: 'log', text: '2026-03-01 10:30:00 - INFO - === Skill-Genesis Start ===', delay: 300 },
  { type: 'log', text: '2026-03-01 10:30:00 - INFO - GitHub: smouj', delay: 200 },
  { type: 'log', text: '2026-03-01 10:30:01 - INFO - Skill: security-scan', delay: 400 },
  { type: 'log', text: '2026-03-01 10:30:01 - INFO - Kilo attempt 1/3...', delay: 300 },
  { type: 'thinking', text: '🧠 Kilo AI generating SKILL.md content...', delay: 2500 },
  { type: 'success', text: '2026-03-01 10:30:06 - INFO - Kilo success on attempt 1', delay: 200 },
  { type: 'log', text: '2026-03-01 10:30:06 - INFO - Created: smouj/security-scan-skill', delay: 600 },
  { type: 'log', text: '2026-03-01 10:30:07 - INFO - Uploaded SKILL.md', delay: 200 },
  { type: 'log', text: '2026-03-01 10:30:07 - INFO - Uploaded SKILL.es.md', delay: 200 },
  { type: 'log', text: '2026-03-01 10:30:07 - INFO - Uploaded README.md', delay: 200 },
  { type: 'log', text: '2026-03-01 10:30:07 - INFO - Uploaded README.es.md', delay: 200 },
  { type: 'log', text: '2026-03-01 10:30:08 - INFO - Updated Skills-Hub manifest', delay: 400 },
  { type: 'log', text: '2026-03-01 10:30:09 - INFO - Updated smouj profile README', delay: 300 },
  { type: 'telegram', text: '🔔 Telegram: ✨ New Skill Generated! security-scan-skill', delay: 300 },
  { type: 'success', text: '2026-03-01 10:30:09 - INFO - ✅ Done: security-scan', delay: 100 },
  { type: 'url', text: '   Repo: https://github.com/smouj/security-scan-skill', delay: 100 },
]

type LineType = 'command' | 'log' | 'thinking' | 'success' | 'telegram' | 'url'

const lineColors: Record<LineType, string> = {
  command: '#FFD700',
  log: '#6b7280',
  thinking: '#8B00FF',
  success: '#22c55e',
  telegram: '#0088cc',
  url: '#a855f7',
}

export default function InteractiveDemo() {
  const [lines, setLines] = useState<Array<{ text: string; type: LineType }>>([])
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const [thinkingDots, setThinkingDots] = useState('')
  const terminalRef = useRef<HTMLDivElement>(null)

  // Thinking dots animation
  useEffect(() => {
    if (!running) return
    const interval = setInterval(() => {
      setThinkingDots((d) => (d.length >= 3 ? '' : d + '.'))
    }, 400)
    return () => clearInterval(interval)
  }, [running])

  // Auto scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  const runDemo = async () => {
    if (running) return
    setLines([])
    setDone(false)
    setRunning(true)

    for (const step of demoSteps) {
      await new Promise((res) => setTimeout(res, step.delay))
      setLines((prev) => [...prev, { text: step.text, type: step.type as LineType }])
    }

    setRunning(false)
    setDone(true)
    setThinkingDots('')
  }

  const resetDemo = () => {
    setLines([])
    setDone(false)
    setRunning(false)
    setThinkingDots('')
  }

  return (
    <section id="demo" className="relative py-24 px-4">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(139,0,255,0.05), transparent)' }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs uppercase tracking-widest mb-4"
            style={{ border: '1px solid rgba(139,0,255,0.3)', color: '#8B00FF', background: 'rgba(139,0,255,0.06)' }}
          >
            <span>▶</span> Interactive Demo
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            See it{' '}
            <span style={{ color: '#8B00FF' }}>run live</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400"
          >
            Click the button below to simulate the full Skill Genesis pipeline in your browser.
          </motion.p>
        </div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden scanline"
          style={{
            background: '#090909',
            border: '1px solid rgba(139,0,255,0.3)',
            boxShadow: '0 0 60px rgba(139,0,255,0.15), inset 0 0 60px rgba(0,0,0,0.5)',
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ background: 'rgba(139,0,255,0.08)', borderBottom: '1px solid rgba(139,0,255,0.15)' }}
          >
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
            </div>
            <span className="text-xs text-gray-500 ml-2 font-mono">skill-genesis — python3 skill_genesis.py</span>
            <div className="ml-auto flex items-center gap-2">
              {running && (
                <span className="text-xs flex items-center gap-1.5" style={{ color: '#8B00FF' }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#8B00FF' }} />
                  Running
                </span>
              )}
              {done && (
                <span className="text-xs" style={{ color: '#22c55e' }}>✓ Done</span>
              )}
            </div>
          </div>

          {/* Terminal output */}
          <div
            ref={terminalRef}
            className="p-5 font-mono text-xs md:text-sm overflow-y-auto"
            style={{ minHeight: '320px', maxHeight: '420px' }}
          >
            {lines.length === 0 && !running && (
              <p className="text-gray-600">
                Press <span style={{ color: '#FFD700' }}>▶ Run Demo</span> to start simulation...
              </p>
            )}

            {lines.map((line, i) => (
              <AnimatePresence key={i}>
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-1.5 leading-relaxed"
                >
                  {line.type === 'command' && (
                    <span>
                      <span style={{ color: '#22c55e' }}>$</span>{' '}
                      <span style={{ color: lineColors[line.type] }}>{line.text}</span>
                    </span>
                  )}
                  {line.type === 'thinking' && (
                    <span style={{ color: lineColors[line.type] }}>
                      {line.text}{thinkingDots}
                    </span>
                  )}
                  {line.type !== 'command' && line.type !== 'thinking' && (
                    <span style={{ color: lineColors[line.type] }}>{line.text}</span>
                  )}
                </motion.div>
              </AnimatePresence>
            ))}

            {running && (
              <span className="cursor-blink" style={{ color: '#8B00FF' }}>█</span>
            )}
          </div>

          {/* Control bar */}
          <div
            className="flex items-center justify-between px-5 py-3"
            style={{ background: 'rgba(0,0,0,0.4)', borderTop: '1px solid rgba(139,0,255,0.1)' }}
          >
            <span className="text-xs text-gray-600 font-mono">
              {lines.length}/{demoSteps.length} steps
            </span>
            <div className="flex gap-3">
              {done && (
                <button
                  onClick={resetDemo}
                  className="px-4 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#9ca3af', background: 'transparent' }}
                >
                  ↺ Reset
                </button>
              )}
              <button
                onClick={runDemo}
                disabled={running}
                className="px-5 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                style={{
                  background: running ? 'rgba(139,0,255,0.3)' : 'linear-gradient(135deg, #8B00FF, #6600CC)',
                  color: 'white',
                  boxShadow: running ? 'none' : '0 0 15px rgba(139,0,255,0.4)',
                }}
              >
                <span>{running ? '⟳' : '▶'}</span>
                {running ? 'Running...' : done ? 'Run Again' : 'Run Demo'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-600 text-xs mt-4"
        >
          This is a simulated demo. Real execution requires Python 3, Kilo CLI, and GitHub credentials.
        </motion.p>
      </div>
    </section>
  )
}
