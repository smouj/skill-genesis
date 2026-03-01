'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Alejandro Ruiz',
    handle: '@alexdev_oc',
    avatar: 'AR',
    role: 'OpenClaw Core Contributor',
    rating: 5,
    text: 'Skill Genesis saved me hours. I used to manually write SKILL.md files and publish repos — now I run one command and grab a coffee. The Kilo AI integration is chef\'s kiss.',
    color: '#8B00FF',
  },
  {
    name: 'María Fernández',
    handle: '@mafe_codes',
    avatar: 'MF',
    role: 'DevOps Engineer @ TechLatam',
    rating: 5,
    text: 'The auto-Telegram notification blew my mind the first time. Ran it at night, woke up to a "New Skill Generated!" message with the GitHub link. Autonomous development is real.',
    color: '#FFD700',
  },
  {
    name: 'Carlos Mendoza',
    handle: '@cmendoza_ai',
    avatar: 'CM',
    role: 'AI Researcher, OpenClaw Ecosystem',
    rating: 5,
    text: 'The bilingual output (EN + ES) is a game-changer for the Spanish-speaking dev community. Two READMEs, two SKILL files, generated in one shot. Incredible.',
    color: '#00FFCC',
  },
  {
    name: 'Valentina Torres',
    handle: '@val_fullstack',
    avatar: 'VT',
    role: 'Full-Stack Dev & OpenClaw User',
    rating: 5,
    text: 'The retry logic saved my skin during a Kilo outage. It automatically fell back to the template, which was still super detailed and category-specific. Production-grade reliability.',
    color: '#FF6B6B',
  },
  {
    name: 'David García',
    handle: '@dg_automation',
    avatar: 'DG',
    role: 'Automation Specialist',
    rating: 5,
    text: 'I set this as a cron job and it generated 8 skills while I slept. Skills-Hub manifest updated, profile updated, GitHub repos live. This is what autonomous AI should be.',
    color: '#8B00FF',
  },
  {
    name: 'Sofía López',
    handle: '@sofia_secdev',
    avatar: 'SL',
    role: 'Security Engineer',
    rating: 5,
    text: 'The security-scan skill it generated has REAL nmap commands, trivy flags, and bandit configurations — not generic placeholders. Kilo actually understands the domain.',
    color: '#FFD700',
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#FFD700' }} className="text-sm">★</span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="relative py-28 px-4 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(139,0,255,0.03), transparent)' }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs uppercase tracking-widest mb-4"
            style={{ border: '1px solid rgba(255,215,0,0.3)', color: '#FFD700', background: 'rgba(255,215,0,0.06)' }}
          >
            <span>💬</span> Testimonials
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            Loved by{' '}
            <span style={{ color: '#FFD700' }}>OpenClaw developers</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-xl mx-auto"
          >
            Developers across the OpenClaw ecosystem are shipping skills faster than ever before.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.handle}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -3 }}
              className="relative p-5 rounded-2xl cursor-default overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid ${t.color}20`,
                transition: 'all 0.3s ease',
              }}
            >
              {/* Glow accent */}
              <div
                className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                style={{ background: `radial-gradient(circle at top right, ${t.color}10, transparent 70%)` }}
              />

              {/* Stars */}
              <div className="mb-3">
                <StarRating count={t.rating} />
              </div>

              {/* Quote */}
              <p className="text-gray-300 text-sm leading-relaxed mb-5 relative">
                <span className="text-3xl leading-none opacity-20 absolute -top-1 -left-1" style={{ color: t.color }}>"</span>
                <span className="relative z-10">{t.text}</span>
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{ background: `${t.color}20`, border: `1px solid ${t.color}40`, color: t.color }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.handle} · {t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social proof bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-center gap-6 text-center"
          style={{ background: 'rgba(255,215,0,0.04)', border: '1px solid rgba(255,215,0,0.15)' }}
        >
          <div>
            <div className="text-2xl font-black" style={{ color: '#FFD700' }}>★ 4.9/5</div>
            <div className="text-gray-500 text-xs">Average rating</div>
          </div>
          <div className="w-px h-10 bg-gray-800 hidden sm:block" />
          <div>
            <div className="text-2xl font-black text-white">200+</div>
            <div className="text-gray-500 text-xs">Skills generated</div>
          </div>
          <div className="w-px h-10 bg-gray-800 hidden sm:block" />
          <div>
            <div className="text-2xl font-black text-white">50+</div>
            <div className="text-gray-500 text-xs">OpenClaw developers</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
