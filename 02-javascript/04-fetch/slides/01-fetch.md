---
title: JS fetch
author: Osman B
marp: true
paginate: true
---

<!-- _class: lead -->

# JavaScript: Fetch API

<style>
section.lead h1 {
  text-align: center;
  font-size: 2.5em;
}
</style>

---

# Program:

- What is Fetch API?
- How to use Fetch API?
- Handling responses
- Error handling
- Working with JSON
- Sending data with Fetch API
- Fetch API and CORS

---

# What is Fetch API?

- Modern interface for making HTTP requests in JavaScript
- Returns `Promise` for easier async code

---

# How to use Fetch API?

```js
const BASE_URL = "https://someapi.com/api";

fetch(`${BASE_URL}/users`)
  .then(response =>  response.json())
  .then(data => console.log(data))
  .catch(error => {
    console.error('Error:', error);
  });
```

---

# Handling responses

- Fetch does not `reject` on HTTP error status (like 404 or 500)
- You must check **`response.ok`** and **`response.status`**

```js
const BASE_URL = "https://someapi.com/api";

fetch(`${BASE_URL}/users`)
  .then(response => {
    if (!response.ok) {
      throw new Error('HTTP error!: ' + response.status);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

---

# Error handling

- Use `.catch()` to handle network errors
- Always check `response.ok` for HTTP errors
- Example:

```js
const BASE_URL = "https://someapi.com/api";

fetch(`${BASE_URL}/users`)
  .then(response => {
    if (!response.ok) {
      throw new Error('HTTP error!');
    }
    return response.json();
  })
  .catch(error => console.error('Fetch error:', error));
```

---

# Working with JSON

- Most APIs return JSON data
- Use `response.json()` to parse JSON
- Example:

```js
const BASE_URL = "https://someapi.com/api";

fetch(`${BASE_URL}/users`)
  .then(response => response.json())
  .then(data => console.log('JSON data:', data));
```

---

# Sending data with Fetch API

- Use the `body` and `method` options to send data
- Set headers for JSON

```js
const BASE_URL = "https://someapi.com/api";

fetch(`${BASE_URL}/data`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'John', age: 30 })
})
  .then(response => response.json())
  .then(data => console.log(data));
```

---

# Fetch API and CORS

- CORS = Cross-Origin Resource Sharing
- Controls which domains can access resources on a server
- If CORS is not enabled on the server, fetch requests from other origins will fail
- **Example error:**
`Access to fetch at 'https://someapi.com/api/users' from origin 'http://localhost:5500' has been blocked by CORS policy`


**We will look more into CORS when we build a full-stack app.**

---

# Using Async/Await with Fetch

- Are keywords in JavaScript, which make working with promises easier.
- Syntactic sugar for working with promises
- Makes async code look like sync code!

---

```js
const BASE_URL = "https://someapi.com/api";

async function fetchData() {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) {
      throw new Error('HTTP error!');
    }
    const data = await response.json();
    console.log('JSON data:', data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

// Usage
fetchData();
```

