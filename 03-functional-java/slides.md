---
marp: true
title: "Functional Programming & Streams in Java"
version: "1.0"
paginate: true
---

<!-- _class: lead -->

# Functional Programming & Streams in Java
### 3rd semester @ Erhvervsakademi København


<style>
section.lead h1 {
  text-align: center;
  font-size: 2.5em;
}
section.lead h3 {
  text-align: center;
  opacity: 0.6;
}
</style>

---

# Program
- Functional Programming concepts
- Lambda Expressions
- Method References
- Streams API
- Stream operations: filter, map, reduce, collect

---

# Functional Programming in Java

> *Functional programming is a **programming paradigm** that emphasizes the use of functions (methods) to decompose problems into **subtasks**.*

---

# Key Concepts of Functional Programming

- **First-Class Functions**: Functions are treated as first-class citizens. They can be passed as arguments, returned from other functions, and assigned to variables.
- **Higher-Order Functions**: Functions that can take other functions as arguments or return them as results.
- **Pure Functions**: Functions that always produce the same output for the same input and have no side effects.
- **Immutability**: Data is immutable, meaning it cannot be changed after it is created. Instead, new data structures are created from existing ones.

---

# Why Functional Programming?

- More **declarative**, less boilerplate
- Enables **parallelism** and **stream processing**
- Improves **readability** and **maintainability**
- Ideal for **data transformations** and **pipelines**

---

# Lambda Expressions

> Lambda expressions provide a clear and concise way to represent a single method interface using an expression.

**General syntax:**
```java
(parameters) -> expression
```

**Example:**
```java
(x, y) -> x + y
```
We have seen this in JavaScript (notice the difference that JavaScript uses the `=>` syntax):

---

# Method References
> Method references provide a way to refer to methods without executing them. They are a shorthand notation of a lambda expression to call a method.
**Syntax:**
```java
ClassName::methodName
```

**Example:**
```java

List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

names.forEach(name -> System.out.println(name)); // Lambda expression
names.forEach(System.out::println);              // Method reference 
```

---

# Functional Interfaces

> A functional interface is an interface that contains exactly one abstract method. They can be implemented using lambda expressions or method references.

**Common functional interfaces in Java:**
- `Predicate<T>` → **`.test(T t)`** returns a boolean
- `Function<T, R>` → **`.apply(T t)`** returns R
- `Consumer<T>` → **`.accept(T t)`** performs an action, returns void
- `Supplier<T>` → **`.get()`** returns T

---


# Example: Using Predicate

```java

List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);

// Predicate to check if a number is even
Predicate<Integer> isEven = n -> n % 2 == 0;

// Usage
isEven.test(4); // returns true
isEven.test(5); // returns false
```

---

# Methods of Predicate

- `and(Predicate other)`: Combines two predicates with a logical AND.
- `or(Predicate other)`: Combines two predicates with a logical OR.
- `negate()`: Negates the predicate.

**de Morgan's Laws:**
- `!(A && B) == !A || !B` = `A.negate().or(B.negate())` which is equivalent to `!(A.and(B))`
- `!(A || B) == !A && !B` = `A.negate().and(B.negate())` which is equivalent to `!(A.or(B))`
---

# Custom Functional Interface

**Defining a custom functional interface:**
```java
@FunctionalInterface
public interface MathOperation {
    int calculate(int a, int b);
} 
```

**Usage with Lambda:**
```java
MathOperation addition = (a, b) -> a + b;
int result = addition.calculate(5, 3);
```

---

# Making it generic

**Defining a custom functional interface with generics:**
```java
@FunctionalInterface
public interface MathOperation<T> {
     T calculate(T a, T b);
} 
```

**Usage with Lambda:**
```java
MathOperation<Integer> addition = (a, b) -> a + b;
int result = addition.calculate(5, 3);
```

---

# Chaining Functional Interfaces

> We can chain functional interfaces using default methods like `andThen()` and `compose()`.

<br/>

```java
Function<Integer, Integer> add2 = n -> n + 2;
Function<Integer, Integer> multiply3 = n -> n * 3;

Function<Integer, Integer> combined = add2.andThen(multiply3);
int result = combined.apply(5);
```
---

# Java Streams API

> The Streams API provides a modern way to process sequences of elements (like collections) in a functional style.

**Key features:**
- Declarative: Focus on what to do, not how to do it.
- Chaining: Combine multiple operations in a fluent manner.
- Lazy evaluation: Operations are not executed until a terminal operation is invoked.

---

# Declarative vs Imperative Programming

**Imperative Programming:**
> Focuses on how to perform tasks using statements that change a program's state.


**Declarative Programming:**
> Focuses on what the program should accomplish without specifying how to achieve it.


---

# Example (Filtering for Even Numbers): Imperative
**Imperative:**
```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);

List<Integer> evenNumbers = new ArrayList<>();
for (Integer n : numbers) {
    if (n % 2 == 0) {
        evenNumbers.add(n);
    }
}
```

---

# Example (Filtering for Even Numbers): Declarative

**Declarative:**
```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);

List<Integer> evenNumbers = numbers.stream()
    .filter(n -> n % 2 == 0)
    .collect(Collectors.toList());
```

---
# Stream Operations
**Intermediate Operations**:
Transformations that return a new stream (e.g., `.filter()`, `.map()`, `.sorted()`).

**Terminal Operations**:
Produce a result or side effect and terminate the stream (e.g., `.collect()`, `.forEach()`, `.reduce()`).
<br/>

> **Lazy Evaluation**: Intermediate operations are not executed until a terminal operation is invoked.

---
# Example: Stream Operations
```java
List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");

List<String> filteredNames = names.stream()
    .filter(name -> name.startsWith("A"))
    .map(String::toUpperCase)
    .toList();
```

---

# Example: Reduce Operation
```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
int sum = numbers.stream()
    .reduce(0, (a, b) -> a + b);
```

---

# Generics and Streams
> Generics is used extensively in the Streams API to ensure type safety and reusability.


**Example (from the `Stream` interface):**
```java
<R> Stream<R> map(Function<? super T, ? extends R> mapper);
```
- Here, `T` is the type of input elements, and `R` is the type of output elements after applying the mapping function.
- `? super T`: The function can accept `T` or any of its supertypes as input.
- `? extends R`: The function can return `R` or any of its subtypes as output.
