#!/usr/bin/env bash
set -euo pipefail

ROOT="${1:-$PWD/skills}"
mkdir -p "$ROOT"

if ! command -v jq >/dev/null 2>&1; then
  echo "jq is required" >&2
  exit 1
fi

repos=$(jq -r '.skills[].repo' "$PWD/manifest.json")

while IFS= read -r repo; do
  [[ -n "$repo" ]] || continue
  name="${repo#*/}"
  if [[ -d "$ROOT/$name/.git" ]]; then
    git -C "$ROOT/$name" pull --rebase
  else
    gh repo clone "$repo" "$ROOT/$name"
  fi
  echo "✓ $repo"
done <<< "$repos"
