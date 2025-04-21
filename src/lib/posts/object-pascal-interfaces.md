---
title: "Object Pascal Interfaces"
publishedOn: 2025-04-21
tagline: "Decouple classes from their type using interfaces"
tags: ["oop", "pascal"]
---

# Object Pascal Interfaces

## What is an Interface?

An interface is a type that can be used to define the blueprint for a class. A
single class can inherit multiple interfaces making it extremely flexible and
reusable.

## Interface Use Cases

Interfaces are a really practical way to clump logical methods into smaller
groups. A simple example would be using them for something like humans,
employees, managers, CEO where each level up the chain can inherit *some* (not
all) the methods below it. What about if an employee wants to increase their
wage? I think you should not be able to update your own salary so you could
create an interface that allows you to update other peoples salaries but not
your own and apply it to manager and CEO. Now the CEO wants a pay rise and
doesn't want to ask anyway so we should create another interface for CEO where
he can increase his own salary.

## Example

```pascal
interface

type
  IHuman = interface
    function GetAge: shortint;

    procedure SetAge(const aAge: shortint);

    property age: shortint read GetAge write SetAge;
  end;

  IPupil = interface
    function GetFavoriteClass: string;
  end;

  IEmployee = interface
    function GetPay: Double;
  end;

  // Use `TInterfacedObject` as the base class and inherit the type `IHuman`
  THuman = class(TInterfacedObject, IHuman)
  private
    fAge: shortint;
  public
    function GetAge: shortint;

    procedure SetAge(const aAge: shortint);

    property age: shortint read GetAge write SetAge default 0;
  end;

  // Inherit `THuman` class and also inherit `IPupil`
  TPupil = class(THuman, IPupil)
  public
    function GetFavoriteClass: string;
  end;

  // If there were more interfaces defined you are able to chain them together
  // e.g. TEmployee = class(THuman, IEmployee, ICEO, IWoman, IMother)
  TEmployee = class(THuman, IEmployee)
  public
    function GetPay: Double;
  end;

implementation

{ THuman }

function THuman.GetAge: shortint;
begin
  Result := fAge;
end;

procedure THuman.SetAge(const aAge: shortint);
begin
  fAge := aAge;
end;

{ TEmployee }

function TEmployee.GetPay: Double;
begin
  Result := 12500.0;
end;

{ TPupil }

function TPupil.GetFavoriteClass: string;
begin
  Result := 'Computer Science';
end;

end.
```
