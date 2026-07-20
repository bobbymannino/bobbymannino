---
title: "Logical Replication in Postgres"
tagline: "Logical replication in postgres through publications and subscriptions"
tags: ["sql", "postgres"]
---

# Logical Replication in Postgres

A Postgres publication/subscription replicates changes between Postgres
Databases. This is called **logical replication**. A publication defines the
tables and operations a source database publishes; a subscription connects a
target database to that publication and applies its changes.

Logical replication is one-way: the publisher sends changes to one or more
subscribers. It can let a client read a local copy while it is offline, but it
does not automatically send client-side writes back to the server or resolve
conflicts. Those need an application-level sync strategy.

## Use Cases

Some real-world use cases for this feature include:

- Replicating a central database to read-only reporting databases.
- Keeping a local, queryable copy of server data on a client that may be
  offline.
- Sending a selected set of tables to another service without giving it access
  to the rest of the database.

## Prerequisites

The publisher must have enough write-ahead log (WAL) capacity for logical
replication. Set the following values in `postgresql.conf` on the publisher and
restart Postgres:

```conf
wal_level = logical
max_replication_slots = 4
max_wal_senders = 4
```

`max_replication_slots` must cover every subscription, plus room for initial
synchronization workers. `max_wal_senders` must cover those logical replication
connections and any physical replicas.

The publisher must also accept connections from the subscriber in `pg_hba.conf`.
For example, where `10.0.0.24` is the subscriber's address:

```conf
host    replication    replicator    10.0.0.24/32    scram-sha-256
host    inventory      replicator    10.0.0.24/32    scram-sha-256
```

Reload the configuration after updating `pg_hba.conf`:

```sql
select pg_reload_conf();
```

## Example: Replicate an `orders` Table

This example uses an `inventory` database as the publisher and a separate
`inventory_client` database as the subscriber.

### 1. Create the Table on the Publisher

Run this on the publisher's `inventory` database:

```sql
create table public.orders (
    id bigint generated always as identity primary key,
    customer_name text not null,
    total_cents integer not null check (total_cents >= 0),
    created_at timestamptz not null default now()
);

insert into public.orders (customer_name, total_cents) values
    ('Ada Lovelace', 2500),
    ('Grace Hopper', 4800);
```

A primary key is important when updates or deletes are published. Postgres uses
it as the table's default replica identity to find the corresponding row on the
subscriber.

### 2. Create a Publication

Still on the publisher, create a publication for the table:

```sql
create publication inventory_orders
    for table public.orders;
```

By default this publishes `INSERT`, `UPDATE`, `DELETE`, and `TRUNCATE`
operations. A publication can include more than one table:

```sql
create publication inventory_data
    for table public.orders, public.customers;
```

To publish inserts only, which does not require a replica identity, specify the
operations explicitly:

```sql
create publication order_events
    for table public.orders
    with (publish = 'insert');
```

The role creating a publication needs `CREATE` permission on the database and
must own the tables it adds to that publication.

### 3. Create the Matching Table on the Subscriber

Logical replication replicates row data, not schema definitions. Before creating
the subscription, create the destination table on the subscriber's
`inventory_client` database:

```sql
create table public.orders (
    id bigint generated always as identity primary key,
    customer_name text not null,
    total_cents integer not null check (total_cents >= 0),
    created_at timestamptz not null default now()
);
```

Tables are matched by fully qualified name and their columns are matched by
name, not position. The subscriber can have extra columns when they have a
default value or allow `NULL`.

### 4. Create the Subscription

Create the subscription on the subscriber. Replace `publisher.internal` with the
publisher host. The `passfile` path is on the **subscriber server**, must be
readable by the Postgres service account, and contains the password for
`replicator`.

```sql
create subscription inventory_from_server
    connection 'host=publisher.internal port=5432 dbname=inventory
        user=replicator sslmode=require
        passfile=/var/lib/postgresql/.pgpass'
    publication inventory_orders;
```

> Note: You can also use a `postgres://...` connection string.

The initial table copy is enabled by default, so the two existing `orders` rows
are copied before ongoing changes are streamed. Start with an empty subscriber
table, or make sure existing rows cannot conflict with the copied rows.

Creating a subscription normally creates a logical replication slot on the
publisher. The subscriber role needs `CREATE` permission on its database and
membership in `pg_create_subscription` (or superuser privileges).

## Verify Replication

On the subscriber, confirm the initial copy arrived:

```sql
select id, customer_name, total_cents
from public.orders
order by id;
```

| id  | customer_name | total_cents |
| --- | ------------- | ----------- |
| 3   | Ada Lovelace  | 2500        |
| 2   | Grace Hopper  | 4800        |

Then insert a row on the publisher:

```sql
insert into public.orders (customer_name, total_cents)
values ('Katherine Johnson', 3700);
```

The row should appear on the subscriber shortly after. To inspect the
subscription worker on the subscriber, run:

```sql
select subname, pid, received_lsn, latest_end_lsn, latest_end_time
from pg_stat_subscription;
```

On the publisher, check that the replication slot is active:

```sql
select slot_name, active, confirmed_flush_lsn
from pg_replication_slots
where slot_name = 'inventory_from_server';
```

## Updates and Deletes

For a publication that includes updates or deletes, every published table needs
a replica identity. A primary key satisfies this by default. If a legacy table
has a suitable unique index, use it instead:

```sql
alter table public.orders
    replica identity using index orders_pkey;
```

For a table without a primary key or suitable unique index, `REPLICA IDENTITY
FULL` records the old row values in WAL so Postgres can find it. It can be much
more expensive and should be a last resort:

```sql
alter table public.legacy_orders
    replica identity full;
```

## What Is Not Replicated

Publications and subscriptions do not replicate DDL (data definition language).
Create and migrate tables, indexes, constraints, functions, and permissions
separately on both databases. Sequence state is also not replicated, so a
subscriber that accepts local writes must manage non-overlapping IDs itself.

Logical replication does not provide conflict resolution. Avoid writing to the
same replicated rows on both publisher and subscriber unless your application
has a deliberate design for conflict detection and resolution.

## Cleaning Up

Drop the subscription from the subscriber first. This also removes its
publisher-side replication slot by default:

```sql
drop subscription inventory_from_server;
```

Then remove the publication from the publisher if it is no longer needed:

```sql
drop publication inventory_orders;
```

---

## Resources

[Publication Docs](https://www.postgresql.org/docs/current/logical-replication-publication.html)

[Subscription Docs](https://www.postgresql.org/docs/current/logical-replication-subscription.html)

[Logical Replication Configuration](https://www.postgresql.org/docs/current/logical-replication-config.html)
