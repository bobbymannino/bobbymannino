---
title: "Git CLI"
publishedOn: 2024-12-26
tagline: "Learning the git CLI, and why it's better then a GUI"
tags: ["git", "cli"]
---

# Git CLI

## Why use the Git CLI?

Using the git CLI at first was difficult, going from using the built-in tab in
VS Code to GitHub Desktop and then the CLI was a step and a half. While GitHub
Desktop has some neat features and a nice visualisation for repos, the fine
grain control that using the CLI brings is unmatched.

Something that has saved me a lot of time is using aliases such as `gll` for
logging. These have saved me a huge amount of time and I don't have to remember
the specific flags of every command I most commonly use.

### Benefits of the CLI

- Fine grain control
- Add by hunks
- Rebase/Merge
- Accessable on most machines

### Drawbacks of the CLI

- Have to memorize commands
- Learning curve

## My Common Commands

```sh
git add <.|-A|-i|-p>
```

Using `-i` or `-p` flag will put you in patch mode or interactive mode where you
have a wizard to help what hunks/files you want to stage. The `-A` or `.` flag
will add the current directory or all files.

```sh
git checkout <-b> <branch|->
```

Checkout is a command that switches branches, using `-` will switch to the
previous branch. Using the `-b` flag will create a branch.

```sh
git commit -m "<title>" -m "<body>"
```

Commiting it using the staged files and creating a commit out of them along with
some meta information such as title, date, etc. You can drop the `-m`s and it
will open up a file to write the commit message in an editor.

```sh
git log --decorate --oneline --graph
```

Logging is one of the most useful commands, this allows you to see a graph of
the repo history, If you have branches it will show them visually as different
nodes. If shows the SHA and a commit title. A really useful tool for locating
branches splitting or joining and just to see a general history of the repo.

```sh
git rebase -i HEAD~10
```

Rebasing is a useful tool for editing the commit history. The interactive flag
allows for a file to open in your editor to edit commits. The `HEAD~10` in this
is to get the last 10 commits from the head. In the editor you have the choice
to reword, reorder, squash, etc commits, afterwards the CLI will rebase the
commits and you can push - or sometimes force push - to remote.

```sh
git merge <branch>
```

Merging is taking two branches and merging them into one using a new commit.
There are other ways to merge and flags you can pass in, but the one I most
commonly use to merge a branch is this. This is a good way to keep a feature
branch up to date with the main branch.

```sh
git stash <list> <-m "<message>"> <pop> <drop>
```

Stashing is taking files and stashing them away for later. Stashing takes on the
style of a stack, first in is last out (unless using the index flag). Using the
`-m` flag adds a message to the stash so you can easily see them in the list.

```sh
git tag -a <tag name> <commit sha> -m "<title>"
```

This will create a tag for the given commit, tags are really useful for creating
checkpoints in your code that you can come back to later on and easily identify.
