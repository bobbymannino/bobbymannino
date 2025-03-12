---
title: "7 Principles of Software Testing"
publishedOn: 2025-02-05
tagline: "What are the 7 guideline principles of software testing?"
tags: ["tests"]
---

# 7 Principles of Software Testing

In software testing, there are 7 different guideline principles that are used to
help guide the testing process. These principles are:

## 1. Testing shows presence of defects, not absence

Tests work by testing the code you have written outputs the expected answer, but
it does not test if your software works completely or is completely correct.

## 2. Exhaustive testing is impossible

It is impossible to test every possible input for a program. This is because the
number of possible inputs is infinite. Instead, you should prioritize on testing
the most likely inputs and edge cases.

## 3. Early testing

Testing should be done as early as possible in the software development process.
This can save time and money by catching bugs early on.

## 4. Defect clustering

Most defects are found in a small number of modules. This means that you should
focus your testing on these modules. This is the Pareto principle in action, 80%
of defects caused by 20% of the code.

## 5. Pesticide paradox

If you use the same tests over and over again, you will find fewer and fewer
defects. This is because the same tests will not find new defects. You should
continuously update and change your tests to find new defects.

Sometimes it's useful to purposely break your tests to find new defects.

## 6. Testing is context dependent

This essentially means that the way you test your software will depend on the
context of the software. For example, testing a web application will be different
from testing a desktop application, or a banking site will be tested differently
to a web game.

## 7. Absence of errors fallacy

Just because you have not found any errors in your software does not mean that
your software is error-free. You should always be testing and looking for new
defects.

---

If you want to learn more about testing, I have a blog post on different
[Box Tests](/blog/box-testing).
