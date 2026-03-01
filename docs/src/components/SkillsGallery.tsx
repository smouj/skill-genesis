'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const skills = [
  {
    slug: 'seo-audit',
    name: 'SEO Audit',
    category: 'seo',
    emoji: '🔍',
    description: 'Analyzes websites for technical SEO issues — Core Web Vitals, meta tags, sitemap, robots.txt.',
    tags: ['audit', 'keywords', 'ranking', 'lighthouse'],
    color: '#8B00FF',
    status: 'Ready',
  },
  {
    slug: 'code-review',
    name: 'Code Review',
    category: 'coding',
    emoji: '💻',
    description: 'Comprehensive code review covering quality, security vulnerabilities, and best practices.',
    tags: ['review', 'quality', 'security', 'lint'],
    color: '#FFD700',
    status: 'Ready',
  },
  {
    slug: 'db-optimize',
    name: 'DB Optimizer',
    category: 'devops',
    emoji: '🗄',
    description: 'Optimizes PostgreSQL queries, indexes, and schema for maximum performance.',
    tags: ['database', 'postgres', 'queries', 'performance'],
    color: '#00FFCC',
    status: 'Ready',
  },
  {
    slug: 'security-scan',
    name: 'Security Scanner',
    category: 'security',
    emoji: '🛡',
    description: 'Scans for security vulnerabilities using nmap, trivy, bandit and industry-standard tools.',
    tags: ['security', 'CVE', 'scan', 'hardening'],
    color: '#FF6B6B',
    status: 'Ready',
  },
  {
    slug: 'api-docs',
    name: 'API Docs',
    category: 'writing',
    emoji: '📖',
    description: 'Generates OpenAPI 3.0 / Swagger documentation from code with real endpoint examples.',
    tags: ['api', 'openapi', 'swagger', 'docs'],
    color: '#8B00FF',
    status: 'Ready',
  },
  {
    slug: 'test-gen',
    name: 'Test Generator',
    category: 'coding',
    emoji: '🧪',
    description: 'Creates unit and integration tests from existing code — Jest, Pytest, Vitest support.',
    tags: ['tests', 'coverage', 'jest', 'pytest'],
    color: '#FFD700',
    status: 'Ready',
  },
  {
    slug: 'log-analyze',
    name: 'Log Analyzer',
    category: 'analysis',
    emoji: '📊',
    description: 'Parses application logs to identify errors, anomalies, and performance patterns.',
    tags: ['logs', 'errors', 'debugging', 'metrics'],
    color: '#00FFCC',
    status: 'Ready',
  },
  {
    slug: 'backup-manager',
    name: 'Backup Manager',
    category: 'devops',
    emoji: '💾',
    description: 'Manages automated backup schedules, restoration procedures, and data integrity checks.',
    tags: ['backup', 'restore', 'schedule', 'automate'],
    color: '#FF6B6B',
    status: 'Ready',
  },
  {
    slug: 'perf-monitor',
    name: 'Perf Monitor',
    category: 'devops',
    emoji: '📈',
    description: 'Monitors CPU, memory, disk, and network metrics with alerting thresholds.',
    tags: ['performance', 'cpu', 'memory', 'monitor'],
    color: '#8B00FF',
    status: 'Ready',
  },
  {
    slug: 'cloud-deploy',
    name: 'Cloud Deployer',
    category: 'devops',
    emoji: '☁',
    description: 'Deploys to AWS, GCP, and Azure with Docker and Kubernetes orchestration support.',
    tags: ['deploy', 'cloud', 'aws', 'kubernetes'],
    color: '#FFD700',
    status: 'Ready',
  },
]

const categoryColors: Record<string, string> = {
  seo: '#8B00FF',
  coding: '#FFD700',
  devops: '#00FFCC',
  security: '#FF6B6B',
  writing: '#FF9F43',
  analysis: '#A29BFE',
}

export default function SkillsGallery() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)

  return (
    <section id="skills" className="relative py-28 px-4">
      <div className="absolute inset-0 pointer-events-none grid-bg opacity-20" />
      <div className="section-divider absolute top-0 left-8 right-8" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs uppercase tracking-widest mb-4"
            style={{ border: '1px solid rgba(0,255,204,0.3)', color: '#00FFCC', background: 'rgba(0,255,204,0.06)' }}
          >
            <span>⚡</span> Skills Gallery
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            10 skills ready to{' '}
            <span style={{ color: '#00FFCC' }}>deploy right now</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Each skill is a full OpenClaw-compatible agent with bilingual documentation, real CLI commands, and expert-level guidance.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {skills.map((skill, i) => {
            const isHovered = hoveredSlug === skill.slug
            const catColor = categoryColors[skill.category] ?? skill.color
            return (
              <motion.div
                key={skill.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onMouseEnter={() => setHoveredSlug(skill.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                className="relative p-4 rounded-2xl cursor-default overflow-hidden"
                style={{
                  background: isHovered
                    ? `radial-gradient(circle at top left, ${skill.color}12, rgba(255,255,255,0.03))`
                    : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${isHovered ? skill.color + '45' : 'rgba(255,255,255,0.06)'}`,
                  transform: isHovered ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
                  transition: 'all 0.28s ease',
                  boxShadow: isHovered ? `0 16px 48px ${skill.color}20` : 'none',
                }}
              >
                <div
                  className="text-2xl mb-3 w-11 h-11 flex items-center justify-center rounded-xl transition-transform duration-300"
                  style={{
                    background: `${skill.color}12`,
                    border: `1px solid ${skill.color}25`,
                    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  {skill.emoji}
                </div>

                <h3 className="text-white font-bold text-sm mb-1.5">{skill.name}</h3>

                <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: `${catColor}12`,
                      color: catColor,
                      border: `1px solid ${catColor}25`,
                    }}
                  >
                    {skill.category}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(34,197,94,0.08)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.18)' }}
                  >
                    {skill.status}
                  </span>
                </div>

                <div
                  style={{
                    maxHeight: isHovered ? '100px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.35s ease, opacity 0.25s ease',
                    opacity: isHovered ? 1 : 0,
                  }}
                >
                  <p className="text-gray-400 text-xs leading-relaxed mb-2">{skill.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {skill.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs" style={{ color: '#4b5563' }}>#{tag}</span>
                    ))}
                  </div>
                </div>

                <a
                  href={`https://github.com/smouj/${skill.slug}-skill`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-xs flex items-center gap-1 transition-all duration-200"
                  style={{ color: isHovered ? skill.color : '#374151' }}
                >
                  <span>→</span>
                  <span>/{skill.slug}-skill</span>
                </a>
              </motion.div>
            )
          })}
        </div>

        {/* Command hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm mb-3">Generate your next skill with a single command:</p>
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl font-mono text-sm"
            style={{
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(139,0,255,0.25)',
              color: '#a855f7',
            }}
          >
            <span style={{ color: '#22c55e' }}>$</span>
            python3 skill_genesis.py
          </div>
        </motion.div>
      </div>
    </section>
  )
}
