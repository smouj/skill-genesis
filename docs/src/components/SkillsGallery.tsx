'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Skill {
  name: string
  repo: string
  emoji: string
  tag: string
  status: string
  version: string
  defaultBranch: string
  description?: string
  stars?: number
}

const categoryColors: Record<string, string> = {
  code: '#00D9FF',
  seo: '#8B5CF6',
  devops: '#10B981',
  security: '#EF4444',
  cloud: '#F59E0B',
  data: '#EC4899',
  infra: '#6366F1',
  logic: '#14B8A6',
  pattern: '#F97316',
  test: '#22C55E',
  api: '#3B82F6',
  auto: '#A855F7',
  meta: '#06B6D4',
  bug: '#DC2626',
  infra: '#8B5CF6',
}

const categoryEmojis: Record<string, string> = {
  code: '💻',
  seo: '🔍',
  devops: '🚀',
  security: '🛡️',
  cloud: '☁️',
  data: '📊',
  infra: '🏗️',
  logic: '🧠',
  pattern: '🔮',
  test: '✅',
  api: '🔌',
  auto: '⚡',
  meta: '📈',
  bug: '🐛',
}

const statusColors: Record<string, { bg: string, text: string, border: string }> = {
  Ready: { bg: 'rgba(34,197,94,0.12)', text: '#22C55E', border: 'rgba(34,197,94,0.25)' },
  Beta: { bg: 'rgba(59,130,246,0.12)', text: '#3B82F6', border: 'rgba(59,130,246,0.25)' },
  Alpha: { bg: 'rgba(168,85,247,0.12)', text: '#A855F7', border: 'rgba(168,85,247,0.25)' },
}

export default function SkillsGallery() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSkills() {
      try {
        // Fetch manifest for skills list
        const manifestRes = await fetch('https://raw.githubusercontent.com/smouj/skill-genesis/main/manifest.json')
        const manifest = await manifestRes.json()
        
        // Fetch repos for additional data (stars, description)
        const reposRes = await fetch('https://api.github.com/users/smouj/repos?per_page=100&sort=updated')
        const repos = await reposRes.json()
        
        const repoMap = new Map(repos.map((r: any) => [r.name, r]))
        
        const skillData = manifest.skills.map((s: Skill) => {
          const fullRepoName = s.repo.replace('smouj/', '')
          const repoInfo = repoMap.get(fullRepoName)
          return {
            ...s,
            description: repoInfo?.description || `${s.name} skill for OpenClaw`,
            stars: repoInfo?.stargazers_count || 0,
          }
        })
        
        setSkills(skillData)
      } catch (error) {
        console.error('Failed to fetch skills:', error)
        setSkills([])
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  const allTags = Array.from(new Set(skills.map(s => s.tag)))
  
  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = !selectedTag || skill.tag === selectedTag
    return matchesSearch && matchesTag
  })

  if (loading) {
    return (
      <section id="skills" className="relative py-28 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl animate-pulse" style={{ color: '#00D9FF' }}>
            ⚡ Loading {156} skills...
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="skills" className="relative py-20 px-4">
      <div className="absolute inset-0 pointer-events-none grid-bg opacity-15" />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest mb-4"
            style={{ 
              border: '1px solid rgba(0,217,255,0.3)', 
              color: '#00D9FF', 
              background: 'rgba(0,217,255,0.06)' 
            }}
          >
            <span>⚡</span> Skills Gallery
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            {skills.length} <span style={{ color: '#00D9FF' }}>AI Skills</span> Ready
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Autonomous AI agents for OpenClaw. Each skill is fully documented, bilingual (EN/ES), and ready to install.
          </motion.p>
        </div>

        {/* Search & Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center"
        >
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-80 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
          />
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedTag === null 
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/20'
              }`}
            >
              All
            </button>
            {allTags.slice(0, 8).map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  selectedTag === tag 
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/20'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <div className="flex justify-center gap-6 mb-8 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            {skills.filter(s => s.status === 'Ready').length} Ready
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
            {allTags.length} Categories
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSkills.map((skill, i) => {
            const color = categoryColors[skill.tag] || '#8B5CF6'
            const emoji = categoryEmojis[skill.tag] || '⚡'
            const status = statusColors[skill.status] || statusColors.Ready
            
            return (
              <motion.a
                key={skill.name}
                href={`https://github.com/${skill.repo}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.02, 0.5) }}
                className="group relative block p-5 rounded-2xl overflow-hidden text-decoration-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {/* Hover glow effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${color}15 0%, transparent 70%)`,
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Top row: emoji + status */}
                  <div className="flex items-start justify-between mb-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border"
                      style={{
                        background: `${color}10`,
                        borderColor: `${color}20`,
                      }}
                    >
                      {skill.emoji || emoji}
                    </div>
                    <span 
                      className="text-xs px-2 py-1 rounded-full font-medium"
                      style={{
                        background: status.bg,
                        color: status.text,
                        border: `1px solid ${status.border}`,
                      }}
                    >
                      {skill.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-lg mb-1 group-hover:text-cyan-400 transition-colors">
                    {skill.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </h3>

                  {/* Category tag */}
                  <div className="flex items-center gap-2 mb-3">
                    <span 
                      className="text-xs px-2 py-0.5 rounded-md capitalize"
                      style={{
                        background: `${color}10`,
                        color: color,
                      }}
                    >
                      {skill.tag}
                    </span>
                    <span className="text-xs text-gray-500">
                      v{skill.version}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-3">
                    {skill.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <span>→</span>
                      <span className="truncate max-w-[120px]">{skill.repo.replace('smouj/', '')}</span>
                    </div>
                    {skill.stars > 0 && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <span>★</span>
                        <span>{skill.stars}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.a>
            )
          })}
        </div>

        {/* Empty state */}
        {filteredSkills.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No skills found matching your search.</p>
          </div>
        )}

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-sm mb-4">Create your own skill with:</p>
          <code 
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-sm"
            style={{
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(0,217,255,0.2)',
              color: '#00D9FF',
            }}
          >
            <span style={{ color: '#22C55E' }}>$</span> python3 skill_genesis.py
          </code>
        </motion.div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}
