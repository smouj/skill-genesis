'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#skills', label: 'Skills' },
  { href: '#demo', label: 'Demo' },
  { href: '#quick-start', label: 'Quick Start' },
  { href: '#roadmap', label: 'Roadmap' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(139,0,255,0.2)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="relative w-8 h-8">
            <svg viewBox="0 0 100 100" className="w-full h-full claw-glow">
              <path
                d="M50 5 C38 20, 28 35, 33 60 C36 72, 28 82, 18 92 C25 87, 36 78, 39 65 C42 78, 38 88, 30 96 C40 87, 47 73, 46 58 C49 73, 48 87, 43 96 C51 83, 53 67, 50 52 C53 67, 52 83, 47 96 C55 81, 57 64, 52 49 C58 64, 58 81, 55 95 C64 74, 61 52, 50 35 C62 20, 64 5, 50 5Z"
                fill="url(#navClawGrad)"
                stroke="#8B00FF"
                strokeWidth="0.5"
              />
              <defs>
                <linearGradient id="navClawGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#8B00FF" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="font-black text-lg tracking-wider" style={{ color: '#FFD700' }}>
            SKILL<span style={{ color: '#8B00FF' }}>GENESIS</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-400 hover:text-white transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300" style={{ background: '#8B00FF' }} />
            </a>
          ))}
        </div>

        {/* CTA + Mobile */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/smouj/skill-genesis"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
            style={{ background: 'rgba(139,0,255,0.15)', border: '1px solid rgba(139,0,255,0.4)', color: '#e5e7eb' }}
          >
            <span>★</span>
            <span>GitHub</span>
          </a>
          <a
            href="#quick-start"
            className="hidden md:inline-flex px-4 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #8B00FF, #6600CC)', color: 'white', boxShadow: '0 0 15px rgba(139,0,255,0.3)' }}
          >
            Try Now ⚡
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ background: '#8B00FF' }} />
              <span className={`block h-0.5 w-6 transition-all ${menuOpen ? 'opacity-0' : ''}`} style={{ background: '#8B00FF' }} />
              <span className={`block h-0.5 w-6 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ background: '#8B00FF' }} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden px-4 pb-4"
            style={{ background: 'rgba(10,10,10,0.97)', borderBottom: '1px solid rgba(139,0,255,0.2)' }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-gray-300 hover:text-white border-b border-gray-800 text-sm"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#quick-start"
              onClick={() => setMenuOpen(false)}
              className="block mt-4 py-3 text-center rounded-lg font-bold"
              style={{ background: 'linear-gradient(135deg, #8B00FF, #6600CC)', color: 'white' }}
            >
              Try Now ⚡
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
