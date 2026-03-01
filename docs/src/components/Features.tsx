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

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0]
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      whileHover={{ scale: 1.03, y: -4 }}
      className="relative p-6 rounded-2xl cursor-default overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: `1px solid rgba(${feature.color === '#8B00FF' ? '139,0,255' : feature.color === '#FFD700' ? '255,215,0' : feature.color === '#00FFCC' ? '0,255,204' : '255,107,107'},0.2)`,
        transition: 'all 0.3s ease',
      }}
    >
      {/* Glow corner */}
      <div
        className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${feature.color}18, transparent 70%)`,
        }}
      />

      <div className="flex items-start gap-4">
        <div
          className="text-3xl w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0"
          style={{ background: `${feature.color}18`, border: `1px solid ${feature.color}30` }}
        >
          {feature.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-white font-bold text-sm md:text-base">{feature.title}</h3>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0"
              style={{ background: `${feature.color}20`, color: feature.color, border: `1px solid ${feature.color}40` }}
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
    <section id="features" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs uppercase tracking-widest mb-4"
            style={{ border: '1px solid rgba(139,0,255,0.3)', color: '#8B00FF', background: 'rgba(139,0,255,0.06)' }}
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

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
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
            style={{ background: 'rgba(139,0,255,0.15)', border: '1px solid rgba(139,0,255,0.4)', color: '#a855f7' }}
          >
            See it in action →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
