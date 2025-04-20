---
title: "Object Pascal"
publishedOn: 2025-04-20
tagline: "Learn object pascal through examples"
tags: ["pascal"]
thumbnailSrc: "object-pascal.png"
thumbnailAlt: "Object pascal in Delphi"
---

# Object Pascal

Object Pascal is a programming language that is part of the Delphi development
environment. It is an object-oriented language that is based on the Pascal
programming language. Object Pascal is used to create applications for Windows,
Mac, and Linux. An example of a class would look something like this:

```pascal
unit clsPerson_u;

interface

uses
  Classes, System.SysUtils;

type
  // TPerson is a class that inherits from TObject
  // `TPerson = class` is the same as the line below
  TPerson = class(TObject)

  // PRIVATE Can only be accessed from within this class
  private
    fName: string;
    fAge: smallint;
    procedure SetAge(const aAge: smallint);
    function GetAge: smallint;

  // PUBLIC Can be accessed from within the class and within an instance
  public
    // Properties in public can be set/get with dot notation
    fMale: boolean;

    constructor Create(const aName: string; const aAge: smallint; aMale: boolean = true);
    destructor Destroy; override;

    // Procedures do not have a return value

    procedure SetName(const aName: string);
    // Functions do have a return value
    function GetName: string;

    function ToString: string;

    // Virtual methods allow classes that inherit this class to redefine the logic for the method
    function Introduce: string; virtual;

  // PUBLISHED Can only be accessed from within this class or any class that inherits it
  published
    // Properties do not have to have both read and write
    property age: smallint read GetAge write SetAge;
  end;

implementation

constructor TPerson.Create(const aName: string; const aAge: smallint; aMale: boolean = true);
begin
  inherited Create;
  fName := aName;
  fAge := aAge;
  fMale := aMale;
end;

destructor TPerson.Destroy;
begin
  inherited Destroy;
end;

procedure TPerson.SetName(const aName: string);
begin
  fName := aName;
end;

function TPerson.ToString: string;
begin
  WriteLn('TPerson:');
  WriteLn('Name: ' + fName);
  WriteLn('Age: ' + inttostr(fAge));
  if fMale then
    WriteLn('Male: true')
  else
    WriteLn('Male: false');
end;

function TPerson.GetName: string;
begin
  Result := fName;
end;

function TPerson.Introduce: string;
begin
  Write('Hi there, my name is ' + fName + '. I am ' + fAge.ToString + ' years old and I am a ');
  if fMale = False then
    Write('wo');

  Write('man.')
end;

procedure TPerson.SetAge(const aAge: smallint);
begin
  if aAge < 0 then
    raise Exception.Create('Age must be 0 or higher');

  fAge := aAge;
end;

function TPerson.GetAge: smallint;
begin
  Result := fAge;
end;

end.
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

To implement the methods, underneath the type you can write the functions
prefixed with the class name (e.g. `TPerson.GetAge`).

Common practice is to name the file/unit something like `clsEmployee_u`. `cls`
represents that it is a class, `Employee` is what class it is and `_u` is
because when we use the class in another file we can import it easily.

To use inheritance you can change the object in parenthesis in the type and use keywords such as `override`, `virtual` and `inherited`. An example of a class that inherits from `TPerson` would look something like:

```pascal
unit clsEmployee_u;

interface

uses
  System.SysUtils, clsPerson_u;

type
  TEmployee = class(TPerson)
  private
    function GetPay: double;
  public
    hours: double;

    constructor Create(const aName: string; const aAge: smallint; const aHours: double; aMale: boolean = true);

    // Overriding from TPerson
    function Introduce: string; override;

    // No set method which means cannot be tampered with
    property pay: double read GetPay;
  end;

implementation

constructor TEmployee.Create(const aName: string; const aAge: smallint;
  const aHours: double; aMale: boolean);
begin
  inherited Create(aName, aAge, aMale);

  hours := aHours;
end;

function TEmployee.Introduce: string;
begin
  Write('Hi there, I am an employee, my name is ' + GetName + '. I am ' + age.ToString + ' years old and I am a ');
  if fMale = False then
    Write('wo');

  Write('man.')
end;

function TEmployee.GetPay: double;
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

end.
```

An example of using these 2 classes would look something like this:

```pascal
program DemoClasses;

{$APPTYPE CONSOLE}
{$R *.res}

uses
  System.SysUtils,
  clsPerson_u in 'clsPerson_u.pas',
  clsEmployee_u in 'clsEmployee_u.pas';

var
  p1: TPerson;
  e1: TEmployee;

begin
  try
    // Create a person class with aMale set to true using default param
    p1 := TPerson.Create('bob', 21);

    // Change the age using property
    p1.age := 10;

    // This will raise an error because age must be 0 or greater
    // p1.age := -1;

    // Display person
    WriteLn(p1.ToString);
    WriteLn(p1.Introduce);
  finally
    // Free up resources
    p1.Free;
  end;

  // Line break
  WriteLn;

  try
    e1 := TEmployee.Create('Will', 18, 15);

    WriteLn(e1.Introduce);

    WriteLn;

    WriteLn('My pay for ' + e1.hours.ToString + ' hours is £' +
        e1.pay.ToString);
  finally
    e1.Free;
  end;

  // Use this to wait for a key press before exiting
  ReadLn;

end.
```

Not familiar with pascal? Take a look at my [pascal basics](/blog/pascal-basics)
post.
