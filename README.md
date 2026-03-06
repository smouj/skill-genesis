<div align="center">

# ⚡ OpenClaw Skill Genesis

<img width="1200" height="630" alt="image" src="https://github.com/user-attachments/assets/9dc9f77f-1918-4319-bb25-e2c81447d81b" />

### AI-Powered Autonomous Skill Generator for the OpenClaw Ecosystem

<br/>

[![Stars](https://img.shields.io/github/stars/smouj/skill-genesis?style=for-the-badge&color=FFD700&labelColor=0A0A0A&logo=github)](https://github.com/smouj/skill-genesis/stargazers)
[![License](https://img.shields.io/badge/License-MIT-8B00FF?style=for-the-badge&labelColor=0A0A0A)](https://github.com/smouj/skill-genesis/blob/main/LICENSE)
[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&labelColor=0A0A0A&logo=python&logoColor=3776AB)](https://python.org)
[![Kilo AI](https://img.shields.io/badge/Kilo_AI-Powered-8B00FF?style=for-the-badge&labelColor=0A0A0A)](https://github.com/smouj)
[![OpenClaw](https://img.shields.io/badge/OpenClaw-Ecosystem-FFD700?style=for-the-badge&labelColor=0A0A0A)](https://github.com/smouj/skill-genesis)

<br/>

**[🌐 Landing Page](https://smouj.github.io/skill-genesis) · [⚡ Quick Start](#-quick-start) · [📖 Docs](#-installation) · [🗺 Roadmap](#-roadmap-2026)**

---

> **One command. Full pipeline. AI generates → GitHub publishes → Telegram notifies.**

</div>

---

## 🌐 Ver Landing Page → [smouj.github.io/skill-genesis](https://smouj.github.io/skill-genesis)

---

## 🎯 What Is Skill Genesis?

**Skill Genesis** is an autonomous Python CLI that creates complete, production-ready [OpenClaw](https://github.com/smouj/skill-genesis) skills using Kilo AI. Run one command and watch the full pipeline execute:

1. 🎲 **Selects** a skill theme from 10 battle-tested categories
2. 🧠 **Generates** rich SKILL.md content via Kilo AI (3× retry, 200s timeout)
3. 📂 **Creates** bilingual files (EN + ES) — SKILL.md, README, and more
4. 🚀 **Publishes** a new GitHub repository automatically
5. 📋 **Updates** the skill-genesis manifest.json for ecosystem discoverability
6. 🔔 **Notifies** via Telegram so you're always in the loop

---

## ⚡ Quick Start

```bash
# 1. Clone
git clone https://github.com/smouj/skill-genesis.git
cd skill-genesis

# 2. Install
pip install PyGithub requests python-dotenv

# 3. Configure
cp .env.example .env
# Edit .env: add GITHUB_PAT and optionally TELEGRAM_BOT_TOKEN

# 4. Run!
python3 skill_genesis.py
```

> **Test without side effects:** `python3 skill_genesis.py --dry-run`

---

## 📦 Installation

### Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Python | 3.8+ | Runtime |
| pip | Latest | Package manager |
| GitHub CLI (`gh`) | Optional | Auto token detection |
| Kilo CLI | Latest | AI generation |

### Install dependencies

```bash
pip install PyGithub requests python-dotenv
```

---

## ⚙️ Configuration

```bash
# .env — copy from .env.example
GITHUB_PAT=ghp_xxxxxxxxxxxxxxxxxxxx      # Required: GitHub Personal Access Token
TELEGRAM_BOT_TOKEN=123456:ABC-xxx        # Optional: Telegram bot notifications
TELEGRAM_CHAT_ID=@your_channel_or_id    # Optional: Where to send notifications
SKILLS_HUB_REPO=smouj/skill-genesis        # skill-genesis manifest repo
SMOUJ_PROFILE_REPO=smouj/smouj          # Profile README repo
```

> **GitHub PAT Scopes needed:** `repo`, `workflow`, `admin:repo_hook`

---

## 🎮 Generated Skills

| Emoji | Skill | Category | Description | Status |
|-------|-------|----------|-------------|--------|
| 🔍 | seo-audit | SEO | Technical SEO analyzer — Core Web Vitals, meta, sitemap | ![Ready](https://img.shields.io/badge/Ready-22c55e?style=flat-square) |
| 💻 | code-review | Coding | Comprehensive code quality & security review | ![Ready](https://img.shields.io/badge/Ready-22c55e?style=flat-square) |
| 🗄 | db-optimize | DevOps | PostgreSQL query & index optimizer | ![Ready](https://img.shields.io/badge/Ready-22c55e?style=flat-square) |
| 🛡 | security-scan | Security | Vulnerability scanner with nmap, trivy, bandit | ![Ready](https://img.shields.io/badge/Ready-22c55e?style=flat-square) |
| 📖 | api-docs | Writing | OpenAPI 3.0 / Swagger docs generator | ![Ready](https://img.shields.io/badge/Ready-22c55e?style=flat-square) |
| 🧪 | test-gen | Coding | Unit & integration test generator | ![Ready](https://img.shields.io/badge/Ready-22c55e?style=flat-square) |
| 📊 | log-analyze | Analysis | Log parser & anomaly detector | ![Ready](https://img.shields.io/badge/Ready-22c55e?style=flat-square) |
| 💾 | backup-manager | DevOps | Backup schedule & restore manager | ![Ready](https://img.shields.io/badge/Ready-22c55e?style=flat-square) |
| 📈 | perf-monitor | DevOps | CPU/memory/network performance monitor | ![Ready](https://img.shields.io/badge/Ready-22c55e?style=flat-square) |
| ☁ | cloud-deploy | DevOps | AWS/GCP/Azure deployer with Kubernetes | ![Ready](https://img.shields.io/badge/Ready-22c55e?style=flat-square) |

---

## 🚀 Usage

```bash
# Standard run — creates repo, publishes skill, notifies Telegram
python3 skill_genesis.py

# Dry run — full pipeline simulation without any GitHub/Telegram calls
python3 skill_genesis.py --dry-run

# Automate with cron (every hour)
0 * * * * cd /path/to/skill-genesis && python3 skill_genesis.py >> logs/cron.log 2>&1
```

---

## 🔥 Features

| Feature | Description |
|---------|-------------|
| 🤖 **Kilo AI Generation** | Rich, specific SKILL.md — real commands, not placeholders |
| 🔄 **3× Retry Logic** | Retries with 200s timeout + category-specific fallback template |
| 📦 **Auto-Publish** | Creates GitHub repo, uploads all files via GitHub API |
| 📝 **Bilingual** | Generates EN + ES documentation automatically |
| 🌐 **skill-genesis Integration** | Updates manifest.json for ecosystem discoverability |
| 🔔 **Telegram Alerts** | Real-time notifications on skill creation |
| 🔒 **Lock File Protection** | PID-based locking prevents concurrent runs |
| ⚙️ **Zero Config Auth** | Auto-detects `gh auth token` if no .env found |

---

## 🌍 Landing Page

> 🌐 **Live at:** [smouj.github.io/skill-genesis](https://smouj.github.io/skill-genesis)

The landing page is a Next.js 15 static site in `/docs` with:
- Dark Cyber-Fantasy theme (#0A0A0A · #8B00FF · #FFD700)
- Interactive canvas particle system + dragon claw animation
- Browser-based CLI demo simulator
- Framer Motion animations throughout
- GitHub Pages auto-deploy via GitHub Actions

---

## 🤝 Contributing

```bash
# 1. Fork & clone
gh repo fork smouj/skill-genesis --clone && cd skill-genesis

# 2. Create a branch
git checkout -b feature/my-improvement

# 3. Test
python3 skill_genesis.py --dry-run

# 4. PR
gh pr create --title "feat: my improvement"
```

**What to contribute:** New skill themes · Bug fixes · Documentation · Translations

---


## 🔔 Telegram Alerts

<img width="446" height="459" alt="Captura de pantalla (940)" src="https://github.com/user-attachments/assets/54fe0bfe-55f3-46a4-8c89-abb945a32fd0" />

---

## 🗺 Roadmap 2026

| Quarter | Feature | Status |
|---------|---------|--------|
| Q1 2026 | Initial release — 10 skills, Kilo AI, GitHub auto-publish | ✅ Done |
| Q2 2026 | Custom YAML config, Discord webhooks, Web dashboard | 🔄 In Progress |
| Q3 2026 | REST API, GitHub Actions integration, Skill marketplace | 📋 Planned |
| Q4 2026 | Multi-language, OpenClaw v2 protocol support | 📋 Planned |

---

## 📄 License

MIT © 2026 [smouj](https://github.com/smouj)

---

<div align="center">

**Built with ⚡ Kilo AI · Part of the [OpenClaw](https://github.com/smouj/skill-genesis) Ecosystem**

[🌐 Landing](https://smouj.github.io/skill-genesis) · [★ Star](https://github.com/smouj/skill-genesis) · [🐛 Bug](https://github.com/smouj/skill-genesis/issues) · [💡 Feature](https://github.com/smouj/skill-genesis/issues/new?labels=enhancement)

</div>
