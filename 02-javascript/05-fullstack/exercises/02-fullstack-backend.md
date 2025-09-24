# Fullstack Backend Exercises

In this exercise, you will create a backend, to replace the fake API (https://jsonplaceholder.typicode.com/users) we used in the previous exercise.

## Fullstack Setup

### 1. Setup
- Create a new directory for your project:
    ```bash
    mkdir fullstack
    ```
- Create a new Spring Boot project in this directory, named backend.
- Add the following dependencies:
    - Spring Web
    - Spring Data JPA
    - H2 Database
    - MySQL Driver
- Create a new directory for your frontend:
    ```bash
    mkdir frontend
    ```
- Copy the `index.html`, `styles.css`, and `app.js` files from the previous exercise into the `frontend` directory.

### 2. Define the User Entity
- In the `backend` project, create a `User` entity class with the following fields:
    - `id` (Long, primary key, auto-generated)
    - `name` (String)
    - `email` (String)
    - `username` (String)

    **Note:** `user` is a reserved keyword in MySQL, so you should use the `@Table` annotation to specify a different table name, e.g., `users`.

### 3. Create the User Repository
- Create a `UserRepository` interface that extends `JpaRepository<User, Long>`.

### 4. Create a UserController
- Create a `UserController` class with the following endpoints:
    - `GET /api/users`: Retrieve all users.
    - `GET /api/users/{id}`: Retrieve a user by ID.
    - `POST /api/users`: Create a new user.
    - `PUT /api/users/{id}`: Update an existing user.
    - `DELETE /api/users/{id}`: Delete a user.

### 5. Configure the Database
- In `src/main/resources/application.properties`, configure the H2 database for development:
```properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.username=sa
spring.datasource.password=
spring.h2.console.enabled=true
spring.jpa.hibernate.ddl-auto=update
```

### 6. Configure CORS
- In the `UserController`, add CORS configuration to allow requests from your frontend (e.g., `http://localhost:5500`).

### 7. Sample Data
- Create a InitData class to populate the database with some sample users on application startup.

### 8. Update the Frontend
- Update the frontend `app.js` to point to your backend API (e.g., `http://localhost:8080/api/users`).

### 9. Run the Application
- Start the Spring Boot application.
- Open the `index.html` file in your browser.
- Test the CRUD operations (Create, Read, Update, Delete) through the frontend interface.

## Sorting Feature

You will implement a sorting feature for the user table in the frontend. When a user clicks on a table header (Name, Age, Email), the table should be sorted by that column. Clicking the same header again should toggle the sort direction (ascending/descending).

### 10.
- Define two global variables:
    - `currentSortKey` (string) to keep track of the currently sorted column.
    - `currentSortDirection` (string) to keep track of the current sort direction ('asc' or 'desc').
    - Give them initial values.

### 11. Add Click Event Listeners to Table Headers
- Update the `<th>` elements (in `index.html`) in the table header to include two attributes:
    - `data-key` with values "name", "age", and "email" etc.
    - `data-label` with values as "Name", "Age", and "Email" etc.
    - Example:
    ```html
    <th data-key="name" data-label="Name">Name</th>
    ```

- Add a click event listener to the `<thead>` element to handle clicks on the headers.

### 12. Sort the Data Array
- When a header is clicked, retrieve the `data-key` attribute to determine which column to sort by.
- If the clicked column is the same as `currentSortKey`, toggle `currentSortDirection` between 'asc' and 'desc'.
- If it's a different column, set `currentSortKey` to the new column and reset `currentSortDirection` to 'asc'.
- Sort the `users` array based on `currentSortKey` and `currentSortDirection`.
    - For numeric fields, sort numerically.
    - For string fields, use `localeCompare` for proper alphabetical sorting.
- After sorting, call `renderTable(users)` to update the displayed table.

### 13. Bonus: Visual Feedback
- Add an arrow (▲▼) to the sorted column header to show the current sort direction.
    - Use Unicode characters: ▲ (`\u25B2`) for ascending and ▼ (`\u25BC`) for descending.
    - Update the header text when rendering the table headers based on the current sort direction. I.e. use the attribute `data-label` to get the original label text.
    - Example: If sorting by "Name" in ascending order, the header should display "Name ▲".

## Adding search

### 14. Create a search form
- In `index.html`, create a form with an input field and a button (should say search) above the table. 
- Inside the form add another button (should say reset) to reset the search and show all users again.

### 15. Implement search functionality
- Add a submit event listener to the search form.
- Prevent the default form submission with `event.preventDefault()`.
- Get the search term from the input field.
- Filter the `users` array to include only users whose name, email, or username contains the search term (case-insensitive).
- Call `renderTable(filteredUsers)` to display the filtered results.
- When the reset button is clicked, clear the input field and call `renderTable(users)` to show all users again.

## Separation of concerns

### 16. Refactor the code
- Add module support to your `app.js` file by adding `type="module"` to the script tag in `index.html`.
- Create a new file `api.js` in the `frontend` directory.
- Move all API-related functions (fetching, creating, updating, deleting users) from `app.js` to `api.js`.
- Export these functions from `api.js` and import them into `app.js`.
- Ensure that the application still works as expected after the refactor.
- Try to reduce the repetitiveness in your code as much as possible.
- Use `app.js` as an entry point to initialize the application and handle UI interactions.
- Split the code into more files if necessary to improve organization and maintainability.
