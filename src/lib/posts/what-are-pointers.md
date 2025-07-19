---
title: "What are Pointers?"
publishedOn: 2025-07-19
tagline: "Reference variables by their memory address"
tags: ["pointers", "c"]
---

# What are Pointers?

Pointers are a way or referencing a memory address. They allow you to directly
manipulate memory locations and are essential for low-level programming tasks.

Different languages have different ways of using pointers but for this
demonstration I will use `C`.

## Regular Variables

When declaring a variable you would do this:

```c
// <data-type> <name> = <value>;
int num = 10;
```

What this does it takes up an address in memory and sets the value to the value
you set. You can then access it by using the variable directly:

```c
printf("%d", num);
// 10
```

If you were to look at the memory table somewhere in there would be an entry
with a value `10`. It would look something like this:

| Address | Value |
| ------- | ----- |
| 0x1000  | 10    |
| 0x1001  |       |
| 0x1002  |       |
| 0x1003  |       |
| 0x1004  |       |

If you were to update the variable, the value in the same memory address would
also be updated.

```c
num = 20;
```

| Address | Value |
| ------- | ----- |
| 0x1000  | 20    |
| 0x1001  |       |
| 0x1002  |       |
| 0x1003  |       |
| 0x1004  |       |

## Pointer Variables

To create a pointer in `C` you would use the `*` and `&` characters (known as
asterisk and ampersand).

```c
int num = 10;
int *num_pointer = &num;
```

In this example we have declare a variable called `num` with a value of `10`. We
have also declared a pointer variable called `num_pointer` with a value of the
address of variable `num`. There's 2 parts to break down here, the asterisk and
the ampersand. Firstly the `*` tells the compiler that this variable is a
pointer variable so it can be used to manipulate memory locations. The `&` tells
the compiler to get the address of the variable that comes after it. So the
memory address table would look something like this:

| Address | Value  |
| ------- | ------ |
| 0x1000  | 10     |
| 0x1001  | 0x1000 |
| 0x1002  |        |
| 0x1003  |        |
| 0x1004  |        |

If you want to get the value of what the pointer is pointing towards you would
use the `*` again:

```c
printf("%d", *num_pointer);
// 10
```

If we want to change the value of variable `num` we can now do so two different
ways; by using the `num` variable as usual or by using the pointer variable.
Both ways will change the same underlying value.

```c
int num = 10;
int *num_pointer = &num;

printf("%d, %d", num, *num_pointer);
// 10, 10

num = 20;
printf("%d, %d", num, *num_pointer);
// 20, 20

*num_pointer = 30;
printf("%d, %d", num, *num_pointer);
// 30, 30
```

---

## Resources

[YouTube video by @Low Level](https://www.youtube.com/watch?v=2ybLD6_2gKM)
