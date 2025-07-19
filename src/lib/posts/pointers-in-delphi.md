---
title: "Pointers in Delphi"
publishedOn: 2025-07-19
tagline: "How to use pointers in Delphi"
tags: ["pointers", "delphi"]
---

# Pointers in Delphi

If your not too sure what a pointer is I have written another post on that
[here](/blog/what-are-pointers). Once you have an understanding of pointers it will be easier to understand how they work in Delphi.

## Compiler Directives

Delphi has a few compiler directives that are used to control the behavior of
pointers, but the two that are most used are: `{$T+}` and `{$X+}`.

`{$T+}` is used to enable type checking for pointers which has the potential to
save you from a lot of bugs.

`{$X+}` is used to enable the ability to omit the caret (`^`) when referencing
pointers.

These 2 should normally be enabled if working with pointers/references as they
generally can save you time and potential bugs.

## Pointers

In Delphi the syntax for pointers is:

```pascal
var
  X, Y: Integer; // X and Y are Integer variables
  P: ^Integer;   // P points to an Integer
begin
  X := 17; // assign a value to X
  P := @X; // assign the address of X to P
  Y := P^; // dereference P; assign the result to Y
end;
```

There are 3 different ways to use pointers here:

### Declaring a Pointer Type

Firstly to declare a pointer variable type; this is done by putting the carat
(`^`) before the type for example:

```pascal
type
  TPerson = record
    Name: string;
    Age: Integer;
  end;

  TPersonPtr = ^TPerson;
```

In this example `TPersonPtr` is a type that only allows a reference to
`TPerson`.

### Setting a Pointer Variable

Setting a pointer variables value is as simple as using the `@` symbol. When you
use `@` before a variable you return the memory address of the variable.

```pascal
var
  Num: Integer;
  NumPtr: ^Integer;
begin
  Num := 79;

  // assign the address of Num to NumPtr
  NumPtr := @Num;
```

### Referencing a Pointer's Value

To access the value of a pointer you can use the caret (`^`) but instead of using the caret before a type name you would use it after a (pointer) variable like this:

```pascal
type
  TPerson = record
    Name: string;
    Age: Integer;
  end;

  TPersonPtr = ^TPerson;

var
  Person: TPerson;
  PersonPtr: TPersonPtr;

begin
  Person.Name := 'John Doe';
  Person.Age := 30;

  // Assign the memory address of 'Person' to the value of 'PersonPtr'
  PersonPtr := @Person;

  // Get the value of the memory address held in 'PersonPtr'
  WriteLn(PersonPtr^.Name);
  WriteLn(PersonPtr^.Age);
end.
```

Because of the '${T+}' directive we added earlier we do not have to put the
caret after a variable pointer to access the value of the memory address

```pascal
// This also works
WriteLn(PersonPtr.Name);
WriteLn(PersonPtr.Age);
```

---

## Resources

[Embarcadero Pointer
Docs](<https://docwiki.embarcadero.com/RADStudio/Sydney/en/Pointers_and_Pointer_Types_(Delphi)>)
