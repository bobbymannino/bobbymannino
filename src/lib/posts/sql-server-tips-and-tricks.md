---
title: "SQL Server Tips & Tricks"
publishedOn: 2025-04-24
tagline: "4 SQL Server Tips & Tricks"
tags: ["sql", "tips"]
---

# SQL Server Tips & Tricks

There are many different versions and dialects of SQL: PostgreSQL, MySQL,
SQLite, SQL Server and many more. In this post I will go over a few useful tips
that may come in handy when working with SQL Server.

## Tips & Tricks

### 1. Derived Columns

Have you ever wanted to have a column that is derived from one or more columns?
Well using [Derived Column
Transformation](https://learn.microsoft.com/en-us/sql/integration-services/data-flow/transformations/derived-column-transformation?view=sql-server-ver16)
you can.

```sql
create table [User] (
    UserId int identity(1, 1) primary key,
    FirstName varchar(44) not null,
    LastName varchar(44) not null,
    FullName as (FirstName + ' ' + LastName)
);

insert into [User] (FirstName, LastName) values
    ('Bob', 'Man'),
    ('Will', 'Draw'),
    ('AJ', 'Draw');

select * from [User];
```

| UserId | FirstName | LastName | FullName  |
| ------ | --------- | -------- | --------- |
| 1      | Bob       | Man      | Bob Man   |
| 2      | Will      | Draw     | Will Draw |
| 3      | AJ        | Draw     | AJ Draw   |

Derived columns are not stored in the table itself but rather computed when the
row is used. There is a way to computer the column and store it in the table,
you can enable this by using the `PERSISTED` keyword.

```sql
create table [User] (
    UserId int identity(1, 1) primary key,
    FirstName varchar(44) not null,
    LastName varchar(44) not null,
    FullName as (FirstName + ' ' + LastName) persisted
);
```

### 2. Avoid *

It is best practice to never use * in production. The reason behind this is
quite simple: it is not safe. It may work at the moment and even save you typing
out each column but what happens if a column is added later and is sensitive? It
will get sent to the server anyway which is not what we want. Another measure is
performance that will be hit as it is more rare to need every column than not.

Something else to consider is readability which can greatly impact developers
who are familiarizing themselves with the codebase. Overall it has the potential
to cause issues down the line, so save your future self the trouble and avoid *.

```sql
create table [User] (
    UserId int identity(1, 1) primary key,
    FirstName varchar(44) not null,
    LastName varchar(44) not null,
    CreatedAt datetime not null default getdate()
);

-- This will return all 4 columns which in this case is okay at the moment but
-- in the future could not be
create function ListUsers()
returns table as
return (select * from [User]);

-- Add hashed password column sometime in the future
alter table [User]
add Pwd varchar(max) not null unique;

-- Now calling `ListUsers` will return all 5 columns which is a security
-- vulnerability. To stop this alter the function to use explicit columns

alter function ListUsers()
returns table as
return (select UserId, FirstName, LastName from [User]);
```

### 3. Use `EXISTS` over `IN`

Most of the time when checking for the existence of a record it is more
efficient to use `EXISTS` then `IN`. The reason for this is when using `EXISTS`
as soon as a record is found it stops scanning whereas `IN` will carry on until
it has checked all rows. There is absolutely a use for `IN` and it is a very
useful tool but if the aim is simply to check if a record exists then `IN` will
be less efficient.

Let's look at an example where using `EXISTS` is more efficient than `IN`:

```sql
-- Using IN (less efficient)
select CustomerID, CustomerName
from Customers
where CustomerID in (
    select OrderCustomerID
    from Orders
    where OrderAmount > 1000
);

-- Using EXISTS (more efficient)
select CustomerID, CustomerName
from Customers c
where exists (
    select 1
    from Orders o
    where o.OrderCustomerID = c.CustomerID
    and o.OrderAmount > 1000
);
```

The `EXISTS` version can stop searching as soon as it finds a matching record
for each customer, while the `IN` version must build a complete list of matching
customer IDs from Orders before it can perform the comparison. For large
datasets, this difference in execution can significantly impact performance.

### 4. Utilize Built-in Functions

SQL Server has a huge assortment of built-in functions that can save you time.
Whilst there are too many to go over in this post I have picked out a few of my
most used functions and added examples for each.

#### String Functions

##### `CONCAT`

This function is used to add 2 or more strings together

###### Syntax

```sql
CONCAT(<StringA>, <StringB>[, <StringC>, ...])
```

###### Create full name

```sql
select concat(FirstName, ' ', LastName) as FullName from [User];
-- Bob Man
-- Will Draw
-- AJ Draw
```

##### `LEFT`/`RIGHT`

These 2 functions do the same thing but from different sides. `LEFT` will start
from the left side of the string and `RIGHT` will start from the right side of
the string and take x amount of characters (`LEFT` is similar to `.slice()` in
JS).

###### Syntax

```sql
LEFT(<String>, <CharactersToTake>)
```

###### Take first 2 characters of string

```sql
select left(FirstName, 2) as FirstNameShort from [User];
-- Bo
-- Wi
-- AJ
```

###### Take last 3 characters of string

```sql
select right(FirstName, 3) as FirstNameEnd from [User];
-- Bob
-- ill
-- AJ
```

##### `STUFF`

`STUFF` is a function that has multiple steps, firstly it deletes a certain
amount of characters from a starting index in a string, and then it inserts a
substring into the main string from the same starting index.

###### Syntax

```sql
STUFF(<StartingString>, <StartIndex>, <EndIndex>, <ReplaceWithString>)
```

###### Replace first 1 characters with "Person: "

```sql
select stuff(FirstName, 1, 2, 'Person: ') from [User];
-- Person: ob
-- Person: ill
-- Person: J
```

###### Replace entire string with "Bob"

```sql
select stuff(FirstName, 1, len(FirstName), 'Bob') as Bob from [User];
-- Bob
-- Bob
-- Bob
```

###### Get initials

```sql
select stuff(FirstName, 2, len(FirstName) - 1, concat('.', left(LastName, 1), '.')) as Initial from [User];
-- B.M.
-- A.D.
-- W.D.
```

#### Date Functions

##### `FORMAT`

Formats a date string into a specified format.

###### Syntax

```sql
FORMAT(<Date>, <FormatString>)
```

###### Format date as "MM/dd/yyyy"

```sql
select format(getdate(), 'MM/dd/yyyy') as FormattedDate;
-- 07/01/2023
```

###### Format date as "dd-MMM-yyyy"

```sql
select format(getdate(), 'dd-MMM-yyyy') as FormattedDate;
-- 01-Jul-2023
```

##### `DAY`/`MONTH`/`YEAR`

These functions extract a value (day, month, year) from a given date.

###### Syntax

```sql
DAY(<Date>)
MONTH(<Date>)
YEAR(<Date>)
```

###### Get day of the month

```sql
select day('1979-12-22 00:00:00') as DayOfMonth;
-- 22
```

###### Get month of the year

```sql
select month('1979-12-22 00:00:00') as MonthOfYear;
-- 12
```

###### Get year

```sql
select year('1979-12-22 00:00:00') as Year;
-- 1979
```

##### `DATEADD`

Add an interval to a date.

###### Syntax

```sql
DATEADD(<Interval>, <Number>, <Date>)
```

###### Add 7 days from now

```sql
select dateadd(day, 7, getdate()) as OneWeekAway;
-- 2023-07-08 14:30:00.000
```

###### Subtract 30 days from now

```sql
select dateadd(day, -30, getdate()) as OneMonthAgo;
-- 2023-05-31 14:30:00.000
```

#### Aggregate Number Functions

##### `MIN`/`MAX`

Get the maximum or minimum value.

###### Syntax

```sql
MIN(<Column>)
MAX(<Column>)
```

###### Get minimum value

```sql
select min(age) as MinAge from [User];
-- 18
```

###### Get maximum value

```sql
select max(age) as MaxAge from [User];
-- 65
```

##### `AVG`

Calculates the average of all non-NULL values in a column.

###### Syntax

```sql
AVG(<Column>)
```

###### Get average value

```sql
select avg(age) as AvgAge from [User];
-- 34.5
```

##### `SUM`

Calculates the sum of all non-NULL values in a column.

###### Syntax

```sql
SUM(<Column>)
```

###### Get sum of all values

```sql
select sum(OrderAmount) as TotalSales from Orders;
-- 15750.25
```

#### Special Functions

##### `CAST`

Converts an expression from one data type to another.

###### Syntax

```sql
CAST(<Expression> AS <DataType>)
```

###### Convert string to integer

```sql
select cast('100' as int) as ConvertedValue;
-- 100
```

###### Convert decimal to string

```sql
select cast(123.45 as varchar(10)) as StringValue;
-- 123.45
```

##### `NULLIF`

Returns NULL if the two specified expressions are equal; otherwise, returns the first expression.

###### Syntax

```sql
NULLIF(<Expression1>, <Expression2>)
```

###### Avoid division by zero

```sql
select 100 / nullif(0, 0) as SafeDivision;
-- NULL (instead of error)
```

###### Return NULL for specific value

```sql
select nullif(FirstName, 'Unknown') as SafeName from [User];
-- Returns NULL if FirstName is 'Unknown', otherwise returns FirstName
```

##### `COALESCE`

Returns the first non-NULL expression among its arguments.

###### Syntax

```sql
COALESCE(<Expression1>, <Expression2>[, <Expression3>, ...])
```

###### Provide default value for NULL

```sql
select coalesce(MiddleName, '') as MiddleNameOrEmpty from [User];
-- Returns MiddleName if not NULL, otherwise returns an empty string
```

###### Use fallback values in order

```sql
select coalesce(PreferredName, FirstName, 'Customer') as DisplayName from [User];
-- Returns first non-NULL value in the list
```
