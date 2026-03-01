'use client'

import { motion } from 'framer-motion'

const roadmapItems = [
  {
    quarter: 'Q1 2026',
    status: 'done',
    items: [
      { text: 'Initial CLI release with 10 skill themes', done: true },
      { text: 'Kilo AI integration with retry logic', done: true },
      { text: 'GitHub auto-publish (EN + ES)', done: true },
      { text: 'Skills-Hub manifest integration', done: true },
      { text: 'Telegram notification system', done: true },
      { text: 'Lock file protection', done: true },
    ],
  },
  {
    quarter: 'Q2 2026',
    status: 'active',
    items: [
      { text: 'Custom skill theme YAML config', done: false },
      { text: 'Discord webhook notifications', done: false },
      { text: 'Web dashboard for skill management', done: false },
      { text: 'Skill validation & quality scoring', done: false },
      { text: 'Multi-account GitHub support', done: false },
    ],
  },
  {
    quarter: 'Q3 2026',
    status: 'planned',
    items: [
      { text: 'REST API for remote triggering', done: false },
      { text: 'GitHub Actions skill generation workflow', done: false },
      { text: 'Skill dependency graph', done: false },
      { text: 'Community skill marketplace', done: false },
      { text: 'VS Code extension integration', done: false },
    ],
  },
  {
    quarter: 'Q4 2026',
    status: 'planned',
    items: [
      { text: 'Multi-language skill generation (FR, PT, DE)', done: false },
      { text: 'AI-powered skill testing & validation', done: false },
      { text: 'OpenClaw v2 protocol support', done: false },
      { text: 'Skill analytics dashboard', done: false },
      { text: 'Enterprise team features', done: false },
    ],
  },
]

const statusConfig = {
  done: { label: 'Completed', color: '#22c55e', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.25)' },
  active: { label: 'In Progress', color: '#8B00FF', bg: 'rgba(139,0,255,0.1)', border: 'rgba(139,0,255,0.3)' },
  planned: { label: 'Planned', color: '#6b7280', bg: 'rgba(107,114,128,0.08)', border: 'rgba(107,114,128,0.15)' },
}

export default function Roadmap() {
  return (
    <section id="roadmap" className="relative py-24 px-4">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 50%, rgba(139,0,255,0.04), transparent)' }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs uppercase tracking-widest mb-4"
            style={{ border: '1px solid rgba(139,0,255,0.3)', color: '#8B00FF', background: 'rgba(139,0,255,0.06)' }}
          >
            <span>🗺</span> Roadmap 2026
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            Where we're{' '}
            <span style={{ color: '#8B00FF' }}>headed</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-xl mx-auto"
          >
            Skill Genesis is just getting started. Here's the full vision for 2026 and beyond.
          </motion.p>
        </div>

        {/* Roadmap grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {roadmapItems.map((quarter, i) => {
            const config = statusConfig[quarter.status as keyof typeof statusConfig]
            return (
              <motion.div
                key={quarter.quarter}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl"
                style={{
                  background: config.bg,
                  border: `1px solid ${config.border}`,
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-black text-lg">{quarter.quarter}</h3>
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ background: `${config.color}20`, color: config.color, border: `1px solid ${config.color}30` }}
                  >
                    {config.label}
                  </span>
                </div>

                <ul className="space-y-2.5">
                  {quarter.items.map((item, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + j * 0.05 }}
                      className="flex items-start gap-2.5 text-sm"
                    >
                      <span
                        className="mt-0.5 flex-shrink-0 text-sm"
                        style={{ color: item.done ? '#22c55e' : quarter.status === 'active' ? config.color : '#374151' }}
                      >
                        {item.done ? '✓' : quarter.status === 'active' ? '◐' : '○'}
                      </span>
                      <span className={item.done ? 'text-gray-300' : quarter.status === 'planned' ? 'text-gray-600' : 'text-gray-300'}>
                        {item.text}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* Contributing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-white font-bold text-lg mb-1">Want to shape the roadmap?</h3>
              <p className="text-gray-400 text-sm">
                Open an issue on GitHub, join the discussion, or submit a PR. All contributions welcome.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <a
                href="https://github.com/smouj/skill-genesis/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105"
                style={{ background: 'rgba(139,0,255,0.2)', border: '1px solid rgba(139,0,255,0.4)', color: '#a855f7' }}
              >
                💡 Suggest Feature
              </a>
              <a
                href="https://github.com/smouj/skill-genesis/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl text-sm font-bold border transition-all hover:scale-105"
                style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#e5e7eb', background: 'transparent' }}
              >
                📋 Contributing Guide
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
