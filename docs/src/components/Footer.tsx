'use client'

import { motion } from 'framer-motion'

const links = {
  Project: [
    { label: 'GitHub Repo', href: 'https://github.com/smouj/skill-genesis' },
    { label: 'Skills Gallery', href: '#skills' },
    { label: 'Quick Start', href: '#quick-start' },
    { label: 'Roadmap', href: '#roadmap' },
  ],
  Community: [
    { label: 'OpenClaw Ecosystem', href: 'https://github.com/smouj' },
    { label: 'Skills-Hub', href: 'https://github.com/smouj/Skills-Hub' },
    { label: 'Discord (Coming)', href: '#' },
    { label: 'Telegram Bot (Coming)', href: '#' },
  ],
  Developer: [
    { label: 'Contributing Guide', href: 'https://github.com/smouj/skill-genesis/blob/main/CONTRIBUTING.md' },
    { label: 'Report a Bug', href: 'https://github.com/smouj/skill-genesis/issues/new' },
    { label: 'Feature Request', href: 'https://github.com/smouj/skill-genesis/issues/new?labels=enhancement' },
    { label: 'MIT License', href: 'https://github.com/smouj/skill-genesis/blob/main/LICENSE' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-10 px-4 border-t" style={{ borderColor: 'rgba(139,0,255,0.15)' }}>
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 100%, rgba(139,0,255,0.05), transparent)' }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 100 100" className="w-8 h-8 claw-glow">
                <defs>
                  <linearGradient id="footerClawGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="100%" stopColor="#8B00FF" />
                  </linearGradient>
                </defs>
                <path
                  d="M50 5 C38 20, 28 35, 33 60 C36 72, 28 82, 18 92 C25 87, 36 78, 39 65 C42 78, 38 88, 30 96 C40 87, 47 73, 46 58 C49 73, 48 87, 43 96 C51 83, 53 67, 50 52 C53 67, 52 83, 47 96 C55 81, 57 64, 52 49 C58 64, 58 81, 55 95 C64 74, 61 52, 50 35 C62 20, 64 5, 50 5Z"
                  fill="url(#footerClawGrad)"
                />
              </svg>
              <span className="font-black text-base tracking-wider" style={{ color: '#FFD700' }}>
                SKILL<span style={{ color: '#8B00FF' }}>GENESIS</span>
              </span>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Autonomous AI skill generator for the OpenClaw ecosystem. Generate, publish, and notify — all in one command.
            </p>

            <div className="flex gap-3">
              <a
                href="https://github.com/smouj/skill-genesis"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-sm transition-all hover:scale-110"
                style={{ background: 'rgba(139,0,255,0.15)', border: '1px solid rgba(139,0,255,0.3)', color: '#a855f7' }}
                aria-label="GitHub"
              >
                ★
              </a>
              <a
                href="https://github.com/smouj/Skills-Hub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-sm transition-all hover:scale-110"
                style={{ background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.2)', color: '#FFD700' }}
                aria-label="OpenClaw"
              >
                ⚡
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h3
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: '#8B00FF' }}
              >
                {category}
              </h3>
              <ul className="space-y-2.5">
                {items.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-gray-500 hover:text-gray-300 text-sm transition-colors relative group"
                    >
                      {link.label}
                      <span
                        className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                        style={{ background: '#8B00FF' }}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Live Demo Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 mb-10"
          style={{
            background: 'linear-gradient(135deg, rgba(139,0,255,0.1), rgba(255,215,0,0.06))',
            border: '1px solid rgba(139,0,255,0.2)',
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌐</span>
            <div>
              <p className="text-white font-bold text-sm">Live Demo</p>
              <p className="text-gray-400 text-xs">View the landing page on GitHub Pages</p>
            </div>
          </div>
          <a
            href="https://smouj.github.io/skill-genesis"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg text-xs font-bold transition-all hover:scale-105 flex-shrink-0"
            style={{ background: 'rgba(139,0,255,0.25)', border: '1px solid rgba(139,0,255,0.4)', color: '#a855f7' }}
          >
            smouj.github.io/skill-genesis →
          </a>
        </motion.div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="text-gray-600 text-xs">
            © 2026 <span style={{ color: '#8B00FF' }}>smouj</span> · OpenClaw Ecosystem · MIT License
          </p>
          <p className="text-gray-700 text-xs">
            Built with ⚡ Next.js 15 · Deployed on GitHub Pages
          </p>
        </div>
      </div>
    </footer>
  )
}
