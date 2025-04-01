---
title: "Rollback in SQL"
publishedOn: 2025-04-01
tagline: "Learn why and how to rollback in SQL"
tags: ["sql"]
---

# Rollback in SQL

When working with SQL we often use raw SQL to interact with the database, this
can be to insert rows or delete rows sometimes. But how can you be sure that
you won't accidentally cause an issue? There is a feature in SQL called
"transactions". What transactions allow is to save a snapshot of the database
so that later on if you need to go back you can discard any changes made. This
is really useful if you make a mistake like update every row in a table
instead of a single one.

It is super simple to implement a transaction, there are 3 parts to a it:

```sql
-- Start the transaction
start transaction;

-- The actual sql you want to test first
delete from users where updated_at < now() - interval '1 year';

-- View the rows to check for mistakes
select count(*) from users;

-- If your happy with the changes you can commit them to the production database
commit;

-- If your not happy and want to revert the changes
rollback;
```
