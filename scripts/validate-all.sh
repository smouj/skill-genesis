#!/usr/bin/env bash
set -euo pipefail

ROOT="${1:-$PWD/skills}"
FAIL=0

check_contains() {
  local file="$1"
  local pattern="$2"
  if ! grep -q "$pattern" "$file"; then
    echo "  ✗ missing pattern '$pattern' in $(basename "$file")"
    FAIL=1
  fi
}

check_contains_i() {
  local file="$1"
  local pattern="$2"
  if ! grep -qi "$pattern" "$file"; then
    echo "  ✗ missing pattern '$pattern' in $(basename "$file")"
    FAIL=1
  fi
}

for d in "$ROOT"/*; do
  [[ -d "$d" ]] || continue
  echo "Checking $(basename "$d")"

  for f in SKILL.md SKILL.es.md README.md README.es.md; do
    if [[ ! -f "$d/$f" ]]; then
      echo "  ✗ missing $f"
      FAIL=1
    fi
  done

  if [[ -f "$d/SKILL.md" ]]; then
    check_contains "$d/SKILL.md" '^---'
    check_contains "$d/SKILL.md" '^name:'
    check_contains "$d/SKILL.md" '^description:'
    check_contains "$d/SKILL.md" '^version:'
    check_contains "$d/SKILL.md" '^tags:'
    check_contains "$d/SKILL.md" '^metadata:'
    check_contains "$d/SKILL.md" '## 🎯 Cuándo usar esta Skill'
    check_contains "$d/SKILL.md" '## 📋 Proceso de Trabajo Obligatorio'
    check_contains "$d/SKILL.md" '## ⚡ Reglas de Oro'
    check_contains "$d/SKILL.md" '## 📤 Formato de Salida Requerido'
  fi

  if [[ -f "$d/README.md" ]]; then
    check_contains_i "$d/README.md" 'Language: English'
    check_contains_i "$d/README.md" 'Idioma: Español'
    check_contains_i "$d/README.md" 'overview'
    check_contains_i "$d/README.md" 'inputs'
    check_contains_i "$d/README.md" 'outputs'
    check_contains_i "$d/README.md" 'guardrails'
    check_contains_i "$d/README.md" 'troubleshooting'
  fi

  if [[ -f "$d/README.es.md" ]]; then
    check_contains_i "$d/README.es.md" 'Language: English'
    check_contains_i "$d/README.es.md" 'Idioma: Español'
    check_contains_i "$d/README.es.md" 'descripci'
    check_contains_i "$d/README.es.md" 'entradas'
    check_contains_i "$d/README.es.md" 'salidas'
    check_contains_i "$d/README.es.md" 'guardrails'
    check_contains_i "$d/README.es.md" 'troubleshooting'
  fi

  echo "  ✓ done"
done

if [[ "$FAIL" -ne 0 ]]; then
  echo "Validation failed"
  exit 1
fi

echo "All skills validated successfully"
