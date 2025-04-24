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
