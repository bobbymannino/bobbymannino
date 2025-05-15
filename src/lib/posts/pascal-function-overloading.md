---
title: "Pascal Function Overloading"
publishedOn: 2025-05-15
tagline: "You can't do this in JavaScript!"
tags: ["pascal"]
---

# Pascal Function Overloading

## What is Function Overloading?

In programming you may come across 2 or more functions that are named the same
thing but act differently, wether thats taking in different types of arguments
or different numbers of arguments. This is called function overloading. Some
languages do not have this feature (such as JavaScript) but some do (such as
Pascal).


## Example

This program uses 3 different `Add` functions and the compiler will choose the
correct one based on the arguments passed to it.

```pascal
program FunctionOverloading;

uses
    SysUtils;

{$APPTYPE CONSOLE}

var
  intOut: Integer;
  realOut: Real;
  strOut: String;

function Add(const a, b: Integer): Integer; overload;
begin
  Result := a + b;
end;

function Add(const a, b: string): string; overload;
begin
  Result := a + b;
end;

function Add(const a, b: Double): Double; overload;
begin
  Result := a + b;
end;

begin
  intOut := Add(1, 2); // Integer overload
  realOut := Add(1.72, 2.525); // Real overload
  strOut := Add('Hello, ', 'world!'); // String overload

  WriteLn(Format('Int %d', [intOut]));
  // Int 3
  WriteLn(Format('Double %0.1f', [realOut]));
  // Double 4.2
  WriteLn(Format('String %s', [strOut]));
  // String Hello, world!

  Readln;
end.
```

The only thing needed to turn an function into an overloaded function is to add
the `overload` keyword to the function declaration. The compiler will then know
that this function is overloaded and will be able to choose the correct function
based on the arguments passed to it. In this example we have 3 overloaded
functions, one that takes in 2 integers, one that takes in 2 strings and one
that takes in 2 doubles. The compiler will choose the correct function based on
the arguments passed to it.

## Use Cases

Function overloading is useful when you want to have multiple functions that do
the same action but with different arguments, such as logging in with email,
oAuth, phone number, etc. It would also be really useful for turning a variety
of data types into a single one (possible a record) like a conversion or
normalization.
