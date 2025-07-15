---
title: "Regex Capture Groups"
publishedOn: 2025-07-15
tagline: "Grab and go with regex"
tags: ["regex"]
---

# Regex Capture Groups

## What are Regex Capture Groups?

Regex capture groups are a powerful feature of regular expressions that allow
you to extract specific parts of a string that match a pattern. They are defined
using parentheses `()` in the regex pattern.

## Some Examples

### Getting a Domain from a URL

Imagine the URLs `https://www.google.com`, `http://www.google.com`,
`http://www.google.com?page=2`, `https://google.com`. And say you wanted to get
the SLD (Second Level Domain) from all of them (which would be `google.com`).
How do you do that? Well you would use a capture group like so:

```regex
(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})
```

This will only capture specific urls prefixed `http://`, `https://`, `www.`.
There are regexs for much more complicated urls but for a demonstration this
will do.

https?://(?<domain>[^/]+)/(?<path>.*)

### Getting Date Components from a Date

Lets say you want to get the date, month and year from a date string. The
following regex would split the date (`22/12/1979`) into 3 parts.

```regex
(\d{1,2})/(\d{1,2})/(\d{4})
```

`(\d{1,2})` Captures the first digit or two before the first slash (month)

`(\d{1,2})` Captures the second digit or two before the second slash (month)

`(\d{4})` Captures the four digits after the second slash (year)

## In JavaScript

An example of how to use capture groups in JavaScript to get the username and
domain of an email address:

```javascript
const email = "manninobobby@icloud.com";

const regex = /([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
const match = email.match(regex);

if (match) {
  const username = match[1]; // manninobobby
  const domain = match[2]; // icloud.com
}
```

## Greedy vs Non-Greedy

The difference between greedy and non-greedy is that greedy matches as much as
possible, while non-greedy matches as little as possible. The syntax for greedy
is `.+` and for non-greedy is `.+?`.

Take this HTML as an example:

```html
<p>First paragraph</p>
<p>Second paragraph with a couple more words</p>
```

If you wanted to get everything between the first opening paragraph tag and the
last closing paragraph tag, you could use a greedy match:

```regex
<p>(.*)</p>
```

But if you wanted to only match between the first opening paragraph tag and the
first closing paragraph tag, you could use a non-greedy match:

```regex
<p>(.*?)</p>
```

## Do Not Capture Groups

What I mean by this is to match a group but not capture it, for instance if you
wanted to get the domain of an email address but ignore the username and '@' you
could do something like this:

```regex
(?:[a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})
```
