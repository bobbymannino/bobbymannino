---
title: "Postgres Window Functions"
publishedOn: 2024-12-31
tagline: "Learning what is and how to use window functions in postgres"
tags: ["postgres", "sql"]
---

# Postgres Window Functions

## What is a Window Function?

A window function is a function that in SQL that is used to perform calculations
on a set of rows that are related to the current row, for example ordering by
row number. These functions are particularly useful when you need to perform
calculations such as getting the rank of a row compared to others or grouping
and then ordering by rank.

A window function is made up of 2 parts:

- A function. The function is the actual calculation that is performed on the
  set of rows
- The window. The window is the set of rows that are related to the current row
  and are used to perform the calculation

## Window Functions in Postgres

Postgres supports window functions in the form of `OVER` clauses. The `OVER`
clause is used to specify the window that the function should be applied to.

The syntax for a window function in postgres is:

```sql
<function>() OVER ([PARTITION BY xx, xx] [ORDER BY xx, xx])
```

In use it would look something like

```sql
select
    id, name, score,
    row_number() over (order by score desc) as rank
from
    scores;
```

This would return all the rows, and with each row a rank column which will be
filled with the row index ordered by their score descending, which means the
first row (highest scorer) will have rank 1, the second row, rank 2 and so on.

## `RANK` vs `DENSE_RANK` vs `ROW_NUMBER`

There are 3 common window functions in postgres:

### `ROW_NUMBER`

Takes each row - regardless of ties - and assigns a unique number to it,
starting and 1 and ending at n. This is useful for when you need a unique value
for every row.

| id  | score | rank |
| --- | ----- | ---- |
| 1   | 12    | 1    |
| 5   | 10    | 2    |
| 4   | 10    | 3    |
| 2   | 8     | 4    |
| 3   | 7     | 5    |

### `RANK`

Rank takes each row like `ROW_NUMBER` but in the event of a tie, it will give both
rows the lower rank and then skip the higher rank.

| id  | score | rank |
| --- | ----- | ---- |
| 1   | 12    | 1    |
| 5   | 10    | 2    |
| 4   | 10    | 2    |
| 2   | 8     | 4    |
| 3   | 7     | 5    |

### `DENSE_RANK`

This is similar to `RANK` except it will not skip the next number on a tie,
useful if you do not wants gaps in the rank.

| id  | score | rank |
| --- | ----- | ---- |
| 1   | 12    | 1    |
| 5   | 10    | 2    |
| 4   | 10    | 2    |
| 2   | 8     | 3    |
| 3   | 7     | 4    |

## Examples

### Top 3 Scorers

Given the schema below, find the top 3 scorers for both male and female. If
there is a tie, treat that as one rank.

```sql
create table scores (
    id serial primary key,
    name text not null, -- for this example don't worry about duplicate handling
    gender text not null check (gender in ('m', 'f')),
    score int not null, check (score >= 0)
);

insert into scores (name, gender, score) values
    ('Alice', 'f', 10),
    ('Bob', 'm', 12),
    ('Charlie', 'm', 8),
    ('Diana', 'f', 7),
    ('Eve', 'f', 10),
    ('Frank', 'm', 10),
    ('Grace', 'f', 8),
    ('Hank', 'm', 7),
    ('Ivy', 'f', 12),
    ('Jack', 'm', 10);
```

The answer:

```sql
with ranked_scores as (
    select
        name, gender, score,
        dense_rank() over (partition by gender order by score desc) as rank
    from scores
)
select *
from ranked_scores
where rank <= 3;
```

| name    | gender | score | rank |
| ------- | ------ | ----- | ---- |
| Ivy     | f      | 12    | 1    |
| Alice   | f      | 10    | 2    |
| Eve     | f      | 10    | 2    |
| Grace   | f      | 8     | 3    |
| Bob     | m      | 12    | 1    |
| Jack    | m      | 10    | 2    |
| Frank   | m      | 10    | 2    |
| Charlie | m      | 8     | 3    |

In the answer we use a CTE, this is beacuse the `where` clause is executed
before the `select` so we would get `rank not defined`. The way to solve this is
to execute the `select` before the `where` by use of a CTE. We also have chosen
to use `dense_rank` instead or `rank` or `row_number`, this is because we want
the top 3 ranks, so we include all people whos ranks are 1, 2 or 3.

### Running Total

Given the schema below find the running total of sales for each product over
time.

```sql
create table sales (
    id serial primary key,
    product_id int not null,
    sale_date date not null,
    amount numeric not null
);

insert into sales (product_id, sale_date, amount) values
    (1, '2024-01-01', 100),
    (2, '2024-01-01', 200),
    (3, '2024-01-02', 150),
    (2, '2024-01-02', 250),
    (1, '2024-01-03', 200),
    (2, '2024-01-03', 300),
    (3, '2024-01-03', 250),
    (1, '2024-01-04', 300),
    (2, '2024-01-04', 400),
    (3, '2024-01-04', 350),
    (4, '2024-01-05', 200);
```

The answer:

```sql
select
    product_id,
    sale_date,
    amount,
    sum(amount) over (partition by product_id order by sale_date) as running_total
from sales
order by product_id, sale_date;
```

| product_id | sale_date  | amount | running_total |
| ---------- | ---------- | ------ | ------------- |
| 1          | 2024-01-01 | 100    | 100           |
| 1          | 2024-01-03 | 200    | 300           |
| 1          | 2024-01-04 | 300    | 600           |
| 2          | 2024-01-01 | 200    | 200           |
| 2          | 2024-01-02 | 250    | 450           |
| 2          | 2024-01-03 | 300    | 750           |
| 2          | 2024-01-04 | 400    | 1150          |
| 3          | 2024-01-02 | 150    | 150           |
| 3          | 2024-01-03 | 250    | 400           |
| 3          | 2024-01-04 | 350    | 750           |
| 4          | 2024-01-05 | 200    | 200           |

In this example we have used a different function to get the running total:
`sum`. This is the right function as we want ot get the total (sum) of the
current row + the rows before it. We partition it by the `product_id` so we can
see per product the sales, and then we order it by `sale_date` so we can see
each sale how much the running total goes up by. As we are not using a `where`
clause there is no need to use a CTE, we can use the window function in the
regular query.
