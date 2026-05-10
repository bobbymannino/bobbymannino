---
title: "Rust: Errors and Options"
publishedOn: 2026-05-10
tagline: "Learn the basics of handling errors and optionals with Option and Result"
tags: ["rust"]
---

# Rust: Errors and Options

Rust does not have `null` and it does not have exceptions. Instead it leans on
two enums from the standard library: `Option<T>` for values that might be
absent, and `Result<T, E>` for operations that might fail. The compiler forces
you to deal with both, which removes a whole category of runtime bugs.

## What is `Option`

`Option<T>` represents a value that may or may not be there. It has two
variants: `Some(T)` when there is a value, and `None` when there is not.

```rs
enum Option<T> {
  Some(T),
  None,
}
```

A common place you will see it is when looking up something that might not
exist, like an item in a vector by index.

```rs
fn main() {
  let names = vec!["Bob", "Will", "Sooty"];

  let first = names.first(); // Option<&&str>

  match first {
    Some(name) => println!("First name: {name}"),
    None => println!("The list is empty"),
  }
}
```

## What is `Result`

`Result<T, E>` represents an operation that can either succeed with a value of
type `T` or fail with an error of type `E`. It has two variants: `Ok(T)` and
`Err(E)`.

```rs
enum Result<T, E> {
  Ok(T),
  Err(E),
}
```

You will see it everywhere fallible work happens: parsing strings, reading
files, making network requests.

```rs
fn parse_age(input: &str) -> Result<u32, std::num::ParseIntError> {
  input.parse::<u32>()
}

fn main() {
  match parse_age("42") {
    Ok(age) => println!("Age is {age}"),
    Err(e) => println!("Could not parse age: {e}"),
  }
}
```

## Handling values

The most explicit way to handle either type is with `match`, but that can get
verbose. Rust gives you a few shortcuts.

### `unwrap` and `expect`

Both pull the inner value out, and both panic if the value is missing. The
difference is that `expect` lets you provide a message.

```rs
fn main() {
  let value: Option<i32> = Some(10);
  let n = value.unwrap(); // 10

  let parsed: Result<i32, _> = "5".parse();
  let n = parsed.expect("input should be a valid number"); // 5
}
```

> Reach for `unwrap` and `expect` in tests, prototypes, or when you can prove
> the value is present. Avoid them in code paths where a panic would be a real
> problem.

### `unwrap_or` and `unwrap_or_else`

Provide a fallback when the value is missing instead of panicking.

```rs
fn main() {
  let port: Option<u16> = None;
  let port = port.unwrap_or(8080);

  let parsed: Result<i32, _> = "not a number".parse();
  let n = parsed.unwrap_or_else(|_| 0);
}
```

### `if let`

When you only care about one variant, `if let` is cleaner than a full `match`.

```rs
fn main() {
  let name: Option<&str> = Some("Bob");

  if let Some(n) = name {
    println!("Hello, {n}");
  }
}
```

## The `?` operator

The `?` operator is the idiomatic way to propagate errors. It unwraps an `Ok`
or `Some` value, and on `Err` or `None` it returns early from the function with
that value.

```rs
use std::fs;
use std::io;

fn read_config() -> Result<String, io::Error> {
  let contents = fs::read_to_string("config.toml")?;
  Ok(contents)
}
```

That `?` is shorthand for:

```rs
let contents = match fs::read_to_string("config.toml") {
  Ok(c) => c,
  Err(e) => return Err(e),
};
```

It also works on `Option` inside a function that returns `Option`.

```rs
fn first_char(s: &str) -> Option<char> {
  let first = s.chars().next()?;
  Some(first.to_ascii_uppercase())
}
```

> The error type returned by `?` must match (or be convertible into) the error
> type of the function. For mixing error types, look into crates like
> `anyhow` or `thiserror`.

## Converting between `Option` and `Result`

Sometimes you have an `Option` but the surrounding function returns a
`Result`, or the other way around. There are helpers for both directions.

```rs
fn main() {
  let maybe_name: Option<&str> = None;

  // Option -> Result
  let result: Result<&str, &str> = maybe_name.ok_or("name was missing");

  // Result -> Option
  let parsed: Option<i32> = "42".parse::<i32>().ok();
}
```

## Conclusion

`Option` and `Result` are how Rust forces you to think about absence and
failure up front, instead of discovering them at runtime.

- Use `Option<T>` when a value might not exist.
- Use `Result<T, E>` when an operation might fail and you want to explain why.
- Use `match` or `if let` when you need to handle each variant explicitly.
- Use `unwrap_or` and friends when you have a sensible fallback.
- Use `?` to propagate errors up the call stack with very little ceremony.

Once you get used to these two enums, a lot of Rust's safety story clicks into
place. The compiler is not getting in your way; it is just making sure the
unhappy paths get handled.

---

## Resources

[Option Documentation](https://doc.rust-lang.org/std/option/enum.Option.html)

[Result Documentation](https://doc.rust-lang.org/std/result/enum.Result.html)

[The `?` Operator](https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html#a-shortcut-for-propagating-errors-the--operator)
