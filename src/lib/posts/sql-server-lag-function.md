---
title: "SQL LAG Function"
publishedOn: 2025-05-08
tagline: "Access data from a previous row in SQL"
tags: ["sql"]
---

# SQL `LAG` Function

## What is `LAG`?

The `LAG` function is a window function in SQL that allows you to access data
from a previous row in the result set without the need for a self-join. It is
particularly useful for comparing values in the current row with values in a
previous row.

## How to use `LAG`

The `LAG` function takes the following syntax:

```sql
LAG(column [, offset] [, default_value]) OVER ([PARTITION BY partition_column] ORDER BY order_column)
```

If there is no prior row the result will be `null`. To use it to get the
previous row's value, you can use the following example:

```sql
select
    year,
    amount,
    lag(amount, 1) over (order by year) as previous_amount
from testing
order by year asc
```

## Example

We have a table of orders with the following structure:

```sql
create table orders (
	id serial primary key,
	-- The year the order was placed
  year smallint not null check (year >= 2000 and year <= extract(year from now())),
	-- The amount (in currency) of the order
  amount numeric(10, 2) not null check (amount >= 0)
);
```

```sql
-- Seed data
insert into orders (year, amount) values
  (2000, 10),
  (2000, 15.50),
  (2000, 9.99),
  (2005, 1),
  (2010, 10),
  (2015, 10),
  (2000, 10),
  (2012, 100),
  (2002, 10),
  (2001, 20),
  (2003, 33),
  (2001, 13),
  (2001, 41.42),
  (2001, 49.75),
  (2002, 10),
  (2001, 94.99),
  (2004, 10);
```

The Aim of the exercise is to find the top 3 highest grossing years, but the
twist is to return the previous 2 year's grossing amount too. If there is no
orders in the previous year default to 0.

### Answer

```sql
select
	year,
  sum(amount) this_year,
  lag(sum(amount), 1, 0) over (order by year asc) last_year,
  lag(sum(amount), 2, 0) over (order by year asc) two_years_ago
from orders
group by year
order by this_year desc
limit 3
```

| year | this_year | last_year | two_years_ago |
| ---- | --------- | --------- | ------------- |
| 2001 | 219.16    | 45.49     | 0             |
| 2012 | 100.00    | 10.00     | 1.00          |
| 2000 | 45.49     | 0         | 0             |

### Bonus

As a bonus can you return the difference between this year and last year as
well?

```sql
select
	year,
  sum(amount) this_year,
  lag(sum(amount), 1, 0) over (order by year asc) last_year,
  lag(sum(amount), 2, 0) over (order by year asc) two_years_ago,
  sum(amount) - lag(sum(amount), 1, 0) over (order by year asc) last_year_over_this_year
from orders
group by year
order by this_year desc
limit 3
```

| year | this_year | last_year | two_years_ago | last_year_over_this_year |
| ---- | --------- | --------- | ------------- | ------------------------ |
| 2001 | 219.16    | 45.49     | 0             | 173.67                   |
| 2012 | 100.00    | 10.00     | 1.00          | 90.00                    |
| 2000 | 45.49     | 0         | 0             | 45.49                    |
