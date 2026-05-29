---
title: "Which Editor (2026)"
publishedOn: 2026-05-28
tagline: "Which editor should you use?"
series: which-editor
tags: ["zed", "vscode", "vim", "athas", "cursor", "editor"]
---

# Which Editor (2026)

## Introduction

I wrote my [first editor choice post](/blog/which-editor-2024) back in 2024 and
some things have changed. So this post will go over what has changed with the
same options, what new alternatives there are out there, and what I am currently
using.

## VS Code

### VS Code Advantages

- Cross-platform
- Stable and battle-tested
- Massive extension ecosystem
- Integrated Git control
- Works with basically every language
- GitHub Codespaces and the browser version (press `.` on any repo)
- Copilot is deeply integrated for AI assistance

### VS Code Disadvantages

- Slower — it's Electron, so not as fast as native
- Heavy on memory usage
- Feels bloated compared to newer alternatives
- Copilot adds cost on top of an already heavy editor

## Vim

### Vim Advantages

- Available on every machine without installing anything
- Fastest editor once you know it
- Cross-platform
- Extremely stable — it has been around for decades
- Highly configurable with Neovim plugins

### Vim Disadvantages

- Steep learning curve
- Neovim config can become a rabbit hole
- No GUI out of the box — requires effort to get a polished setup
- AI integrations exist but feel bolted on

## Zed

### Zed Advantages

- Fastest editor I know of
- Minimal and clean by default
- Vim mode built in
- Multiplayer/collaboration features baked in
- AI assistant built in with support for multiple models
- Extension ecosystem has grown a lot since 2024

### Zed Disadvantages

- Still maturing — some extensions you rely on in VS Code may not exist
- Less supported languages
- Less features than VS Code
- Smaller community than VS Code or Vim

## Cursor

### Cursor Advantages

- AI-first editor built on top of VS Code
- Accepts your existing VS Code extensions and settings
- Best editor tab completions
- Inline chat and agent mode for larger refactors
- Codebase indexing so the AI understands your whole project

### Cursor Disadvantages

- Subscription cost on top of everything else
- Feels like VS Code but heavier
- The AI features can encourage lazy habits
- Privacy concerns — your code is sent to their servers

## Athas

[Athas](https://athas.dev) is a very new editor and therefore it is not fully
featured or stable. It is currently at
[v0.7.1](https://github.com/athasdev/athas/releases/tag/v0.7.1) so if you use
this you can expect bugs. It is however a very fast and minimal editor while
containing the features you need. I am very excited to see where this editor
goes in the future.

### Athas Advantages

- Lightweight and minimal, built with Tauri
- AI agents with full project awareness built in
- Git operations (stage, commit, push, diff, conflict resolution) without
  leaving the editor
- Pull request tracking and review built in
- Fuzzy file search and command palette
- Available on all major platforms

### Athas Disadvantages

- Early stage — currently at v0.7.1
- No debugger support yet
- Small ecosystem compared to VS Code or Vim
- Fewer extensions and themes available

## What Do I Use?

I am still using Zed with vim mode enabled. The speed difference over VS Code
and Cursor is hard to give up, and the AI assistant built into Zed has gotten
good enough that I do not need Cursor for day-to-day work, saying that I usually
use Claude Code for AI related activity anyway. Athas is one to watch — the idea
of having Git and PR review baked in is genuinely interesting, but it is a bit
early for me to switch my main driver to it. If you are coming from VS Code and
want AI features without the baggage, Cursor is the easiest switch. If you want
something fast and modern, Zed is where I would point you.

---

## Resources

[VS Code](https://code.visualstudio.com)

[Vim](https://www.vim.org)

[Zed](https://zed.dev)

[Cursor](https://www.cursor.com)

[Athas](https://athas.dev)
