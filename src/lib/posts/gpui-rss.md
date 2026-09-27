---
title: "GPUI RSS"
publishedOn: 2026-09-27
tagline: "A simple RSS viewer written in Rust with GPUI"
tags: ["rss", "rust", "gpui"]
---

# GPUI RSS

[GPUI RSS](https://github.com/bobbymannino/gpui-rss) is a desktop application
made in Rust using the [GPUI framework](https://gpui.rs). GPUI is a framework
developed by [Zed](https://zed.dev) for building applications. This project also
uses [GPUI Kit](https://gpui-kit.com) which is a component library for GPUI, it
makes building applications much easier.

## What is GPUI RSS

![Screenshot of GPUI RSS](/blog/gpui-rss-screenshot.png)

The application is very simple, in fact, it only has a handful of abilities. You
can add or remove sources; a source is a RSS feed. You can also list posts from
those sources. Clicking on a post will open the post in a browser and mark it as
read. That is all. The application was made as a proof of concept instead of a
genuine production worthy application.

## Running GPUI RSS

To run the project you need to clone the repository and build it using Cargo.
The instructions are also in the projects
[README.md](https://github.com/bobbymannino/gpui-rss).

```sh
git clone https://github.com/bobbymannino/gpui-rss
```

```sh
cd gpui-rss
```

```sh
cargo run -r
```

---

## Resources

[GPUI RSS GitHub](https://github.com/bobbymannino/gpui-rss)

[This Blog's RSS Feed](/blog.xml)

[GPUI Kit Homepage](https://gpui-kit.com)

[GPUI Homepage](https://gpui.rs)

[Zed Homepage](https://zed.dev)
