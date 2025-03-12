---
title: "Types of Tests"
publishedOn: 2025-02-06
tagline: "What are the different types of software tests?"
tags: ["tests"]
---

# Types of Software Tests

There are lots of ways to classify software testing, but for this post I will
explain static and dynamic testing, along with some examples for each.

## Static Testing

Static testing is testing code without running it, this could be for more
reasons then just if the code works, it could be to check if the code is
formatted or styled a certain way.

Static testing is often so quick that it is ran by default in realtime when
writing code, if you use something like [Zed](https://zed.dev), it will come
with a formmater by default.

### Linters

A great example of static testing would be a linter (like
[ESLint](https://eslint.org)) or a formatter (like
[Prettier](https://prettier.io)). Prettier is an opinionated code formatter, it
uses the options provided (or defaults) to style your code. It uses indents,
tabs vs spaces, traling commas, and much much more.

ESLint and other linters do a bit more then that, they can check for syntax
errors, unused variables, and other common mistakes. They can also enforce
styling rules, like Prettier, but they can also enforce best practices.

## Dynamic Testing

Dynamic testing is testing code by running it, this is where you would write
unit tests, integration tests, system tests, and more. There are many many
different types of dynamic tests, but in this post I will only go over a few of
them.

### Unit Testing

Unit testing is the easiest type of testing to implement, it often requires very
little code to start from and because of that they can often be the fastest to
run.

These types of tests test a specific function of code, they are often written
before the code is written (test driven development) so that when you are
writing the function logic you can get real time feedback to weather it contains
errors.

Note that just because your unit tests pass, does not mean the function works,
it only works against the tests made. If you want to learn more about testing
principles, check out the [testing principles post](/blog/7-principles-of-testing).

Example:

```javascript
function add(a, b) {
  return a + b;
}

expect(add(1, 2)).toBe(3);
expect(add(-1, 2)).toBe(1);
expect(add(0, 40)).toBe(-40);
```

### Integration Testing

Integration testing is one above unit testing, it tests that a combination of
components work together as expected. The goal of this is to test that
interactions between components and unit tests are passing.

### System Testing

This type of testing is used when you want to test the entire system, this could
be a web application, a mobile application, or a desktop application. It focuses
on the performance, security, and other non-functional requirements (as well as
logic) of the entire system together.

Typically this would be in an environment that is as close to production as
possible, but not in production. This could be a staging environment, a
development environment, or a testing environment.

The software would be put through real-world scenarios to see how it performs,
this could be a user signing up, logging in, and then logging out.

### Acceptance Testing

This is a level of testing where the system as a whole is evaluated based on its
compliance with the business requirements. It is generally the final phase of
testing before the software is released.

It is performed by clients and end users, usually with collaboration from the
testing teams. Sometimes it will be split into 2 groups: Alpha and Beta. This
was bugs and issues can be caught without masses using it.

### Regression Testing

Regression tests are used to check weather new or updated code (such as patches)
do not adversely affect the existing code. This is done by running the existing
tests to make sure they still pass.
