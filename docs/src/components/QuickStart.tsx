'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface CodeBlockProps {
  title: string
  code: string
  lang?: string
}

function CodeBlock({ title, code, lang = 'bash' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for environments without clipboard API
    }
  }

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: '#070707', border: '1px solid rgba(139,0,255,0.2)' }}
    >
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ background: 'rgba(139,0,255,0.08)', borderBottom: '1px solid rgba(139,0,255,0.15)' }}
      >
        <span className="text-xs font-mono text-gray-400">{title}</span>
        <button
          onClick={handleCopy}
          className="text-xs px-2.5 py-1 rounded-md transition-all hover:scale-105"
          style={{
            background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(139,0,255,0.15)',
            color: copied ? '#22c55e' : '#a855f7',
            border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : 'rgba(139,0,255,0.3)'}`,
          }}
        >
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="px-5 py-4 overflow-x-auto text-xs md:text-sm font-mono leading-relaxed">
        <code style={{ color: '#e5e7eb' }}>{code}</code>
      </pre>
    </div>
  )
}

const installationSteps = [
  {
    step: '1',
    title: 'Clone the repository',
    code: `git clone https://github.com/smouj/skill-genesis.git
cd skill-genesis`,
    note: 'Requires Git and Python 3.8+',
  },
  {
    step: '2',
    title: 'Install dependencies',
    code: `pip install PyGithub requests python-dotenv`,
    note: 'Or use: pip install -r requirements.txt',
  },
  {
    step: '3',
    title: 'Configure environment',
    code: `cp .env.example .env
# Edit .env with your credentials:
# GITHUB_PAT=ghp_your_token_here
# TELEGRAM_BOT_TOKEN=your_bot_token (optional)
# TELEGRAM_CHAT_ID=your_chat_id (optional)`,
    note: 'GitHub PAT needs: repo, workflow, admin:repo_hook scopes',
  },
  {
    step: '4',
    title: 'Run Skill Genesis',
    code: `# Full run (creates GitHub repo + notifies Telegram)
python3 skill_genesis.py

# Dry run (test without side effects)
python3 skill_genesis.py --dry-run`,
    note: 'That\'s it! Watch the skill get created automatically.',
  },
]

const configOptions = `# .env configuration
GITHUB_PAT=ghp_xxxxxxxxxxxxxxxxxxxx    # Required
TELEGRAM_BOT_TOKEN=123456:ABC-xxx      # Optional
TELEGRAM_CHAT_ID=@your_channel         # Optional
SKILLS_HUB_REPO=smouj/Skills-Hub       # Default
SMOUJ_PROFILE_REPO=smouj/smouj         # Default`

const cronExample = `# Run every hour via cron (generates one skill per run)
# crontab -e
0 * * * * cd /path/to/skill-genesis && python3 skill_genesis.py >> logs/cron.log 2>&1`

export default function QuickStart() {
  return (
    <section id="quick-start" className="relative py-24 px-4">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,215,0,0.03), transparent)' }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs uppercase tracking-widest mb-4"
            style={{ border: '1px solid rgba(255,215,0,0.3)', color: '#FFD700', background: 'rgba(255,215,0,0.06)' }}
          >
            <span>⚡</span> Quick Start
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            Up and running in{' '}
            <span style={{ color: '#FFD700' }}>under 1 minute</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400"
          >
            No Docker, no complex setup. Just Python, pip, and your GitHub credentials.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {installationSteps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0"
                  style={{ background: 'rgba(139,0,255,0.2)', border: '1px solid rgba(139,0,255,0.5)', color: '#8B00FF' }}
                >
                  {step.step}
                </div>
                <h3 className="text-white font-bold">{step.title}</h3>
              </div>
              <div className="ml-11">
                <CodeBlock title={`step-${step.step}.sh`} code={step.code} />
                <p className="text-gray-600 text-xs mt-2 ml-1">💡 {step.note}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional config */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 space-y-4"
        >
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <span>⚙️</span> Configuration Reference
          </h3>
          <CodeBlock title=".env" code={configOptions} lang="bash" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 space-y-4"
        >
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <span>⏰</span> Automate with Cron
          </h3>
          <CodeBlock title="crontab" code={cronExample} />
        </motion.div>

        {/* CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 p-6 rounded-2xl text-center"
          style={{ background: 'linear-gradient(135deg, rgba(139,0,255,0.12), rgba(255,215,0,0.05))', border: '1px solid rgba(139,0,255,0.25)' }}
        >
          <p className="text-white font-bold text-lg mb-2">Ready to generate your first skill?</p>
          <p className="text-gray-400 text-sm mb-5">
            Join the OpenClaw ecosystem and start shipping AI-powered skills today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://github.com/smouj/skill-genesis"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #8B00FF, #6600CC)', color: 'white', boxShadow: '0 0 20px rgba(139,0,255,0.4)' }}
            >
              ★ Star on GitHub
            </a>
            <a
              href="https://github.com/smouj/skill-genesis/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-bold text-sm border transition-all hover:scale-105"
              style={{ borderColor: 'rgba(255,215,0,0.3)', color: '#FFD700', background: 'transparent' }}
            >
              🐛 Report an Issue
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
