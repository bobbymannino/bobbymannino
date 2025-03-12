---
title: "Postgres Current Setting"
publishedOn: 2025-01-04
tagline: "Session/transaction variables in postgres"
tags: ["sql", "postgres"]
---

# Postgres Current Setting

Using `current_setting` in postgres is a way of obtaining session/transaction
variables. This is incredibly useful for debugging and understanding the
environment in which your queries are running.

## Setting a Variable

`set_config` is a way to store a text value in the postgres connection. This
function takes in 3 arguments:

`setting_name` [text], The key of what you want to store.

`new_value` [text], The value of what you want to store.

`is_local` [boolean], If true the value will only persist for the current
transaction, otherwise will persist for as long as the current session is alive.

The function will return what is entered into `new_value`.

In practice, it would look like this:

```sql
SELECT set_config('auth.uid', '1234', false);
```

## Getting a Variable

`current_setting` takes in two arguments (the second being optional):

`setting_name` [text], This is the key of the value you want to get.

`missing_ok` [boolean?] If false or undefined then will throw an error if the
key does not exist, otherwise will return the value.

Using the function would look like this:

```sql
SELECT current_setting('auth.uid', true);
```
