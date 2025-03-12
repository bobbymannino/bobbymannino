---
title: "Sets And Maps"
publishedOn: 2025-01-15
tagline: "What are sets and maps? And when to use them?"
tags: ["maps", "sets"]
---

# Sets and Maps

## Sets

### What is a Set?

A set is a collection (list) of unique values. Each element in a set can only
contain one item, but it can be of any type, such as an object, number, string,
etc. Sets are built into most languages by default.

```javascript
const mySet = new Set();
mySet.add(1);
mySet.add(2);
mySet.add(3);
mySet.add(4);
mySet.add(3);
// mySet = Set { 1, 2, 3, 4 }
```

### Why use Sets?

Sets are often more performant than arrays when you need to check if a value
exists in a collection. This is because sets are optimized for this operation.
Sets are also useful when you need to ensure that a value is unique in a
collection.

Sets also have to have a lookup time complexity of better then O(N) by default.
Depending on the language and the set type (number, record, etc) the time
complexity for `mySet.has()` can be as low as O(log(N)).

### Example

Often sets are used in JavaScript to create seperate duplicates from an array
like so:

```javascript
const arr = [1, 2, 3, 3, 2];
const uniqueArr = [...new Set(arr)];
// uniqueArr = [1, 2, 3]
```

## Maps

### What is a Map?

A map is a datatype that holds key value pairs (similar to a record/object) but
with a few key differences. A key for a map can be any primivte data type or
object. Each key must be unique still.

Similar to sets, maps must also feature lookup time complexity of better then
O(N).

### Map vs Object

- A map has 0 keys by default, it only contains what you put into it
- A map's key type can be any value, such as a function, object, etc
- A map is ordered by insertion order, so you can create a history
- A map has a `.size` property so you can get the number of elements
- A map is iterable by default
- Maps are safe to use with user provided keys, whereas objects may allow object inection attacks
- Maps are optimized for adding/removing key value pairs
- Maps do not have built in serialization/parsing like objects do, but it is simple to create your own

### Example

```javascript
const myMap = new Map();
myMap.set(1, { name: "Bob" });
myMap.set(2, { name: "Alice" });
myMap.set(3, { name: "Charlie" });
// myMap = Map { 1 => { name: "Bob" }, 2 => { name: "Alice" }, 3 => { name: "Charlie" } }

const size = myMap.size;
// size = 3

myMap.delete(2);

for (const [key, value] of myMap) {
  console.log(key, value);
  // 1, { name: "Bob" }
  // 3, { name: "Charlie" }
}

const hasTwo = myMap.has(2);
// hasTwo = false
```
