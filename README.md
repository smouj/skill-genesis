# Skill Genesis

Autonomous Skill Generator for OpenClaw - Creates OpenClaw skills automatically using Kilo AI.

## Features

- 🤖 **AI-Powered Generation**: Uses Kilo CLI to generate rich, specific SKILL.md content
- 🔄 **Retry Logic**: 3 attempts with 200s timeout per attempt
- 📦 **Auto-Publish**: Creates GitHub repo, updates Skills-Hub manifest, updates smouj profile
- 📝 **Bilingual**: Generates EN/ES documentation automatically
- 🔔 **Notifications**: Telegram alerts on skill creation

## Usage

```bash
# Run with authentication (uses gh auth token automatically)
python3 skill_genesis.py

# Dry run (test without creating repo)
python3 skill_genesis.py --dry-run
```

## Configuration

- GitHub: Uses `gh auth token` automatically (no .env needed)
- Telegram: Set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in environment

## Skills Generated

- seo-audit
- code-review
- db-optimize
- security-scan
- api-docs
- test-gen
- log-analyze
- backup-manager
- perf-monitor
- cloud-deploy

## License

MIT
