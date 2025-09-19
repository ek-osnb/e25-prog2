# Fetch API CRUD Exercise: Users

## Goal
Practice using the Fetch API in JavaScript to perform full CRUD (Create, Read, Update, Delete) operations on the users resource at [`https://jsonplaceholder.typicode.com/users`](https://jsonplaceholder.typicode.com/users).

## API Reference
- [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)
- [JSONPlaceholder API Docs](https://jsonplaceholder.typicode.com/)

## Instructions

### 0. Setup:
   1. Create an `index.html` file with a basic HTML structure.
   2. In the `<body>`, add:
      - A `<div id="messages"></div>` for showing error/success messages.
      - A `<table id="usersTable"></table>` for displaying users.
      - A `<form id="userForm">` with input fields for name, email, etc., and a submit button.
   3. Create a `styles.css` file for your own styling and link it in the HTML `<head>`.
   4. Create an `app.js` file and link it at the end of the HTML `<body>`.
   5. Use `defer` in your script tag or place it at the end of `<body>` to ensure the DOM is loaded before your JS runs.

### 1. Read (GET):
   - In `app.js`, write an async function `fetchUsers()` that fetches users from the API using `fetch()` and `await`.
   - Parse the response as JSON and store the users in a variable.
   - Write a function `renderUsers(users)` that takes the users array and displays it as a table in the `#usersTable` element.
   - Each row should show user details (name, email, etc.) and have "Edit" and "Delete" buttons.
   - Add a `data-user-id` attribute to each row for easy identification.
   - Use event delegation: add a single click event listener to the table, and inside the handler, check if the clicked element is an Edit or Delete button (use `event.target`).
   - When the page loads, call `fetchUsers()` and then `renderUsers()`.

### 2. Create (POST):
   - In your HTML, add a form (`#userForm`) with input fields for at least name and email.
   - In `app.js`, add a submit event listener to the form. Prevent the default form submission with `event.preventDefault()`.
   - Collect the form data into a JS object.
   - Use `fetch()` with method `POST`, set headers to `Content-Type: application/json`, and send the user data as JSON in the body.
   - On success, add the new user to your users array and re-render the table.
   - Clear the form after submission.

### 3. Update (PUT/PATCH):
   - When the Edit button is clicked, fill the form fields with the selected user's data.
   - Change the form's mode to "edit" (e.g., store the editing user's ID in a variable).
   - On form submit, if editing, send a PUT or PATCH request to the API with the updated data.
   - On success, update the user in your users array and re-render the table.
   - Reset the form to "create" mode after editing is done.

### 4. Delete (DELETE):
   - When the Delete button is clicked, get the user ID from the row's data attribute.
   - Send a DELETE request to the API for that user.
   - On success, remove the user from your users array and re-render the table.

## Requirements
- Use async/await for all asynchronous code (fetching, creating, updating, deleting).
- Show error or success messages in the `#messages` div (e.g., "User created!", "Failed to fetch users.").
- Update the UI immediately after any change (add, edit, delete).
- Use clear variable and function names.

## Tips
- The API is fake and will not persist changes, but it will return simulated responses for POST, PUT, PATCH, and DELETE.
- Focus on practicing the Fetch API and DOM manipulation.
- Use `console.log()` to debug and inspect data at each step.
- Test each feature (read, create, update, delete) one at a time.
- If you get stuck, check the [JSONPlaceholder API Docs](https://jsonplaceholder.typicode.com/), or ask for help.

