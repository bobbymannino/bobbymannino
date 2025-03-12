---
title: "Regex is Really Useful"
publishedOn: 2025-01-09
tagline: "Is regex worth learning about? Yes."
thumbnailSrc: "regex.jpg"
thumbnailAlt: "Regex"
tags: ["regex"]
---

# Regex is Really Useful

Regex is a really useful tool that I have not utilised enough, hopefully with
this post as a guide I can incorporate it more into my workflow.

## What is Regex?

Regex is short for "regular expressions". It is a powerful tool for matching
patterns in text. It is used in many programming languages and text editors to
search for and manipulate text. It can also be used for replacing strings within
a string.

## How does Regex Work?

Regex works by using a pattern to match text. The pattern is made up of special
characters that represent different types of characters. For example, `\s` would
match a single whitespace character, and `\d` would match a single digit
character.

## Patterns

What I mean by patterns is what you can use to identify a string.

### Start & End

There are 2 really important characters that you should be aware of: `^` and
`$`. The caret `^` matches the start of a string and the dollar sign `$` matches
the end of a string. This is useful for when you want to match a string that
starts with a certain character or ends with a certain character.

```typescript
const xp = new RegExp(/^word$/);

const str = "word";

const doesMatch = xp.test(str);
// doesMatch = true
```

### Brackets

There are 3 types of brackets to be aware of:

`{}` - These are used to quantify the preceding expression

`[]` - These are used to match a single character from a list of characters

`()` - These are used to group expressions together

```typescript
const xp = new RegExp(/^[a-z]{3}$/);
// This will match any 3 lowercase English letters

const xp = new RegExp(/^(a|b)c$/);
// This will match:
// - "ac"
// - "bc"
```

### Negation

Negation is used to match any character that is not in a list of characters.
This can be done using the caret, For example, `[^a]` will match any character
that is not `a`.

```typescript
const xp = new RegExp(/^[^a]$/);
// This will match any single character that is not "a"
```

### Quantifiers

Quantifiers are used to match a certain number of characters.

`?` Matches the preceding pattern 0 or 1 times

`*` Matches the preceding pattern 0 or more times

`+` Matches the preceding pattern 1 or more times

`{n}` Matches the preceding pattern exactly n times

`{n,}` Matches the preceding pattern n or more times

`{n,m}` Matches the preceding pattern between n and m times

By default all matches have to pass for a test to return true, think of it using
the and operator, to use the or operator you can use the `|` character.

```typescript
const xp = new RegExp(/^(bob){2}(tom)?$/);
// will match
// - "bobbob"
// - "bobbobtom"

const str = "bobbob";

const doesMatch = xp.test(str);
// doesMatch = true
```

### Sinlge Characters

Single characters are the most basic type of pattern. They match a single
character in the text. For example, `a` would match `a` and `a` only. There are
special cases where you can apply a range to a character. For example, `A-Z`
which will match all upper case english letters. The same will apply for numbers.

```typescript
const xp = new RegExp(/^[a-z]{2}A$/);
// will match any two lowercase English characters followed by an uppercase "A"
```

### Special Characters

Special characters are characters that have a special meaning in regex. For
example, the dot `.` will match any character except a newline character. The
backslash `\` is used to escape special characters. For example, `\\` will match
a single backslash character. Important ones to learn are:

`\b` Word boundary (start or end of a word)

`\B` Non-word boundary

`\w` Word character (alphanumeric & underscore)

`\W` Non-word character

`\d` Digit character (0-9)

`\D` Non-digit character

`\s` Whitespace character ( )

`\S` Non-whitespace character

`.` Any character except a newline character

```typescript
const xp = new RegExp(/\bword\b/);
// will match the word "word" but not "words"

const xp = new RegExp(/\d{3}/);
// will match any 3 digit number

const xp = new RegExp(/(\s)*/);
// will match any number of whitespace characters

const xp = new RegExp(/(\w){3,18}/);
// will match any word that is between 3 and 18 characters long
// this would be quite useful for something like a username
```

### Flags

Flags are used to change the behavior of a regular expression. There are 6 flags
that can be used:

`g` Global - Matches all occurrences of the pattern

`i` Case-insensitive - Matches the pattern regardless of case

`m` Multiline - Matches the pattern across multiple lines

`u` Unicode - Matches the pattern as a Unicode string

`y` Sticky - Matches the pattern only at the start of the string

`s` Dotall - Matches the pattern across multiple lines

```typescript
const xp = new RegExp(/word/g);
// will match all occurrences of the word "word"

const xp = new RegExp(/word/i);
// will match the word "word" regardless of case
```

### Lookaround

Lookaround is used to match a pattern only if it is followed or preceded by
another pattern. There are 4 types of lookaround:

`(?=...)` Positive lookahead

`(?!...)` Negative lookahead

`(?<=...)` Positive lookbehind

`(?<!...)` Negative lookbehind

```typescript
const xp = new RegExp(/^a(?=b{1,2})$/);
// This will match the single letter `a` if it is followed by 1 or 2 occurrences
// of the letter `b`
```

Something like positive lookhead is really useful for doing complex find and
replace where you would want to keep the center of something the same.

In this example we are replacing the bad words if the name they are being called
is 'bob' or 'Bob'

```typescript
const str =
  "Bob is bad. Will is naughty, Tom is naughty, Tom is bad, Bob is good, bob is naughty.";

const xp = new RegExp(/(?<=(B|b)ob\sis\s)(bad|naughty)/, "g");

const newStr = str.replace(xp, "good");

console.log(newStr);
// "Bob is good. Will is naughty, Tom is naughty, Tom is bad, Bob is good, bob is good."
```

In this example we want to return all the names that come before 'BAD'

```typescript
const names = `Bob BAD
Tom BAD
Will GOOD
Bob GOOD
Greg BAD`;

const xp = new RegExp(/\w+(?=\sBAD)/, "g");

const matches = names.match(xp);
// ["Bob", "Tom", "Greg"]
```

Note that if there are no matches it will return `null`
