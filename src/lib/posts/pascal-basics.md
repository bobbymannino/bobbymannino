---
title: "Pascal Basics"
tagline: "Learn the basics of pascal"
tags: ["pascal"]
---

# Pascal Basics

Note: pascal is case-insensitive programming language

## File Layout

In pascal a file will have multiple sections for different parts. There will be
top part declaring the program, there will be a var section (more on that
later), a main function and a types section. A minimal file could look something
like this:

```pascal
program HelloWorld;

being
  writeln('Hello World!');
  readln;
end.
```

## Comments

Depending on the environment there are different comment types but a few common
ones are:

```pascal
{ This is a comment }
" This is a comment "
(* This is a comment *)
// This is a comment
```

## Output

To output something to the system in pascal you can use `write` or `writeln`.
These are functions that take in parameters that are printed onto the screen.
The difference between the two if wether the system will start a new line or
continue from the cursor.

```pascal
write('Hello');
write('World');
writeln('Ho ho ho!');

// Outputs:
// HelloWorld
// Ho ho ho!
```

## Input

By default the program will close when it gets to the end of the main body, so
to stop this we ask for user input right at the end like so:

```pascal
begin
  writeln('I am waiting...');
  readln;
end.
```

## Data Types

Standard Types:

- Integer
- Real
- Character
- Boolean

Structured Types:

- Array
- Record
- File
- Set

User Defined Types:

- Enums
- Sunbrange

## Variables

Pascal is a strongly typed language which means they are declared at the top of
the file before use:

```pascal
program VariablesForTheWin;

var
  x, y: Integer;
  bob: Boolean;

begin
  x := 10;
  y := 3;

  bob := false;

  writeln('x * y = ', x * y);
  writeln(x, ' * ', y, ' = ', x * y);

  writeln('What would you like x to be?');
  readln(x);
  writeln('x = ', x);

  readln;
end.
```

## Conditions

```pascal
program Conditions;

var
  temp: Byte; // 0 - 255

being
  temp := 22;

  if temp > 40 then
    writeln('It is wayyy too hot');
  else
  if temp > 20 then
    writeln('It is getting hot now');
  else
    writeln('Winter is upon us');

  writeln('Press any key to close');
  readln;
end.
```

```pascal
program Conditions;

var
  temp: Byte;
  hour: Byte;

being
  temp := 22;
  hour := 15;

  if (hour > 12) and (temp > 20) then
    writeln('Is it this hot at this time normally?');
  else
    writeln('Boring...');

  writeln('Press any key to close');
  readln;
end.
```

## Switch/Case

```pascal
var
  num: Byte;

begin
  writeln('Give me a number (0 - 255)');
  readln(num);

  case num of
    0: writeln('Really, thought you were smart?');
    100, 255: writeln('The big one I see');
  else
    writeln('Boring');
  end;

  writeln('Press any key to close');
  readln;
end.
```

In pascal you can also uses ranges of values like this scoring system:

```pascal
var
  score: Byte;

begin
  writeln('What is the score?');
  readln(score);

  writeln; // This causes an empty line, just so it is more spaced out

  case mark of
    0 .. 39: writeln('Fail');
    40 .. 49: writeln('E');
    50 .. 59: writeln('D');
    60 .. 79: writeln('C');
    80 .. 99: writeln('B');
    100: writeln('Perfect score');
  else
    writeln('Wrong mark!');
  end;

  writeln('Press any key to close');
  readln;
end.
```

## Loops

### For Loop

```pascal
var
  i: Integer;
  max: Integer;

begin
  max := 10;

  for i := 1 to max do // you can also use 'downto' to reverse the indexing
  begin
    writeln('Hi there', i);
  end;

  writeln('Press any key to close');
  readln;
end.
```

### Repeat Until

```pascal
var
  num: Integer;

begin
  num := 10;

  repeat
    num := num - 1;
    writeln(num);
  until num <= 0;
end.
```

### While Loop

A while loop is similar to a repeat until loop but has a key difference: a
repeat until is always executed at least once whereas a while loops condition is
checked before its first execution.

```pascal
var
  num: Integer;

begin
  num := 10;

  while num > 0 do
  begin
    num := num - 1;
    writeln(num);
  end;
end.
```
