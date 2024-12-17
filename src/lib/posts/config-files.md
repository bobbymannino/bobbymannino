---
title: Config Files
publishedOn: 2024-12-17
slug: config-files
tagline: Backing up every config file
---

# Config Files

I have taken the time to look in more details about config files, how they are stored and where they are stored. It turns out nearly every service uses a different format or location so how can i save them all in one place for peace of mind? if anything were to happen how would i get back to where i am now? well i decided to create a script to backup as many config files as i find relevent. I have backed up 5 config files;

- Git
- GitHub
- Zed
- homebrew
- Zsh

The script i built is written in shell and essentially takes each file, copes it into a git repo and commits the changes, then the restore script takes those files and copies them back into the places they belog to be used. Its very simple but allows me to take my config anywhere with ease.
