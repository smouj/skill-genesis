'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    icon: '🎲',
    title: 'Select a Skill Theme',
    description:
      'Skill Genesis randomly picks from 10 predefined themes (seo-audit, code-review, security-scan, etc.) and checks GitHub to ensure the repo doesn\'t already exist.',
    code: 'slug, name, category, purpose, tags = random.choice(SKILL_THEMES)',
    color: '#8B00FF',
  },
  {
    number: '02',
    icon: '🧠',
    title: 'Generate with Kilo AI',
    description:
      'Sends a rich, specific prompt to Kilo CLI. The AI generates a detailed SKILL.md with real commands, examples, and expertise — not generic placeholders.',
    code: 'kilo run "Generate SKILL.md for: {name}..." --timeout 200',
    color: '#FFD700',
  },
  {
    number: '03',
    icon: '📂',
    title: 'Create Bilingual Files',
    description:
      'Builds SKILL.md, SKILL.es.md, README.md, and README.es.md — four files covering English and Spanish documentation automatically.',
    code: 'files = create_skill_files(slug, name, category, purpose, content)',
    color: '#00FFCC',
  },
  {
    number: '04',
    icon: '🚀',
    title: 'Publish to GitHub',
    description:
      'Creates the repository `smouj/{skill-name}-skill`, uploads all files via GitHub API, and makes it immediately public and accessible.',
    code: 'repo = user.create_repo(name=repo_name, private=False)',
    color: '#FF6B6B',
  },
  {
    number: '05',
    icon: '📋',
    title: 'Update Skills-Hub Manifest',
    description:
      'Adds the new skill to the manifest.json in smouj/Skills-Hub so it\'s instantly discoverable by all OpenClaw ecosystem users.',
    code: 'repo.update_file("manifest.json", f"Add skill: {slug}", ...)',
    color: '#8B00FF',
  },
  {
    number: '06',
    icon: '🔔',
    title: 'Notify via Telegram',
    description:
      'Sends a formatted Telegram message with the skill name and repo URL so you\'re always in the loop, even running headlessly.',
    code: 'requests.post(f"api.telegram.org/bot{token}/sendMessage", json={...})',
    color: '#FFD700',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 px-4 overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(139,0,255,0.04), transparent)' }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs uppercase tracking-widest mb-4"
            style={{ border: '1px solid rgba(255,215,0,0.3)', color: '#FFD700', background: 'rgba(255,215,0,0.06)' }}
          >
            <span>🗺</span> How It Works
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            From command to{' '}
            <span style={{ color: '#FFD700' }}>published skill</span>
            <br />
            in 6 automated steps
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Run <code className="text-purple-400">python3 skill_genesis.py</code> and watch the full pipeline execute automatically.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px hidden sm:block"
            style={{ background: 'linear-gradient(to bottom, #8B00FF, #FFD700, #8B00FF)', opacity: 0.3 }}
          />

          <div className="space-y-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`relative flex gap-6 md:gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Number node (center on desktop) */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-black text-sm"
                    style={{
                      background: `radial-gradient(circle, ${step.color}30, #0A0A0A)`,
                      border: `2px solid ${step.color}`,
                      boxShadow: `0 0 20px ${step.color}50`,
                      color: step.color,
                    }}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Card */}
                <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                  <div
                    className="p-5 rounded-2xl card-hover"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: `1px solid ${step.color}25`,
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="text-xs font-black px-2 py-0.5 rounded font-mono"
                        style={{ background: `${step.color}20`, color: step.color }}
                      >
                        STEP {step.number}
                      </span>
                      <span className="text-xl">{step.icon}</span>
                      <h3 className="text-white font-bold">{step.title}</h3>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{step.description}</p>
                    <div
                      className="rounded-lg px-4 py-2.5 font-mono text-xs overflow-x-auto"
                      style={{ background: 'rgba(0,0,0,0.5)', border: `1px solid ${step.color}20`, color: step.color }}
                    >
                      {step.code}
                    </div>
                  </div>
                </div>

                {/* Spacer for alternate layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center p-6 rounded-2xl"
          style={{ background: 'rgba(139,0,255,0.06)', border: '1px solid rgba(139,0,255,0.2)' }}
        >
          <p className="text-gray-300 text-sm">
            💡 Use <code className="text-purple-400 text-xs bg-purple-900/20 px-1.5 py-0.5 rounded">--dry-run</code> flag to test the full pipeline without creating any GitHub repos or sending notifications.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
