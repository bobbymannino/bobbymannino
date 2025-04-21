---
title: "Object Pascal Static Methods"
publishedOn: 2025-04-21
tagline: "What are static methods and how can I use them?"
tags: ["oop", "pascal"]
---

# Object Pascal Static Methods

## What is a Static Method?

A static method is a method (function/procedure) that can be executed from
outside an instance of a class. This is useful for creating mock classes,
testing and utility functions.

The syntax for declaring a static method in pascal is as easy as prefixing the
method with `class`. Then to call the method you call it from the class type.
Below I have added a very simple `TPerson` class that has a `Mock` function that
is a static method.

## Declaring Static Methods

```pascal
unit clsPerson_u;

interface

type
  TPerson = class
    public
      name: string;
      age: shortint;
      constructor Create(const aName: string; const aAge: shortint);
      class function Mock: TPerson;
  end;

implementation

constructor TPerson.Create(const aName: string; const aAge: shortint);
begin
  name := aName;
  age := aAge;
end;

class function TPerson.Mock: TPerson;
begin
  Result := TPerson.Create('Bob', 21);
end;

end.
```

## Using Static Methods

And to use the method you would use `TPerson.Mock` like so:

```pascal
var
  person: TPerson;

begin
  person := TPerson.Mock;
  WriteLn(person.name);
  WriteLn(person.age.ToString);
  person.Free;
end.
```

## More Use Cases

In the example I have given the static method is used to create an instance of
itself but that is not all you can do with static methods, you could create a
utility for checking ages, names and much more. The class itself doesn't have to
have any non-static (instance) methods, this means another use case for static
methods is to create a class made up of only static methods for related
utilities. This groups all related methods in one place for a cleaner codebase.
