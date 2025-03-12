---
title: "ACID Databases"
publishedOn: 2024-12-23
tagline: "Atomicity, Consistency, Isolation and Durability"
tags: ["database", "acid"]
---

# What is ACID?

ACID is an acronym that stands for Atomicity, Consistency, Isolation, and
Durability. These are the four key properties of a transaction in a database
system. A transaction is a sequence of operations that are executed as a single
'action'. The ACID properties ensure that the database remains in a consistent
state even in the presence of failures.

## Atomicity

Atomicity is treating a transaction (multiple 'actions') as a single action, so
if one fails they all fail and revert back. This ensures that the database stays
consistent.

```sql
update users set balance = balance - 100 where id = 1;
update users set balance = balance + 100 where id = 2;
```

If user 1 doesn't have the balance (balance cannot be below 0) nothing will be
added to the balance of user 2.

## Consistency

This means that transactions must be kept valid from one state to another.

```sql
create table users (
    id serial primary key,
    balance int not null default 0 check(balance >= 0)
);

update users set balance = -100 where id = 1;
```

The above statement wouldn't work as the balance has to be above or equal to 0.

## Isolation

Isolation ensures that the execution of transactions does not interfere with
each other. This means that transactions are executed independently of each
other and if there are 2 transactions trying to access/modify the same data
at the same time, only one can do so at once. This ensures there are no
'dirty reads'.

## Durability

Once a transaction is committed, it will remain in the system even if there is a
system failure. This means that the changes made by the transaction are
permanent.
