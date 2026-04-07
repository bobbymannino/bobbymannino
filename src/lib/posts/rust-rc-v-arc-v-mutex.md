---
title: "Rust: Rc v Arc v Mutex"
tagline: "Learn the most common of Rust's ownership models"
tags: ["rust"]
---

# Rust: Rc v Arc v Mutex

## What is `Rc`

`Rc` stands for **Reference Counted** and provides a way for a variable to have multiple owners. 
It allows this because instead of the variable being directly owned it is instead just a counter for how many 
other variables reference it, this means the variable will not be dropped until the count is 0.

This is very useful for having a property that has multiple links to it, for example if you had 2 structs: `Pet` 
and `Person` you could have an `owner` property on the pet that is a link to the person. But the catch is
that multiple pets can have the same owner.

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

  // At this stage there are 3 references to `Owner`, the creation object, pet1 and pet2.
  // Once all are dropped `owner` will be dropped
}
```

> Note: `Rc` is not thread safe, for this refer to `Arc`

## What is `Arc`

TODO

## What is `Mutex`

TODO

## Combining `Arc` and `Mutex`

TODO

---

## Resources

- [Rc Documentation](https://doc.rust-lang.org/std/rc/struct.Rc.html)
- [Arc Documentation](https://doc.rust-lang.org/std/sync/struct.Arc.html)
- [Mutex Documentation](https://doc.rust-lang.org/std/sync/struct.Mutex.html)
