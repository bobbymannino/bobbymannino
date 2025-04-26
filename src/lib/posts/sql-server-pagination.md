---
title: "SQL Server Pagination"
publishedOn: 2025-04-26
tagline: "Serve results in pages that don't take ages"
tags: ["sql", "sql-server"]
---

# SQL Server Pagination

## What is Pagination?

Sometimes it isn't necessary to have pages, for instance as of writing this post
I don't have enough posts that it will make an impactful difference but what
happens when I do? or you do? Well we can use a pagination to only return a
subset of results.

Pagination is a term used when splitting results into sections (pages). The
result of this is less network bandwidth, quicker response times, and improved
user experience.

## How does it work?

Pagination works by using the `OFFSET` and `FETCH` clauses in SQL Server. The
`OFFSET` clause specifies the number of rows to skip before starting to return
rows, and the `FETCH` clause specifies the number of rows to return.

If you exceed the number of results in the table, for instance retrieving rows
20-30, you will just get an empty result set back.

## Examples

### SQL Examples

For example, to retrieve the first 10 rows from a table, you can use the
following query:

```sql
SELECT *
FROM table_name
ORDER BY column_name
OFFSET 0 ROWS
FETCH NEXT 10 ROWS ONLY;
```

To retrieve the next 10 rows, you can use the following query:

```sql
SELECT *
FROM table_name
ORDER BY column_name
OFFSET 10 ROWS
FETCH NEXT 10 ROWS ONLY;
```

### Dynamic Examples

In the examples I just gave the values were hardcoded so they are more difficult
to change but if you are using a SQL adapter, ORM or some other method of
interacting with the database you can normally use variables like so:

```typescript
const perPage = 10;
const page = 1;

const sql = `SELECT *
FROM table_name
ORDER BY column_name
OFFSET ${(page - 1) * perPage} ROWS
FETCH NEXT ${perPage} ROWS ONLY;`;
```

In this example I have hardcoded the variables and not protected against SQL
injection but you get the idea.

Another method you could use is an user-defined SQL function. Whilst this does
make it quicker for using (DX wise not performance) it does make it more
difficult to alter on the fly as you will have to alter the function before
calling it.

```sql
create function GetProductsPage(@page int = 1, @per_page int = 10)
returns table as
return (
    select *
    from Products
    order by Featured desc, Name asc,
    offset (@page - 1) * @per_page rows
    fetch next @per_page rows only
);

-- Get first 10 products (1-10)
select * from GetProductsPage(default, default);

-- Get products 20-30 (3rd page)
select * from GetProductsPage(3, 10);

-- Get products 500-600 (6th page)
select * from GetProductsPage(6, 100);
```
