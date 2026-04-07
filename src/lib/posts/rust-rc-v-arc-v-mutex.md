---
title: "Rust: Rc v Arc v Mutex"
publishedOn: 2026-04-07
tagline: "Learn the most common of Rust's ownership models"
tags: ["rust"]
---

# Rust: Rc v Arc v Mutex

## What is `Rc`

`Rc` stands for **Reference Counted** and provides a way for a variable to have
multiple owners. It allows this because instead of the variable being directly
owned it is instead just a counter for how many other variables reference it,
this means the variable will not be dropped until the count is 0.

This is very useful for having a property that has multiple links to it, for
example if you had 2 structs: `Pet` and `Person` you could have an `owner`
property on the pet that is a link to the person. But the catch is that multiple
pets can have the same owner.

```rs
use std::rc::Rc;

struct Person {
  name: String,
}

struct Pet {
  name: String,
  owner: Rc<Person>,
}

fn main() {
  let owner = Rc::new(Person { name: String::from("Bob") });

  let pet1 = Pet {
    name: String::from("Will"),
    owner: Rc::clone(&owner),
  };

  let pet2 = Pet {
    name: String::from("Sooty"),
    // There are 2 different syntaxes for cloning a reference
    owner: owner.clone(),
  };

  println!("Pet 1 Owner: {}", pet1.owner.name);
  println!("Pet 2 Owner: {}", pet2.owner.name);

  // At this stage there are 3 references to `owner`:
  // the owner variable, pet1.owner and pet2.owner.
  // Once all are dropped, the Person value is dropped.
}
```

> Note: `Rc` is not thread safe, for this refer to `Arc`.

## What is `Arc`

`Arc` stands for **Atomically Reference Counted**. It is the thread-safe version
of `Rc`.

Like `Rc`, it gives shared ownership of a value. The difference is that `Arc`
updates its reference count atomically, which makes it safe to share across
threads. `Arc` only allows for read only access.

Use `Arc` when:

- you need multiple owners,
- those owners may be on different threads,
- and shared read access is enough.

```rs
use std::sync::Arc;
use std::thread;

fn main() {
  let shared_message = Arc::new(String::from("Hello from Arc"));
  let mut handles = Vec::new();

  for i in 0..3 {
    let msg = Arc::clone(&shared_message);

    handles.push(thread::spawn(move || {
      println!("Thread {i}: {msg}");
    }));
  }

  for handle in handles {
    handle.join().unwrap();
  }

  // Value is dropped only after all Arc owners are dropped.
}
```

> `Arc` does not make mutation safe by itself. If you need shared mutable
> access, combine `Arc` with synchronization primitives like `Mutex`.

## What is `Mutex`

`Mutex` stands for **Mutual Exclusion**. It ensures that only one thread at a
time can access (mutate) protected data.

You call `lock()` to acquire access. That returns a guard (`MutexGuard`), and
the lock is automatically released when the guard goes out of scope.

```rs
use std::sync::Mutex;

fn main() {
  let counter = Mutex::new(0);

  {
    let mut value = counter.lock().unwrap();
    *value += 1;
  } // lock released here

  println!("Counter: {}", *counter.lock().unwrap());
}
```

Key points:

- `lock()` returns a `Result` because a mutex can become poisoned if a thread
  panics while holding the lock.
- Keep the locked section as short as possible.
- `Mutex` controls access, but by itself it does not provide multi-owner sharing
  across threads (that is what `Arc` is for).

## Combining `Arc` and `Mutex`

```rs
// This is a common pattern for shared mutable state across threads
Arc<Mutex<T>>
```

- `Arc` lets multiple threads own the same value.
- `Mutex` ensures only one thread mutates it at a time.

```rs
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
  let counter = Arc::new(Mutex::new(0));
  let mut handles = Vec::new();

  for _ in 0..10 {
    let counter = Arc::clone(&counter);

    handles.push(thread::spawn(move || {
      let mut value = counter.lock().unwrap();
      *value += 1;
    }));
  }

  for handle in handles {
    handle.join().unwrap();
  }

  println!("Final count: {}", *counter.lock().unwrap()); // 10
}
```

This pattern is simple and reliable. For very high contention workloads, consider
other approaches like atomics or message passing channels depending on the use
case.

## Conclusion

`Rc`, `Arc`, and `Mutex` all solve different ownership problems in Rust, and
choosing the right one depends mostly on two things: **threading** and
**mutability**.

- Use `Rc<T>` when you need shared ownership in a single-threaded context.
- Use `Arc<T>` when you need shared ownership across multiple threads.
- Use `Mutex<T>` when you need safe mutable access, one owner at a time.
- Use `Arc<Mutex<T>>` when multiple threads need to both own and mutate the same
  value.

A good rule of thumb is: start with the simplest model (`Rc` or plain ownership),
and only move to `Arc` or `Mutex` when your design requires thread sharing or
shared mutation.

---

## Resources

[Rc Documentation](https://doc.rust-lang.org/std/rc/struct.Rc.html)

[Arc Documentation](https://doc.rust-lang.org/std/sync/struct.Arc.html)

[Mutex Documentation](https://doc.rust-lang.org/std/sync/struct.Mutex.html)
