'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const features = [
  {
    icon: '🤖',
    title: 'Kilo AI Generation',
    description:
      'Leverages Kilo CLI to generate rich, specific SKILL.md content — not generic templates. Real commands, real examples, real expertise.',
    color: '#8B00FF',
    badge: 'Core',
  },
  {
    icon: '🔄',
    title: '3× Retry Logic',
    description:
      'Built-in resilience with 3 attempts and 200s timeout per call. Falls back to a rich category-specific template if AI is unavailable.',
    color: '#FFD700',
    badge: 'Reliable',
  },
  {
    icon: '📦',
    title: 'Auto-Publish to GitHub',
    description:
      'Creates the skill repository, uploads SKILL.md (EN + ES), README files, and all assets automatically via GitHub API.',
    color: '#00FFCC',
    badge: 'Automated',
  },
  {
    icon: '📝',
    title: 'Bilingual by Default',
    description:
      'Every skill is generated in English and Spanish simultaneously — SKILL.md + SKILL.es.md + README.md + README.es.md.',
    color: '#FF6B6B',
    badge: 'i18n',
  },
  {
    icon: '🌐',
    title: 'Skills-Hub Integration',
    description:
      'Automatically updates the smouj/Skills-Hub manifest.json with the new skill metadata, making it instantly discoverable.',
    color: '#8B00FF',
    badge: 'Ecosystem',
  },
  {
    icon: '🔔',
    title: 'Telegram Notifications',
    description:
      'Real-time alerts via Telegram bot when a new skill is created. Optional — just set TELEGRAM_BOT_TOKEN in your .env.',
    color: '#FFD700',
    badge: 'Notify',
  },
  {
    icon: '🔒',
    title: 'Lock File Protection',
    description:
      'Process lock mechanism prevents multiple simultaneous executions. PID-based locking with automatic cleanup on stale locks.',
    color: '#00FFCC',
    badge: 'Safe',
  },
  {
    icon: '⚙️',
    title: 'Zero Config Auth',
    description:
      'Reads GitHub token from .env or falls back to `gh auth token` automatically. No manual token setup required.',
    color: '#FF6B6B',
    badge: 'DX',
  },
]

const colorRgb: Record<string, string> = {
  '#8B00FF': '139,0,255',
  '#FFD700': '255,215,0',
  '#00FFCC': '0,255,204',
  '#FF6B6B': '255,107,107',
}

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0]
  index: number
}) {
  const rgb = colorRgb[feature.color] ?? '139,0,255'
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="relative p-6 rounded-2xl cursor-default overflow-hidden group"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: `1px solid rgba(${rgb},0.18)`,
        transition: 'all 0.3s ease',
      }}
    >
      {/* Glow corner */}
      <div
        className="absolute top-0 right-0 w-32 h-32 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at top right, ${feature.color}18, transparent 70%)`,
        }}
      />
      {/* Bottom glow on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${feature.color}60, transparent)` }}
      />

      <div className="flex items-start gap-4">
        <div
          className="text-2xl w-11 h-11 flex items-center justify-center rounded-xl flex-shrink-0 transition-all duration-300 group-hover:scale-110"
          style={{
            background: `rgba(${rgb},0.1)`,
            border: `1px solid rgba(${rgb},0.25)`,
            boxShadow: `0 0 20px rgba(${rgb},0.1)`,
          }}
        >
          {feature.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h3 className="text-white font-bold text-sm">{feature.title}</h3>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0"
              style={{
                background: `rgba(${rgb},0.12)`,
                color: feature.color,
                border: `1px solid rgba(${rgb},0.3)`,
              }}
            >
              {feature.badge}
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="features" className="relative py-28 px-4">
      {/* Subtle top divider */}
      <div className="section-divider mb-0 absolute top-0 left-8 right-8" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs uppercase tracking-widest mb-4"
            style={{ border: '1px solid rgba(139,0,255,0.3)', color: '#a855f7', background: 'rgba(139,0,255,0.06)' }}
          >
            <span>⚡</span> Features
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            Everything you need to{' '}
            <span style={{ color: '#8B00FF' }}>ship skills fast</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            From AI generation to GitHub publishing to Telegram notifications — Skill Genesis handles the full pipeline autonomously.
          </motion.p>
        </div>

        {/* Grid — 2 cols md, 4 cols xl */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="#quick-start"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
            style={{
              background: 'rgba(139,0,255,0.12)',
              border: '1px solid rgba(139,0,255,0.35)',
              color: '#a855f7',
            }}
          >
            See it in action →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
