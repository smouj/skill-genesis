#!/usr/bin/env python3
"""
Skill-Genesis - Autonomous Skill Generator for OpenClaw
"""

import os
import sys
import json
import time
import random
import logging
import subprocess
import re
from datetime import datetime
from pathlib import Path
from dotenv import load_dotenv
import requests
from github import Github

SCRIPT_DIR = Path(__file__).parent
LOG_DIR = SCRIPT_DIR / "logs"
LOCK_FILE = SCRIPT_DIR / "skill_genesis.lock"
ENV_FILE = SCRIPT_DIR / ".env"

LOG_DIR.mkdir(exist_ok=True)
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(LOG_DIR / f"skill_genesis_{datetime.now().strftime('%Y%m%d')}.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

load_dotenv(ENV_FILE)

# Get GitHub token from .env or use gh auth
GITHUB_PAT = os.getenv("GITHUB_PAT")
if not GITHUB_PAT:
    try:
        GITHUB_PAT = subprocess.run(["gh", "auth", "token"], capture_output=True, text=True, timeout=5).stdout.strip()
    except:
        pass

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")
SKILLS_HUB_REPO = os.getenv("SKILLS_HUB_REPO", "smouj/Skills-Hub")
SMOUJ_PROFILE_REPO = os.getenv("SMOUJ_PROFILE_REPO", "smouj/smouj")

# Categories for random skill generation
CATEGORIES = ["coding", "research", "writing", "design", "analysis", "marketing", "devops", "security", "automation", "data", "infrastructure"]

# Skill type prefixes for random generation
SKILL_PREFIXES = ["auto", "smart", "hyper", "ultra", "meta", "cross", "poly", "omni", "flex", "dynamic", "prime", "max", "super", " turbo", "rapid"]
SKILL_NOUNS = ["scanner", "generator", "analyzer", "optimizer", "builder", "maker", "finder", "tracker", "monitor", "watcher", "executor", "orchestrator", "weaver", "crafter", "architect"]

def generate_random_skill_theme(github) -> tuple:
    """Generate a random, unique skill theme using AI"""
    categories_str = ", ".join(CATEGORIES)
    
    prompt = f"""Generate a skill: slug:name:category:purpose:tags

Example: data-miner:Data Miner:analysis:Extracts data:data, mining, extract

Make it creative and unique. Category: {categories_str}

Generate:"""
    
    # Try to generate via Kilo
    result = subprocess.run(
        ["kilo", "run", prompt],
        capture_output=True,
        text=True,
        timeout=180,
        env={**os.environ, "NO_COLOR": "1"}
    )
    
    if result.returncode == 0:
        output = result.stdout.strip()
        lines = output.split('\n')
        for line in lines:
            line = line.strip()
            if ':' in line:
                parts = line.split(':')
                if len(parts) >= 5:
                    slug = parts[0].strip().lower().replace(' ', '-')
                    name = parts[1].strip()
                    category = parts[2].strip().lower()
                    purpose = parts[3].strip()
                    tags = parts[4].strip()
                    
                    # Check if repo already exists
                    try:
                        github.get_repo(f"smouj/{slug}-skill")
                        logger.info(f"Generated skill {slug} already exists, trying again...")
                        continue
                    except:
                        return (slug, name, category, purpose, tags)
    
    # Fallback: generate random locally
    prefix = random.choice(SKILL_PREFIXES)
    noun = random.choice(SKILL_NOUNS)
    category = random.choice(CATEGORIES)
    slug = f"{prefix}-{noun}"
    
    return (slug, f"{prefix.title()} {noun.title()}", category, f"AI-powered {noun} for {category} tasks", f"{category}, ai, automation")
EXPERTISE_LEVELS = ["expert", "senior", "specialist", "master"]

def check_lock():
    if LOCK_FILE.exists():
        with open(LOCK_FILE) as f: 
            pid = f.read().strip()
        try:
            os.kill(int(pid), 0)
            return False
        except: 
            LOCK_FILE.unlink()
    with open(LOCK_FILE, "w") as f: 
        f.write(str(os.getpid()))
    return True

def release_lock():
    if LOCK_FILE.exists(): 
        LOCK_FILE.unlink()

def generate_with_kilo(prompt: str, max_retries: int = 3) -> str:
    """Generate content using Kilo CLI with retry logic"""
    for attempt in range(1, max_retries + 1):
        try:
            logger.info(f"Kilo attempt {attempt}/{max_retries}...")
            result = subprocess.run(
                ["kilo", "run", prompt],
                capture_output=True,
                text=True,
                timeout=200,
                env={**os.environ, "NO_COLOR": "1"}
            )
            if result.returncode == 0:
                output = result.stdout
                output = re.sub(r'\x1b\[[0-9;]*m', '', output)
                lines = output.split('\n')
                content = '\n'.join(lines[1:]).strip()
                if len(content) > 100:
                    logger.info(f"Kilo success on attempt {attempt}")
                    return content
                else:
                    logger.warning(f"Kilo attempt {attempt}: content too short ({len(content)} chars)")
        except subprocess.TimeoutExpired:
            logger.warning(f"Kilo attempt {attempt}: timeout after 200s")
        except Exception as e:
            logger.warning(f"Kilo attempt {attempt}: {e}")
        
        if attempt < max_retries:
            logger.info(f"Retrying in 3 seconds...")
            time.sleep(3)
    
    logger.warning(f"Kilo failed after {max_retries} attempts, using fallback")
    return None

def generate_skill_content(skill_name, name, category, purpose, tags):
    """Generate full SKILL.md content using Kilo"""
    expertise = random.choice(EXPERTISE_LEVELS)
    
    prompt = f"""Generate a RICH, SPECIFIC and DETAILED OpenClaw SKILL.md file for: {name}

This is NOT a template. Generate REAL content specific to: {skill_name}

Requirements:
1. YAML frontmatter with real metadata
2. Purpose section with REAL use cases (not generic)
3. Scope with SPECIFIC commands (not placeholders)
4. Detailed work process with REAL steps
5. Golden rules specific to this skill
6. Examples with REAL inputs/outputs
7. Rollback commands specific to this skill

For {name} ({category}):
- Real purpose: {purpose}
- Real tags: {tags}

Generate content that shows you understand {name} deeply. Include:
- Specific CLI commands with real flags
- Example prompts users would actually type
- Environment variables if needed
- Dependencies and requirements
- Verification steps specific to this skill
- Troubleshooting common issues

Respond ONLY with the complete SKILL.md content (no explanations).
"""
    
    content = generate_with_kilo(prompt)
    
    if content and len(content) > 200:
        return content
    
    # Fallback template - RICO Y ESPECÍFICO por categoría
    category_hints = {
        "seo": "- Tools: curl, wget, grep, sed, awk, lighthouse, ahrefs, semrush\n- Commands: `lighthouse <url>`, `curl -I <url>`\n- Metrics: Core Web Vitals, meta tags, sitemap.xml, robots.txt",
        "coding": "- Tools: git, eslint, prettier, typecheck, test frameworks\n- Commands: `npm run lint`, `npm test`, `npm run build`\n- Focus: code quality, security, best practices",
        "devops": "- Tools: docker, docker-compose, kubectl, terraform, ansible\n- Commands: `docker ps`, `docker logs`, `docker exec`\n- Focus: infrastructure, deployment, monitoring",
        "security": "- Tools: nmap, nikto, sqlmap, bandit, trivy\n- Commands: `nmap -sV <target>`, `trivy fs <dir>`\n- Focus: vulnerabilities, hardening, compliance",
        "writing": "- Tools: grammar checkers, style guides, markdown formatters\n- Commands: `proselint`, `markdownlint`\n- Focus: clarity, tone, structure",
        "analysis": "- Tools: jq, pandas, matplotlib, excel, csv tools\n- Commands: `jq '.data'`, `pandas --version`\n- Focus: insights, patterns, visualizations",
    }
    hint = category_hints.get(category, f"- Focus on {category} tasks")
    
    return f"""---
name: {skill_name}
description: >
  {purpose}. Activates when user mentions {tags}.
version: "1.0.0"
tags: [{category}, openclaw, skill-agent]
metadata:
  author: "@smouj"
  category: {category}
  expertise: {expertise}
  repo: https://github.com/smouj/{skill_name}-skill
  license: MIT
---

# {name} - {expertise.title()} Expert

You are a {expertise} in {name}. Your mission is deliver professional, production-ready results.

## 🎯 When to Use This Skill
- **Use when user mentions:** {purpose}
- **Ideal situations:** {category} tasks, optimization, automation
- **DO NOT use for:** unrelated tasks, experimental features without approval

## 📋 Scope
{hint}

## 📋 Mandatory Work Process

1. **Step 1 - Initial Analysis**
   - Define objective and scope
   - Identify constraints (budget, time, security)
   - Evaluate risks
   - Check existing tools/configurations

2. **Step 2 - Planning**
   - Design minimal plan (max 3 steps)
   - Define exact commands/actions
   - Document verification steps
   - Prepare rollback commands

3. **Step 3 - Execution**
   - Execute incrementally (never all at once)
   - Capture evidence (logs, output)
   - Protect secrets (never expose tokens/keys)
   - Stop on first error

4. **Step 4 - Validation & Refinement**
   - Verify results against objective
   - Test edge cases
   - Update documentation if needed

## ⚡ Golden Rules
1. Always verify before executing (dry-run when possible)
2. Never expose secrets in output (redact tokens, keys, passwords)
3. Document rollback steps BEFORE making changes
4. Prioritize security over speed
5. Maintain idempotency (run multiple times safely)

## 🔧 Common Commands
```bash
# Example commands for {name}
# Add real commands specific to this skill
```

## 📤 Required Output Format
```markdown
## Summary
- Objective: [what was sought]
- Result: [what was obtained]
- Status: ✅ PASS / ❌ FAIL

## Plan Applied
1. [Step 1] - [evidence]
2. [Step 2] - [evidence]
3. [Step 3] - [evidence]

## Verification
- [Verification command]: [result]
- Rollback: [command if needed]
```

## 🚨 Troubleshooting
- Common issue 1: [solution]
- Common issue 2: [solution]

## 📚 Requirements
- Dependencies: [list]
- Environment: [requirements]
"""

def translate_to_spanish(content: str, content_type: str = "skill") -> str:
    """Translate content to Spanish using Kilo"""
    if content_type == "readme":
        prompt = f"""Translate this README to Spanish. Keep the markdown format, badges, and structure. Make it natural and professional Spanish:

{content}

Translate to Spanish:"""
    else:
        prompt = f"""Translate this SKILL.md to Spanish. Keep the markdown format, YAML frontmatter, and structure. Make it natural and professional Spanish. Translate:
- "You are" → "Eres"
- "When to Use" → "Cuándo Usar"
- "Scope" → "Alcance"
- "Work Process" → "Proceso de Trabajo"
- "Golden Rules" → "Reglas de Oro"
- "Required Output Format" → "Formato de Salida Requerido"
- "Troubleshooting" → "Solución de Problemas"
- "Requirements" → "Requisitos"
- Keep all code blocks in English
- Keep English technical terms that are commonly used in Spanish

Content to translate:
{content}

Spanish translation:"""

    result = generate_with_kilo(prompt, max_retries=2)
    if result and len(result) > 100:
        return result
    logger.warning("Translation failed, using English version")
    return content

def create_skill_files(skill_name, name, category, purpose, content):
    files = {}
    
    # English versions
    files["SKILL.md"] = content
    files["README.md"] = f"""# {name}

[![ES](https://img.shields.io/badge/ES-Español-red)](README.es.md)

{name} skill for OpenClaw.

## What It Solves
{purpose}.

## Features
- Automatic activation when relevant tasks are detected
- Professional, production-ready results
- Security-first approach
- Rollback support

## Usage
/{skill_name}

## Example
```
Analyze code for {category} issues.
```

## Installation
This skill is automatically available in OpenClaw.

## License
MIT

## Author
[@smouj](https://github.com/smouj)
"""
    
    # Spanish versions - translate with Kilo
    logger.info(f"Translating SKILL.es.md to Spanish...")
    files["SKILL.es.md"] = translate_to_spanish(content, "skill")
    
    logger.info(f"Translating README.es.md to Spanish...")
    readme_en = files["README.md"]
    files["README.es.md"] = translate_to_spanish(readme_en, "readme")
    
    return files

def create_github_repo(github, skill_name, files, category=None):
    try:
        user = github.get_user()
        repo_name = f"{skill_name}-skill"
        repo = user.create_repo(name=repo_name, description=f"OpenClaw skill: {skill_name}", private=False, has_wiki=False, auto_init=False)
        logger.info(f"Created: {repo.full_name}")
        
        # Set topics for visibility
        topics = ["openclaw", "skill", "ai-agent", "agent"]
        if category:
            topics.append(category)
        # Add relevant topics based on skill name
        for keyword in ["code", "dev", "build", "test"]:
            if keyword in skill_name.lower():
                topics.append("developer-tools")
                break
        for keyword in ["seo", "web", "marketing"]:
            if keyword in skill_name.lower():
                topics.append("marketing")
                break
        for keyword in ["data", "analyze", "metric"]:
            if keyword in skill_name.lower():
                topics.append("data")
                break
        for keyword in ["security", "audit", "scan"]:
            if keyword in skill_name.lower():
                topics.append("security")
                break
        for keyword in ["deploy", "infra", "cloud"]:
            if keyword in skill_name.lower():
                topics.append("devops")
                break
        
        try:
            repo.replace_topics(topics)
            logger.info(f"Set topics: {', '.join(topics)}")
        except Exception as e:
            logger.warning(f"Could not set topics: {e}")
        
        for filename, content in files.items():
            try:
                repo.create_file(path=filename, message=f"Add {filename}", content=content.encode('utf-8'))
                logger.info(f"Uploaded {filename}")
            except Exception as e:
                logger.warning(f"Upload {filename}: {e}")
        return True
    except Exception as e:
        logger.error(f"Repo error: {e}")
        return False

def update_skills_hub(github, skill_name, repo_url):
    """Update Skills-Hub manifest.json"""
    try:
        logger.info(f"Updating Skills-Hub manifest...")
        repo = github.get_repo(SKILLS_HUB_REPO)
        try:
            manifest = repo.get_contents("manifest.json")
            data = json.loads(manifest.decoded_content.decode())
        except:
            data = {"skills": []}
        
        emoji = random.choice(["⚡", "🛡️", "🔍", "🚀", "💡", "🎯", "📊", "🔧", "🧠", "✨"])
        
        new_entry = {
            "name": skill_name,
            "repo": f"smouj/{skill_name}-skill",
            "emoji": emoji,
            "tag": skill_name.split("-")[0],
            "status": "Ready",
            "version": "1.0.0",
            "defaultBranch": "main"
        }
        
        data["skills"] = [s for s in data.get("skills", []) if s.get("name") != skill_name]
        data["skills"].append(new_entry)
        
        repo.update_file(path="manifest.json", message=f"Add skill: {skill_name}", content=json.dumps(data, indent=2), sha=manifest.sha)
        logger.info(f"Updated Skills-Hub manifest")
        return True
    except Exception as e:
        logger.error(f"Skills-Hub manifest error: {e}")
        return False

def update_smouj_profile(github, skill_name, repo_url, purpose):
    """Update smouj/smouj README.md with new skill"""
    try:
        logger.info(f"Updating smouj profile README...")
        repo = github.get_repo(SMOUJ_PROFILE_REPO)
        
        try:
            readme = repo.get_contents("README.md")
            content = readme.decoded_content.decode()
        except Exception as e:
            logger.warning(f"Could not read README: {e}")
            return False
        
        # Check if skill already exists
        if f"{skill_name}-skill" in content:
            logger.info(f"Skill already in profile")
            return True
        
        # Find the skills table - exact format from smouj/smouj
        emoji = random.choice(["⚡", "🛡️", "🔍", "🚀", "💡", "🎯", "📊", "🔧", "🧠", "✨"])
        # Format: | emoji | **Skill-Name** | [smouj/repo](url) | purpose | ![Status](badge) | Difficulty | Potential |
        new_row = f"| {emoji} | **{skill_name}-skill** | [smouj/{skill_name}-skill](https://github.com/smouj/{skill_name}-skill) | {purpose} | ![Ready](https://img.shields.io/badge/Ready-22c55e?style=flat-square) | 🟡 Medium | High |"
        
        lines = content.split("\n")
        insert_idx = None
        for i, line in enumerate(lines):
            if "|:------:|:------|" in line or "| &nbsp; | Skill |" in line:
                insert_idx = i + 1
                break
        
        if insert_idx:
            lines.insert(insert_idx, new_row)
            content = "\n".join(lines)
            
            repo.update_file(path="README.md", message=f"Add skill: {skill_name}", content=content, sha=readme.sha)
            logger.info(f"Updated smouj profile README")
            return True
        else:
            logger.warning("Could not find skills table in profile README")
            return False
            
    except Exception as e:
        logger.error(f"smouj profile error: {e}")
        return False

def send_telegram(skill_name, repo_url):
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        return False
    try:
        msg = f"✨ *New Skill Generated!*\n\n*Name:* `{skill_name}-skill`\n*Repo:* {repo_url}\n*Status:* Ready ✅"
        url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
        requests.post(url, json={"chat_id": TELEGRAM_CHAT_ID, "text": msg, "parse_mode": "Markdown"}, timeout=10)
        return True
    except:
        return False

def main(dry_run=False):
    logger.info("=== Skill-Genesis Start ===")
    
    if not check_lock():
        logger.warning("Another instance running")
        return
    
    try:
        github = Github(GITHUB_PAT)
        logger.info(f"GitHub: {github.get_user().login}")
        
        # Select theme - generate random until we find one that doesn't exist
        for attempt in range(30):
            slug, name, category, purpose, tags = generate_random_skill_theme(github)
            try:
                github.get_repo(f"smouj/{slug}-skill")
                logger.info(f"Skill {slug}-skill already exists, trying again...")
                continue
            except Exception as e:
                if "Not Found" not in str(e):
                    logger.warning(f"Error checking repo: {e}")
                # Repo doesn't exist, we can use this slug
                logger.info(f"Generated new skill: {slug}")
                break
        else:
            logger.error("No available skill slots found after 30 attempts")
            return
        
        logger.info(f"Skill: {slug} ({name})")
        
        # Generate content
        content = generate_skill_content(slug, name, category, purpose, tags)
        
        # Create files
        files = create_skill_files(slug, name, category, purpose, content)
        
        if dry_run:
            logger.info(f"[DRY RUN] {slug}")
            return
        
        # Create repo
        if not create_github_repo(github, slug, files, category):
            return
        
        repo_url = f"https://github.com/smouj/{slug}-skill"
        
        # Update Skills-Hub manifest
        update_skills_hub(github, slug, repo_url)
        
        # Update smouj profile
        update_smouj_profile(github, slug, repo_url, purpose)
        
        # Telegram
        send_telegram(slug, repo_url)
        
        logger.info(f"✅ Done: {slug}")
        logger.info(f"   Repo: {repo_url}")
        
    except Exception as e:
        logger.exception(f"Error: {e}")
    finally:
        release_lock()

if __name__ == "__main__":
    if "--dry-run" in sys.argv:
        main(dry_run=True)
    else:
        # Get frequency from .env or default to 2 hours
        frequency_hours = float(os.getenv("FREQUENCY_HOURS", 1))
        frequency_seconds = int(frequency_hours * 3600)
        
        logger.info(f"=== Skill Genesis Loop Started ===")
        logger.info(f"Frequency: every {frequency_hours} hours")
        
        while True:
            try:
                main(dry_run=False)
            except Exception as e:
                logger.exception(f"Error in main loop: {e}")
            
            logger.info(f"Sleeping for {frequency_hours} hours...")
            time.sleep(frequency_seconds)
