window.addEventListener('DOMContentLoaded', initApp);

// TODO: PRETTIER

const BASE_URL = "https://jsonplaceholder.typicode.com";
const USERS_URL = `${BASE_URL}/users`;
const POSTS_URL = `${BASE_URL}/posts`;

async function initApp() {
    // Code goes here
    console.log(document.querySelector("h1").textContent);
    // getUsersAsync().then(u => displayUsers(u));
    const users = await getUsersAsync();
    displayUsers(users);

    const newPost = await createPost({
        title: 'foo',
        body: 'bar',
        userId: 1,
    });
    console.log(newPost);

    const newUser = await createUser({
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
    });
    console.log(newUser);
}

function displayUsers(users) {
    users.forEach(u => displayUser(u));
}

function displayUser(user) {
    const ul = document.querySelector("#userList");
    const li = document.createElement("li");
    li.textContent = `${user.name} - ${user.email}`;
    ul.appendChild(li);
}

function getUsers() {
    return fetch(USERS_URL).then(resp => {
        if (!resp.ok) {
            console.log("Status code: " + resp.status)
        }
        return resp.json();
    })
    // .then(users => displayUsers(users));
}

async function getUsersAsync() {
    const resp = await fetch(USERS_URL);
    if (!resp.ok) {
        console.log("Status code: " + resp.status)
    }
    return await resp.json();
    // .then(users => displayUsers(users));
}


async function createPost(post) {
    const resp = await fetch(POSTS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })

    if (!resp.ok) {
        console.log("ERROR: " + resp.status)
        console.log("ERROR: " + resp.statusText)
    }

    return await resp.json();
}

async function createUser(user) {
    const resp = await fetch(USERS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })

    if (!resp.ok) {
        console.log("ERROR: " + resp.status)
        console.log("ERROR: " + resp.statusText)
    }

    return await resp.json();
}


