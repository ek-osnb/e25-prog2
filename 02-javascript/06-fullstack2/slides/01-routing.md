---
title: Fullstack 2
author: Osman B
marp: true
paginate: true
---

<!-- _class: lead -->

# Fullstack using JavaScript & Spring Boot

<style>
section.lead h1 {
  text-align: center;
  font-size: 2.5em;
}
</style>

---

## Program:
- Routing in frontend
- SPA vs MPA
- Sorting and filtering in backend

---

# Routing examples

- **Client-side routing:** Handled by the frontend (e.g., React Router, Vue Router)
- **Server-side routing:** Handled by the backend (e.g., Spring Boot)
- **Hybrid routing:** Combination of both client-side and server-side routing

---

## Single Page Application (SPA)

- Loads a single HTML page and dynamically updates content as the user interacts with the app

- The underlying mechanism of routing in SPAs is often implemented using the History API.

- This allows the application to change the URL in the browser without triggering a full page reload.

- The application listens for changes in the URL and updates the view accordingly.

---

## SPA and JavaScript

The History API provides methods like `pushState` and `replaceState` to manipulate the browser history.
```js
history.pushState({}, "", "/books/42");
```
The application can listen for the `popstate` event to handle back/forward navigation :
```js
window.addEventListener("popstate", handleLocation);
```
We can also retrieve the current path using `location.pathname`:
```js
const path = location.pathname; // e.g., "/books/42"
```

---

## Multi-Page Application (MPA)

- Each page is a separate HTML document served by the server.

- Navigation between pages involves full page reloads.

- The server handles routing and serves the appropriate HTML for each URL.

---

# MPA and JavaScript

- In an MPA, routing is primarily handled by the server. 

- When a user clicks a link, the browser sends a request to the server for a new page.

- The server responds with a new HTML document, which the browser loads, resulting in a full page reload.


---

# Frontend: Distributed vs Non-Distributed Architectures

**Distributed**
- Frontend and backend are separate applications, often hosted on different servers or domains.
- Communicate via REST APIs
- More complex to set up and manage, but allows for greater scalability and flexibility. **Why?**
- Requires handling CORS (Cross-Origin Resource Sharing) for security.
- CORS is a security feature implemented by browsers to restrict web pages from making requests to a different domain than the one that served the web page.

---
# Frontend: Distributed vs Non-Distributed Architectures

**Non-Distributed** or Monoliths
- Frontend and backend are part of the same application, served from the same server.
- Simpler to set up and manage, but can be less flexible and harder to scale.
- Frontend and backend communicate directly without the need for CORS.
- No need for CORS, since everything is served from the same origin.

---

## URLs: SPA vs MPA
- In SPAs, we use the History API to manage clean URLs, so we can easily create user-friendly URLs (e.g., `/about`, `/products/42`).

- In MPAs, we serve the HTML files from the server, and this is why we have routes like `/about.html` or `/products.html`. 

- For MPAs, to have clean URLs without the `.html` extension, we typically configure the server to map routes to the appropriate HTML files.

---

## Dynamic URLs
- Pathvariables are dynamic segments in a URL that is tied to a specific resource (e.g., `/books/{id}` where `{id}` is a pathvariable).

- In SPAs, we can handle pathvariables using the History API and JavaScript to parse the URL and extract the variable parts.

- In MPAs without SSR (Server Side Rendering), we can use query parameters (e.g., `/books?id=42`), to pass dynamic data to the server.

---

## Examples
- Simple SPA using history API
- Distributed MPA with Spring Boot backend and static frontend.
- Non-distributed MPA with Spring Boot serving both frontend and backend, but still communicating via REST API.


---

## Filtering and Sorting in Backend

- Filtering and sorting are common features in web applications to help users find and organize data.

- In a backend application, we can implement filtering and sorting by accepting query parameters in our API endpoints.

- For example, we can have an endpoint like `/api/books?author=John&sort=title,asc` to filter books by author and sort them by title in ascending order.

---

## Filtering and Sorting in Spring Boot

- In Spring Boot, we can use the `@RequestParam` annotation to capture query parameters in our controller methods.

- Sorting can be implemented using the `Sort` class from Spring Data.

- Filtering can be done by applying conditions to our database queries based on the received parameters.


