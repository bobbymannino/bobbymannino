---
title: "SQL Server Tips & Tricks"
tagline: "5 SQL Server Tips & Tricks"
tags: ["sql", "tips"]
---

# SQL Server Tips & Tricks

There are many different versions and dialects of SQL: PostgreSQL, MySQL,
SQLite, SQL Server and many more. In this post I will go over 5 useful tips that
may come in handy when working with SQL Server.

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

### 3. Use `EXISTS` over `IN`

Most of the time when checking for the existence of a record it is more
efficient to use `EXISTS` then `IN`. The reason for this is when using `EXISTS`
as soon as a record is found it stops scanning whereas `IN` will carry on until
it has checked all rows. There is absolutely a use for `IN` and it is a very
useful tool but if the aim is simply to check if a record exists then `IN` will
be less efficient.
