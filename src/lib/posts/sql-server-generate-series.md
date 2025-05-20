---
title: "SQL Server Generate Series"
publishedOn: 2025-05-20
tagline: "Generate a series of numbers between 2 intervals"
tags: ["sql", "sql-server"]
---

# SQL Server `GENERATE_SERIES`

## What does it do?

`GENERATE_SERIES` is a SQL Server function to create a series of numbers between
two intervals. It is useful for generating a sequence of numbers which comes in
useful for such things as creating test data or performing calculations or
looping over each day between 2 dates.

## How to use it?

```sql
GENERATE_SERIES(<start>, <stop>, [, <step>])
```

If you wanted to create an index going from 1 to 10 (inclusive) you would do
this:

```sql
select value as i
from generate_series(1, 10, 1);
```

## Range of Dates

`start`/`stop` values must be of type `tinyint`, `smallint`, `int`, `bigint`,
`decimal` or `numeric` so if you wanted to get every day between 2 dates as a
column you have to cast the dates to a number type. This is done by using the
`DATEDIFF` and `DATEADD` functions, which get the number of days between the two
dates and then adding that to the start date.

```sql
declare @start_date date = '1979-03-12';
declare @end_date date = '1979-03-26';

-- `day` is the unit to add
-- value is the column created by `generate_series` (e.g. value = 5 would mean add 5 days to `@start_date`)
select dateadd(day, value, @start_date) as date
-- using 0 as the start means for the first date add 0 days (keep the date the same)
from generate_series(0, datediff(day, @start_date, @end_date));
```

## What about Postgres?

Postgres does also share this function with a small but useful extra feature:
being able to use dates natively in `generate_series`. To learn more about it in
postgres [click
here.](https://www.postgresql.org/docs/current/functions-srf.html)
