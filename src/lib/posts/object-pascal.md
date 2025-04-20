---
title: "Object Pascal"
publishedOn: 2025-04-20
tagline: "Learn object pascal through examples"
tags: ["pascal"]
---

# Object Pascal

Object Pascal is a programming language that is part of the Delphi development
environment. It is an object-oriented language that is based on the Pascal
programming language. Object Pascal is used to create applications for Windows,
Mac, and Linux. You can create a class by using this syntax:

```pascal
type
  TPerson = class(TObject)
  // Can only be accessed from within this class
  private
    fAge: smallint;
    fName: string;
    procedure SetName(const aName: string);
    function GetName: string;
  // Can only be accessed from within this class or any class that inherits it
  published
    fMale: boolean;
  // Can be accessed from within the class and within an instance
  public
    constructor Create(const aName: string; const aAge: smallint);
    destructor Destroy; override;

    // Procedures do not have a return value
    procedure SetName(const aName: string);
    // Functions do have a return value
    function GetName: string;

    // Properties do not have to have both read and write
    property age: smallint read GetAge write SetAge;
  end;

implementation

constructor TPerson.Create(const aName: string; const aAge: smallint);
begin
  fName := aName;
  fAge := aAge;
end;

destructor TPerson.Destroy;
begin
  inherited Destroy;
end;

procedure TPerson.SetName(const aName: string);
begin
  fName := aName;
end;

function TPerson.GetName: string;
begin
  Result := fName;
end;

procedure TPerson.SetAge(const aAge: smallint);
begin
  if aAge < 0 then
  begin
    ShowMessage('Age must be 0 or higher');

    Exit;
  end;
  fAge := aAge;
end;

function TPerson.GetAge: smallint;
begin
  Result := fAge;
end;
```

You start by declaring the type of the class with a name `TPerson` in this case.
It is common practice to prefix types with `T`. The class it is inheriting from
is `TObject`. `TObject` is the base class for every single object in object
pascal. Afterwards there are 3 sections `private`, `published`, & `public`.

- Public variables/methods can be accessed from within the class or from an
  instance.
- Published variables/methods can be accessed from within the class or from a class
  that inherits the class
- Private variables/methods can only be accessed from within this class

In each section you can declare variables or methods but in public you can also declare 3 extra things.

- Constructor: A constructor is used to create an instance of the class
- Destructor: A destructor is used to free resources when an instance is destroyed
- Properties: Properties are used to control access to a variable as well as being
  able to validate inputs and have computed variables.

```pascal
type
  TEmployee = class(TObject)
  public
    constructor Create(const aAge: smallint; const aHours: float);
    age: smallint;
    hours: float;
    property pay: float read GetPay;
  end;

implementation

constructor TEmployee.Create(const aAge: smallint; const aHours: float);
begin
  age := aAge;
  hours := aHours;
end;

procedure TEmployee.SetAge(const aAge: smallint);
begin
  if aAge < 0 then
  begin
    ShowMessage('Age must be 0 or higher');

    Exit;
  end;
  fAge := aAge;
end;

function TEmployee.GetPay: float;
begin
  case age of
    0..15: Result := 0;
    16..17: Result := 7.25 * hours;
    18..64: Result := 15.00 * hours;
    65..100: Result := 20.00 * hours;
  else
    Result := 10.00 * hours;
  end;
end;
```

To implement the methods, underneath the type you can write the functions
prefixed with the class name (e.g. `TPerson.GetAge`).

Common practice is to name the file/unit something like `clsEmployee_u`. `cls`
represents that it is a class, `Employee` is what class it is and `_u` is
because when we use the class in another file we can import it easily.

Not familiar with pascal? Take a look at my [pascal basics](/blog/pascal-basics)
post.
