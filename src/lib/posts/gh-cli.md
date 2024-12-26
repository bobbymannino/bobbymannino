---
title: "GitHub CLI"
publishedOn: 2024-12-26
slug: "github-cli"
tagline: "Practicing the GitHub CLI"
tags: ["github", "cli"]
---

# GitHub CLI

## What is the GitHub CLI?

The GitHub CLI is useful for things like cloning repos but also making actions
that you would otherwise make on GitHub, such as cloning a repo, creating
an issue, viewing a pull request, creating labels and much more.

## My Favorite Commands

```sh
gh repo create --private <name>
```

This one is self explanatory. It creates a new private repo on GitHub. This
saves me a huge amount of time, normally you would have to go onto GitHub >
Repos > Create, but with the CLI, it's much much quicker.

```sh
gh pr create -e
```

This opens up an editor where you enter information about a pull request you are
creating.

```sh
gh issue list -a "@me"
```

This lists all open issues that are assigned to you.

```sh
gh browse -b $(git branch --show-current)
```

This opens the current repo on the current branch in your browser.
