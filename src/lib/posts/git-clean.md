---
title: "Git Clean"
publishedOn: 2025-05-01
tagline: "Clean up your local git repository"
tags: ["git", "cli"]
---

# Git Clean

## What is Git Clean

Git clean is a command-line tool that allows you to remove untracked files and
directories from your local git repository. It is useful for cleaning up your
local repository after you have made changes to your codebase.

## Flags

`-i` Interactively delete untracked files

`-n` Dry run, show what would be deleted without actually deleting anything

`-f` Force delete untracked files without prompting for confirmation

`-d` Delete untracked directories

## Examples

```sh
# Force delete all untracked files/folders
git clean -df
```

```sh
# Show effects of deleting all files/folders
git clean -nd
```
