---
title: "Lateral Joins"
tagline: "Lateral joins vs joins"
publishedOn: 2025-04-25
tags: ["sql"]
---

# Lateral Joins

## What is a Lateral Join

A lateral join is a modifier on a join subquery to help pass data from the outer
query to the inner query. This is useful when you need to join a table with a
subquery that depends on the data from the outer query.

Lateral was first introduced in PostgreSQL 9.2 (2014) and soon after some other
SQL dialects implemented their own versions. In the example i'm about to give I
will use SQL Servers implementation of a similar feature called `APPLY`.

## Example

Suppose you have 2 tables: `orders` and `products`. Your task is to get the
first 3 items in each order.

### Setup

```sql
-- Create the `Order` table
create table [Order] (
    OrderID int identity(1, 1) primary key,
    OrderDate date not null default getdate()
);

-- Create the `OrderItem` table
create table [OrderItem] (
    OrderItemID int identity(1, 1) primary key,
    OrderID int not null foreign key references [Order](OrderID),
    ProductName varchar(100) not null
);

-- Populate `Order` table
insert into [Order] (OrderDate) values
    (getdate()),
    (getdate()),
    (getdate()),
    (getdate()),
    (getdate());

-- Populate `OrderItem` table
insert into [OrderItem] (OrderID, ProductName) values
    (1, 'Car'),
    (1, 'Crane'),
    (1, 'Barbie'),
    (1, 'Doll'),
    (1, 'Keys'),
    (1, 'Phone'),
    (1, 'Tablet'),
    (1, 'Wallet'),
    (1, 'Car'),
    (2, 'Crane'),
    (2, 'Barbie'),
    (2, 'Doll'),
    (2, 'Keys'),
    (2, 'Phone'),
    (2, 'Tablet'),
    (2, 'Wallet'),
    (3, 'Car'),
    (3, 'Crane'),
    (4, 'Barbie'),
    (5, 'Doll'),
    (3, 'Keys'),
    (5, 'Phone'),
    (4, 'Tablet'),
    (2, 'Wallet'),
    (3, 'Cable'),
    (3, 'Crane'),
    (4, 'Dock'),
    (5, 'AirPods'),
    (3, 'Keys'),
    (5, 'Sharpie'),
    (4, 'Tablet'),
    (2, 'Wallet');
```

### Retrieving

You may thing to use something like `STRING_AGG` (or maybe `JSON_ARRAYAGG` in
postgres) along with `GROUP` & `TOP` (`LIMIT` in postgres) and whilst that does
return data, the part that is limited it the quantity of rows instead of
quantity of products per row.

```sql
select top 3 o.OrderId, string_agg(oi.ProductName, ', ') as Products
from [Order] o
join [OrderItem] oi on o.OrderID = oi.OrderID
group by o.OrderID
```

| OrderId | Products                                                         |
| ------- | ---------------------------------------------------------------- |
| 1       | Car, Crane, Barbie, Doll, Keys, Phone, Tablet, Wallet, Car       |
| 2       | Crane, Barbie, Doll, Keys, Phone, Tablet, Wallet, Wallet, Wallet |
| 3       | Car, Crane, Keys, Cable, Crane, Keys                             |

You can of course use a CTE (common table expression) or even row functions but
for this example we will pretend they do not exist.

The next attempt we could try using a subquery to retrieve the products for each
order.

```sql
select o.OrderId, string_agg(oi.ProductName, ', ') as Products
from [Order] o
cross apply (
    select top 3 ProductName
    from [OrderItem]
    where OrderID = o.OrderID
    order by OrderItemID
) oi
group by o.OrderId;
```

| OrderId | Products             |
| ------- | -------------------- |
| 1       | Car, Crane, Barbie   |
| 2       | Crane, Barbie, Doll  |
| 3       | Car, Crane, Keys     |
| 4       | Barbie, Tablet, Dock |
| 5       | Doll, Phone, AirPods |

Now we can see every row in the table and only the first 3 orders for each one.
Whilst this is a very useful tool (especially in postgres) it is not the most
common tool I have used and for most of the time (including this example) there
are more efficient ways you solve the problem.
