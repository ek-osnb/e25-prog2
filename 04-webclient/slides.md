---
marp: true
title: "WebClient in Spring Boot"
version: "1.0"
paginate: true
---

<!-- _class: lead -->

# WebClient
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

---

# What is WebClient?

> *WebClient is a **non-blocking**, reactive client for making HTTP requests in Spring applications. It is part of the **Spring WebFlux** module and is designed to work with reactive programming paradigms.*

---

# WebClient vs RestTemplate
- **WebClient** is non-blocking and supports reactive programming, making it suitable for high-throughput applications.
- **RestTemplate** is blocking and synchronous, which can lead to thread exhaustion under high load.
- WebClient provides a more modern and flexible API compared to RestTemplate.

---

# Demo: WebClient vs RestTemplate

---

# Configuration


**Easy setup with Spring Boot:**
```java
@Bean
public WebClient webClient(WebClient.Builder builder) {
    return WebClient.create("https://api.example.com");
}
```
- We can provide the webclient as a bean and inject it where needed.

---

## Making a GET Request
```java
record ResponseType(String field1, int field2) { }

public Flux<ResponseType> getResources() {
    return webClient.get()
        .uri("/resources")
        .retrieve()
        .bodyToFlux(ResponseType.class);
}
```
- `retrieve()` initiates the request and prepares to extract the body.
- `bodyToFlux()` converts the response body into a reactive Flux stream of the specified type.

---

## Making a POST Request
```java
record RequestType(String field1, int field2) { }
public Mono<ResponseType> createResource(RequestType request) {
    return webClient.post()
        .uri("/resources")
        .bodyValue(request)
        .retrieve()
        .bodyToMono(ResponseType.class);
}
```
- `bodyValue()` sets the request body.
- `bodyToMono()` converts the response body into a Mono of the specified type.

---

## Making a PUT Request
```java
public Mono<ResponseType> updateResource(String id, RequestType request) {
    return webClient.put()
        .uri("/resources/{id}", id)
        .bodyValue(request)
        .retrieve()
        .bodyToMono(ResponseType.class);
}
```

---

## Making a DELETE Request
```java
public Mono<Void> deleteResource(String id) {
    return webClient.delete()
        .uri("/resources/{id}", id)
        .retrieve()
        .bodyToMono(Void.class);
}
```

---

## Handling Errors
```java
public Mono<ResponseType> getResource(String id) {
    return webClient.get()
        .uri("/resources/{id}", id)
        .retrieve()
        .onStatus(HttpStatus::is4xxClientError, response ->
            Mono.error(new RuntimeException("Client error")))
        .onStatus(HttpStatus::is5xxServerError, response ->
            Mono.error(new RuntimeException("Server error")))
        .bodyToMono(ResponseType.class);
}
```
- `onStatus()` allows handling specific HTTP status codes and mapping them to exceptions.

---

## Merging data from Multiple Endpoints
```java
public Mono<CombinedResponse> getCombinedData(String id) {
    Mono<ResponseTypeA> responseA = getResourceA(id);
    Mono<ResponseTypeB> responseB = getResourceB(id);
    return Mono.zip(responseA, responseB)
        .map(tuple -> new CombinedResponse(tuple.getT1(), tuple.getT2()));
}
```
- `Mono.zip()` combines multiple Mono instances and waits for all to complete.

---

## Merging users and posts

If we have two endpoints `/users` and `/posts?userId={id}`, we can combine them like this:

```java
public Flux<UserWithPosts> getUsersWithPosts() {
    return webClient.get()
        .uri("/users")
        .retrieve()
        .bodyToFlux(User.class)
        .flatMap(user ->
            getPostsByUserId(user.id())
                .collectList()
                .map(posts -> new UserWithPosts(user, posts))
        );
}
```

---
## Merging users and posts

If we have two endpoints `/users` and `/posts`, we can combine them like this:

```java
public Flux<UserWithPosts> getUsersWithPosts() {
    Flux<ResponseTypeA> responseA = getResourceA(id);
    Flux<ResponseTypeB> responseB = getResourceB(id);
    return usersFlux.flatMap(
                user -> postsFlux
                        .filter(post -> post.userId().equals(user.id()))
                        .collectList()
                        .map(posts -> new UserWithPosts(user.id(), user.name(), posts))
        );
}
```
- Here, we fetch all users and for each user, we filter posts that belong to that user.

---

## Flux vs Mono

- **Mono**: Represents a single asynchronous value or no value (0..1). Used when you expect zero or one result.
- **Flux**: Represents a stream of asynchronous values (0..N). Used when you expect multiple results.

---

# Methods for Mono and Flux

- **Creating**:
  - `Mono.just(value)`, `Flux.fromIterable(list)`
- **Transforming**:
  - `map()`, `flatMap()`
- **Filtering**:
  - `filter()`
- **Combining**:
  - `zip()`
- **Subscribing**:
  - `subscribe()`

---

# Mono example
```java
Mono<String> mono = Mono.just("Hello, World!")
    .map(String::toUpperCase);

mono.subscribe(System.out::println);
```
- If we don't call `subscribe()`, the operations won't execute. This is due to the lazy nature of reactive streams.

---

# Flux example
```java
Flux<Integer> flux = Flux.range(1, 5)
    .filter(n -> n % 2 == 0)
    .map(n -> n * n);

flux.subscribe(System.out::println);
```
- Similar to `Mono`, we need to call `subscribe()` on a `Flux` to trigger the processing.

---