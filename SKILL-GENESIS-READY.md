# ✅ SKILL GENESIS — Deployment Ready Guide

Everything you need to get Skill Genesis fully operational: CLI running + landing page live.

---

## Part 1: Run the CLI

### Prerequisites

- Python 3.8+
- GitHub account with PAT (Personal Access Token)
- Kilo CLI installed (for AI generation)
- Optional: Telegram bot token

### Steps

```bash
# 1. Install Python dependencies
pip install PyGithub requests python-dotenv

# 2. Copy and configure environment
cp .env.example .env
# Open .env and set:
#   GITHUB_PAT=ghp_your_token_here
#   TELEGRAM_BOT_TOKEN=your_bot_token (optional)
#   TELEGRAM_CHAT_ID=@your_channel (optional)

# 3. Test without creating repos
python3 skill_genesis.py --dry-run

# 4. Run for real!
python3 skill_genesis.py
```

**Expected output:**
```
2026-03-01 12:00:00 - INFO - === Skill-Genesis Start ===
2026-03-01 12:00:00 - INFO - GitHub: smouj
2026-03-01 12:00:01 - INFO - Skill: seo-audit
2026-03-01 12:00:01 - INFO - Kilo attempt 1/3...
2026-03-01 12:00:06 - INFO - Kilo success on attempt 1
2026-03-01 12:00:07 - INFO - Created: smouj/seo-audit-skill
2026-03-01 12:00:08 - INFO - Updated Skills-Hub manifest
2026-03-01 12:00:09 - INFO - ✅ Done: seo-audit
```

---

## Part 2: Deploy the Landing Page

### Step 1: Install Dependencies (in /docs)

```bash
cd docs
npm install
```

### Step 2: Build Static Export

```bash
npm run build
# Output: docs/out/ directory (static HTML/CSS/JS)
```

### Step 3: Test Locally (optional)

```bash
npx serve out
# Open http://localhost:3000
```

### Step 4: Deploy to GitHub Pages

**Option A: Automatic via GitHub Actions (Recommended)**

1. Push to `main` branch — the workflow auto-deploys on every push to `docs/**`
2. Check `.github/workflows/deploy-landing.yml` for the full pipeline

**Option B: Manual via GitHub CLI**

```bash
# From repo root
npm run deploy  # builds + touches .nojekyll

# Then push the docs/out directory or configure GitHub Pages
gh api repos/smouj/skill-genesis/pages -X POST \
  -f source='{"branch":"main","path":"/docs"}'
```

### Step 5: Enable GitHub Pages in Repository Settings

1. Go to `https://github.com/smouj/skill-genesis/settings/pages`
2. Under **Source**, select:
   - Branch: `main`
   - Folder: `/docs` (for the pre-built static files)

   **OR** use **GitHub Actions** (recommended for automatic deploys)

3. Click **Save**
4. Wait 2-3 minutes for deployment
5. Visit: `https://smouj.github.io/skill-genesis`

### Step 6: Connect Custom Domain (Optional)

```bash
# Add CNAME file to docs/out
echo "yourdomain.com" > docs/out/CNAME

# Then configure DNS:
# Type: CNAME
# Name: www (or @)
# Value: smouj.github.io

# In GitHub Pages settings → Custom domain → enter yourdomain.com
# Enable "Enforce HTTPS"
```

---

## Part 3: Automate Everything

### Cron Job (Generate skills automatically)

```bash
# Edit crontab
crontab -e

# Run every hour
0 * * * * cd /path/to/skill-genesis && python3 skill_genesis.py >> logs/cron.log 2>&1

# Or every 6 hours
0 */6 * * * cd /path/to/skill-genesis && python3 skill_genesis.py >> logs/cron.log 2>&1
```

### GitHub Actions (Auto-deploy landing on push)

Already configured in `.github/workflows/deploy-landing.yml` — pushes to `main` trigger automatic deployment.

---

## Troubleshooting

| Issue | Solution |
|-------|---------|
| `ModuleNotFoundError: No module named 'github'` | Run `pip install PyGithub` |
| `GITHUB_PAT not set` | Check `.env` file exists and has token |
| `Kilo attempt 1: timeout after 200s` | Kilo CLI unavailable — script uses fallback template |
| `Skill already exists` | All 10 themes are taken — script tries 20 times then exits |
| `Lock file exists` | Another instance running, or stale lock — delete `skill_genesis.lock` |
| Landing page 404 | Ensure GitHub Pages is enabled at `/docs` folder and `.nojekyll` exists |
| CSS not loading | Check `basePath` in `docs/next.config.ts` matches your repo name |

---

## File Structure

```
skill-genesis/
├── skill_genesis.py          # Main CLI (DO NOT MODIFY)
├── skill_genesis_final.py    # Alternative version
├── skill_templates.json      # Template data
├── .env.example              # Config template
├── README.md                 # Repository README (professional)
├── SKILL-GENESIS-READY.md    # This file
│
├── docs/                     # Landing page (Next.js 15 static)
│   ├── .nojekyll             # Prevents Jekyll processing
│   ├── package.json          # npm config
│   ├── next.config.ts        # Static export config
│   ├── postcss.config.mjs    # Tailwind 4 PostCSS
│   ├── tsconfig.json         # TypeScript config
│   ├── public/
│   │   ├── og-image.svg      # Open Graph image (1200×630)
│   │   └── favicon.svg       # Browser favicon
│   └── src/
│       ├── app/
│       │   ├── layout.tsx    # Root layout + SEO metadata
│       │   ├── page.tsx      # Main page
│       │   └── globals.css   # Tailwind 4 + custom animations
│       └── components/
│           ├── Navbar.tsx          # Sticky navigation
│           ├── Hero.tsx            # Canvas particles + dragon claw
│           ├── Features.tsx        # Animated feature cards
│           ├── HowItWorks.tsx      # 6-step timeline
│           ├── SkillsGallery.tsx   # 10 skill cards with hover
│           ├── InteractiveDemo.tsx # CLI simulator
│           ├── Testimonials.tsx    # Developer testimonials
│           ├── QuickStart.tsx      # Copy-paste install guide
│           ├── Roadmap.tsx         # 2026 roadmap
│           └── Footer.tsx          # Links + GitHub
│
└── .github/
    └── workflows/
        └── deploy-landing.yml  # Auto-deploy on push to main
```

---

*Generated by Skill Genesis · OpenClaw Ecosystem · MIT License*
