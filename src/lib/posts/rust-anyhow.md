---
title: "Rust: anyhow"
publishedOn: 2026-05-10
tagline: "Stop wrestling with mixed error types and start adding context"
tags: ["rust"]
---

# Rust: anyhow

Once you have written a bit of Rust you start to notice the same friction over
and over: every fallible function returns a different error type, and the `?`
operator only works when those types line up. You can solve this by hand with
`From` impls and a custom error enum, but for application code there is a
simpler tool: [anyhow](https://docs.rs/anyhow).

`anyhow` gives you one error type, `anyhow::Error`, that swallows almost any
other error and lets you attach context as you go.

## Installing

```sh
cargo add anyhow
```

## The basic shape

The crate exposes `anyhow::Result<T>`, which is just an alias for
`Result<T, anyhow::Error>`. Use it as the return type of any function that can
fail in more than one way.

```rs
use anyhow::Result;
use std::fs;

fn read_config() -> Result<String> {
  let contents = fs::read_to_string("config.toml")?;
  Ok(contents)
}
```

The `?` works because `anyhow::Error` implements `From<E>` for any `E` that
implements `std::error::Error`. You no longer have to declare the exact error
type at every layer.

## Mixing error types

This is where `anyhow` really earns its keep. Mixing `io::Error`,
`ParseIntError`, and a custom error in one function used to mean writing `From`
impls or mapping each error by hand.

```rs
use anyhow::Result;
use std::fs;

fn load_port() -> Result<u16> {
  let raw = fs::read_to_string("port.txt")?; // io::Error
  let port: u16 = raw.trim().parse()?;       // ParseIntError
  Ok(port)
}
```

Both errors flow into the same `anyhow::Error` without any extra ceremony.

## Adding context

A bare error like `No such file or directory (os error 2)` is rarely useful on
its own. The `Context` trait adds a description to any `Result`.

```rs
use anyhow::{Context, Result};
use std::fs;

fn load_port() -> Result<u16> {
  let path = "port.txt";

  let raw = fs::read_to_string(path)
    .with_context(|| format!("failed to read {path}"))?;

  let port: u16 = raw
    .trim()
    .parse()
    .with_context(|| format!("{path} did not contain a valid port"))?;

  Ok(port)
}
```

When this fails, the error chain reads from the outside in:

```txt
Error: failed to read port.txt

Caused by:
    No such file or directory (os error 2)
```

> Use `context` for a fixed string and `with_context` for one that needs
> formatting. The closure form only runs when there is actually an error, so it
> is free on the happy path.

## Creating errors

You can build an `anyhow::Error` from a string with the `anyhow!` macro, or
return one early with `bail!`.

```rs
use anyhow::{anyhow, bail, Result};

fn check_age(age: i32) -> Result<()> {
  if age < 0 {
    bail!("age cannot be negative, got {age}");
  }

  if age > 150 {
    return Err(anyhow!("age {age} looks suspicious"));
  }

  Ok(())
}
```

`bail!(...)` is just `return Err(anyhow!(...))`.

## Inspecting the cause

Most of the time you just print the error and move on. When you need to react
to a specific underlying error, use `downcast_ref`.

```rs
use anyhow::Result;
use std::io;

fn run() -> Result<()> {
  // ...
  Ok(())
}

fn main() {
  if let Err(e) = run() {
    if let Some(io_err) = e.downcast_ref::<io::Error>() {
      if io_err.kind() == io::ErrorKind::NotFound {
        eprintln!("config missing, using defaults");
        return;
      }
    }

    eprintln!("{e:?}");
  }
}
```

The `{:?}` formatter prints the full chain of causes, which is what you usually
want at the top level.

## anyhow vs thiserror

The two crates solve different problems and are often used together.

- anyhow is for applications. You do not care about the exact type of an error,
  you just want to bubble it up with context and report it.
- thiserror is for libraries. Callers need a concrete enum so they can match on
  variants and recover from specific failures.

A common pattern is for a library to expose its own `thiserror`-derived enum,
and the application that consumes the library to wrap everything in
`anyhow::Result` at the boundary.

## Conclusion

`anyhow` is the path of least resistance for error handling in application
code.

- Return `anyhow::Result<T>` from anything fallible.
- Use `?` freely; the conversions are handled for you.
- Attach `context` or `with_context` so the error message tells a story.
- Use `bail!` and `anyhow!` to create errors from a string.
- Reach for `thiserror` when you are building a library that other people will
  match against.

Most of the boilerplate that used to come with Rust error handling disappears,
and what is left is just enough to be useful.

---

## Resources

[anyhow on docs.rs](https://docs.rs/anyhow)

[thiserror on docs.rs](https://docs.rs/thiserror)

[Error handling in Rust](https://doc.rust-lang.org/book/ch09-00-error-handling.html)
