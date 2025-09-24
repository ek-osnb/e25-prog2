
# JavaScript Array Methods Exercises

## Map

Mapping over an array creates a new array by applying a function to each element of the original array.

### 1. Mapping over numbers
Given an array of numbers, use `.map()` to create a new array where each number is doubled. Print the result to the console.

```js
const numbers = [1, 2, 3, 4];
```

**`.map()` does not modify the original array!**

### 2. Mapping over objects
Given an array of objects representing users, use `.map()` to create a new array containing only the names of the users. Print the result to the console.
```js
const users = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Eve", age: 22 }
];
```

## Filter

The `.filter()` method creates a new array with all elements that pass the test implemented by the provided function.

**It does not modify the original array!**

### 3. Filter with numbers

Given an array of numbers, use `.filter()` to create a new array with only the even numbers. Print the result to the console.

```js
const numbers = [1, 2, 3, 4, 5, 6];
```

### 4. Filter with objects
Given an array of objects representing users, use `.filter()` to create a new array containing only users who are 18 years old or older. Print the result to the console.

```js
const users = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 17 },
    { name: "Eve", age: 22 }
];
```

## Reduce

The `.reduce()` method executes a reducer function (that you provide) on each element of the array, resulting in a single output value.

It takes an accumulator and the current value as arguments, including an initial value for the accumulator. Example:
```js
const sum = [1, 2, 3].reduce((acc, cur) => acc + cur, 0); // sum will be 6
```

### 5. Reduce with numbers

Given an array of numbers, use `.reduce()` to find the sum of all numbers in the array. Print the result to the console.

```js
const numbers = [5, 10, 15];
```

### 6. Reduce with objects
Given an array of objects representing users, use `.reduce()` to calculate the total age of all users. Print the result to the console.

```js
const users = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Eve", age: 22 }
];
```

## Find

The `.find()` method returns the value of the first element in the array that satisfies the provided testing function. If no values satisfy the testing function, `undefined` is returned.

The `.find()` takes a callback function with three arguments: the current element, the index of the current element (and the array itself).

Example:
```js
const foundUser = users.find((user, index, array) => user.name === "Alice");
```


## 7. Find

Given an array of objects representing workers, use `.find()` to locate the first worker who is older than 30 years. Print the result to the console.

```js
const workers = [
    { name: "John", age: 28 },
    { name: "Jane", age: 32 },
    { name: "Jim", age: 25 }
];
```


## Some & every
The `.some()` method tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value.

The `.every()` method tests whether all elements in the array pass the test implemented by the provided function. It also returns a Boolean value.

### 8. Some & Every

Given an array of ages, use `.some()` to check if any age is over 18, and `.every()` to check if all ages are over 18. Print the results to the console.

```js
const ages = [16, 21, 18, 19];
```

## Sorting

For [sorting arrays in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort), you can use the `.sort()` method. It can be used in two different ways:
```js
.sort() // sorts the array in place and returns the sorted array
.sort(compareFn) // sorts the array using the provided compare function
```
When using the compare function, it takes two arguments (a, b) and should return:
- A negative number if a should come before b
- A positive number if a should come after b
- Zero if they are equal

For example given an array of number (e.g. `const numbers = [10, 2, 33, 4];`)
- `const compareFn = (a, b) => a - b;` sorts numbers in ascending order.
- `const compareFn = (a, b) => b - a;` sorts numbers in descending order.

**It is important to note that `.sort()` modifies the original array!**

## 9. Sorting arrays of numbers

Given an array of numbers, use `.sort()` to sort the array in ascending and descending order. Print each sorted array to the console.

```js
const numbers = [10, 2, 33, 4];
```

## 10. Sorting arrays of strings

When sorting strings, we use `localeCompare` for proper alphabetical sorting. Example: `a.name.localeCompare(b.name)`.

- `const compareFn = (a, b) => a.name.localeCompare(b.name);` sorts users by name in ascending order.
- `const compareFn = (a, b) => b.name.localeCompare(a.name);` sorts users by name in descending order.


Given an array of strings, use `.sort()` to sort the array in alphabetical order (a-z and z-a)  print the array to the console.

```js
const carBrands = ["Toyota", "BMW", "Audi", "Mercedes"];
```

## 11. Sorting objects

Given an array of objects representing users, use `.sort()` to sort the array by age in ascending and descending order.

```js
const users = [
	{ name: "Bob", age: 25 },
	{ name: "Alice", age: 30 },
	{ name: "Eve", age: 22 }
];
```

## 12. Sorting objects by any key

Write a generic compare function for sorting objects by any given key.

```js
const users = [
    { name: "Bob", age: 25 },
    { name: "Alice", age: 30 },
    { name: "Eve", age: 22 }
];
```
**Hint:** To check if a value is a string, you can use `typeof value === 'string'`, and for numbers, `typeof value === 'number'`.

**Hint 2:** You can use the following template for the compare function:
```js
function compareByKey(key, ascending = true) {
    return (a, b) => {
        const valA = a[key];
        const valB = b[key];

        if (typeof valA === 'number' && typeof valB === 'number') {
            // TODO: return comparison for numbers
        }
        // TODO: return comparison for strings
    };
}
```

## 13. Chaining array methods

Given an array of numbers, use `.filter()` and `.map()` together to get a new array of the squares of only the odd numbers.

```js
const numbers = [1, 2, 3, 4, 5];
```