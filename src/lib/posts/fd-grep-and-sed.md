---
title: "fd, grep and sed"
publishedOn: 2025-07-16
tagline: "Find, replace, find and replace"
tags: ["regex", "cli"]
---

# `fd`, `grep` and `sed`

These 3 commands are all CLI tools that can enable searching for files, searching for text, find and replace in files

## `fd`

[`fd`](https://github.com/sharkdp/fd) is a fast, user-friendly alternative to
the `find` command. It has some extra features compared to `find` such as ignore
files in `.gitignore`, syntax highlighting, faster and more.

### `fd` Options

• `-t [f|d]` - Specify the type; file or folder

• `-e [extension]` - Specify the file extension (e.g 'md')

• `-x [command]` - A command to execute for each found record

### Using `fd`

```shell
# Find all folders in current directory
fd --type d
```

```shell
# Find all markdown files in current directory
fd -e md
```

```shell
# Output all log files in current directory
fd -e log -x cat
```

## `grep`

Use grep to check if a file contains a pattern. You can also output each line
that matches with the lines above or below.

### `grep` Options

• `-v` - Invert match (match lines NOT containing pattern)

• `-i` - Ignore case

• `-c` - Count the number of matches

• `-r` - Recursively search in subdirectories

• `-n` - Output line number

• `-A [number]` - Output number of lines after match

• `-B [number]` - Output number of lines before match

### Using `grep`

```shell
# Find the number of occurrences of 'mine' in a file
grep -c 'mine' file.txt
```

```shell
# Find all files containing 'my_variable_name'
grep -r 'my_variable_name' .
```

```shell
# Save into a file all occurrences of 'bob' with 5 lines above and below the match
grep -r -A 5 -B 5 'bob' . > output.txt
```

## `sed`

Use `sed` to find and replace text in files.

### `sed` Options

• `-i` - Edit files in-place

• `-e [command]` - A command to execute for each found record

### Using `sed`

```shell
# Replace all occurrences of 'old' with 'new' in a file
sed -i 's/old/new/g' file.txt
```

```shell
# Display the changes:
# Replace (case insensitive) 'OLD' with 'new'
sed -i 's/OLD/new/gi' file.txt
```

## All Together Now

If we put these all together we could create a find and replace for all matches
of a pattern in a directory:

```shell
# '{}' is the file path passed from fd
fd -e md -x sed -i 's/old/new/g' {}
```

Display the count of matches for a variable in the current directory:

```shell
fd -e md -x grep -c 'my_variable_name' {}
```

Output the number of files that contains the word 'bob':

```shell
fd -t f -x grep -c 'bob' {} | grep -v '^0$' | wc -l
```
