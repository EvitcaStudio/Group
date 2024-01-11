# Group
The Group module is a powerful utility designed to simplify the manipulation of collections in JavaScript. It enables you to treat a set of elements as a single unit, allowing you to perform actions on the entire group without the need for cumbersome loops.

```js
// Example usage:
/**
 * An example group of objects with 'x' property.
 * @type {Group}
 */
const myGroup = Group.create([
  { x: 10, y: 20 },
  { x: 15, y: 25 },
  { x: 20, y: 30 }
]);

// Using forEach to change the 'x' value of each object in the group.
myGroup.forEach((pElement) => {
  pElement.x += 5;
}).forEach((pElement) => {
    console.log(pElement.x, pElement.y);
});
// Output: 15 20
//         20 25
//         25 30

// Example usage:
/**
 * An example group of numbers.
 * @type {Group}
 */
const myGroup2 = Group.create([1, 2, 3, 4]);

// Apply transformation and iterate over the elements.
myGroup2.map((pValue) => {
    return pValue * 3;
}).forEach((pValue) => {
    console.log(pValue);
});
// Output: 3, 6, 9, 12
```