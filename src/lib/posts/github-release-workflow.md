---
title: "GitHub Release Workflow"
tagline: "Automate GitHub releases through Actions and Git tags"
tags: ["github", "ci/cd"]
publishedOn: 2026-08-08
---

# Github Release Workflow

GitHub releases is a way to turn a Git tag into a versioned, shareable snapshot
of your repository complete with release notes, downloadable assets, and a
changelog. Instead of manually drafting notes and publishing through the GitHub
UI, you can automate the whole flow. Push a tag like `v0.1.0` and let a GitHub
Actions workflow build the notes and create the release for you, as seen in
[sapere v0.1.0](https://github.com/bobbymannino/sapere/releases/tag/v0.1.0).

You can customize the workflow to include authors, commit hashes, PR IDs and
much more.

## Sapere Release Workflow

GitHub Actions (sometimes called workflows) are automated tasks that run on
GitHub. They can be triggered by many different things and can contain multiple
steps each with a specific action to perform. They are designed in a `yaml` file
within `.github/workflows/<workflow>.yaml`. GitHub then picks up the workflow
automatically and runs in when it's due.

```yaml
# .github/workflows/release.yaml
name: Release

on:
  push:
    tags:
      - "v*"

permissions:
  contents: write

jobs:
  release:
    runs-on: ubuntu-slim
    steps:
      - uses: actions/checkout@v7
        with:
          fetch-depth: 0

      - name: Build release notes
        id: notes
        env:
          TAG: ${{ github.ref_name }}
          REPO_URL: ${{ github.server_url }}/${{ github.repository }}
          GH_TOKEN: ${{ github.token }}
        run: |
          .github/scripts/release-notes.sh > release-notes.md
          cat release-notes.md

      - name: Create release
        env:
          GH_TOKEN: ${{ github.token }}
        run: gh release create "${{ github.ref_name }}" --title "${{ github.ref_name }}" --notes-file release-notes.md
```

There are special tokens that are automatically populated by GitHub such as `${{ github.ref_name }}` and `${{ github.server_url }}`.

The `release-notes.sh` is a separate bash script that I have decided to write in
its own file, it is normal for the script to remain within the workflow file but
for simplicity and testing I split it into its own file.

```sh
# .github/scripts/release-notes.sh
#!/usr/bin/env bash
# Print markdown release notes for a tag to stdout.
#
# Usage: TAG=v0.0.2 REPO_URL=https://github.com/owner/repo .github/scripts/release-notes.sh
#
# Commits are listed as "- <title> — @handle". A trailing "(#123)" becomes a
# link to the PR; commits without one link to their SHA instead.
#
# GitHub handles are resolved via `gh api`, so this needs an authenticated gh
# (GH_TOKEN in CI, `gh auth login` locally). Commits whose author can't be
# resolved to an account fall back to the plain git author name.
set -euo pipefail

TAG="${TAG:?TAG is required}"
REPO_URL="${REPO_URL:?REPO_URL is required}"

# "https://github.com/owner/repo" -> "owner/repo"
REPO=$(printf '%s' "$REPO_URL" | sed 's|^.*://[^/]*/||')

PREV_TAG=$(git describe --tags --abbrev=0 "$TAG^" 2>/dev/null || true)

if [ -n "$PREV_TAG" ]; then
  RANGE="$PREV_TAG..$TAG"
else
  RANGE="$TAG"
fi

# Cache lookups so repeat authors cost one API call, not one per commit.
CACHE_DIR=$(mktemp -d)
trap 'rm -rf "$CACHE_DIR"' EXIT

# handle_for <sha> <email> <author name> -> "@login", or the name if unresolvable
handle_for() {
  sha=$1 email=$2 name=$3
  cache_key=$(printf '%s' "$email" | tr -c 'A-Za-z0-9' '_')
  cache_file="$CACHE_DIR/$cache_key"

  if [ ! -f "$cache_file" ]; then
    # On failure gh writes the error body to stdout, so only trust it on exit 0.
    if ! login=$(gh api "repos/$REPO/commits/$sha" --jq '.author.login // empty' 2>/dev/null); then
      login=""
    fi
    if [ -n "$login" ]; then
      printf '@%s' "$login" > "$cache_file"
    else
      printf '%s' "$name" > "$cache_file"
    fi
  fi

  cat "$cache_file"
}

echo "## What's changed"
echo

# tformat (not format) so the last line ends in a newline and `read` sees it.
git log --no-merges --pretty=tformat:'%s%x09%an%x09%ae%x09%h' "$RANGE" | while IFS=$'\t' read -r subject author email hash; do
  # [0-9][0-9]* rather than \+ so this works under BSD sed too.
  pr=$(printf '%s' "$subject" | sed -n 's/.*(#\([0-9][0-9]*\))$/\1/p')
  if [ -n "$pr" ]; then
    subject=$(printf '%s' "$subject" | sed "s|(#$pr)\$|([#$pr]($REPO_URL/pull/$pr))|")
  else
    subject="$subject ([\`$hash\`]($REPO_URL/commit/$hash))"
  fi
  echo "- $subject — $(handle_for "$hash" "$email" "$author")"
done

echo
if [ -n "$PREV_TAG" ]; then
  echo "**Full changelog**: $REPO_URL/compare/$PREV_TAG...$TAG"
fi
```

---

## Resources

[GitHub Actions](https://github.com/features/actions)

[GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases)
