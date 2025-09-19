// Scenario: Sequential asynchronous operations using nested callbacks
setTimeout(() => {
    console.log("Step 1 complete");
    setTimeout(() => {
        console.log("Step 2 complete");
        setTimeout(() => {
            console.log("Step 3 complete");
            setTimeout(() => {
                console.log("All steps complete");
            }, 1000);
        }, 1000);
    }, 1000);
}, 1000);

// Pretifying the code:

// console.log("End");

// Concrete example: User authentication flow
function loginUser(username, password, callback) {
    setTimeout(() => {
        console.log("User logged in");
        callback({ username: username });
    }, 1000);
}

function getUserProfile(user, callback) {
    setTimeout(() => {
        console.log("Fetched user profile");
        callback({ ...user, age: 30, city: "New York" });
    }, 1000);
}

function getUserPosts(user, callback) {
    setTimeout(() => {
        console.log("Fetched user posts");
        callback(["Post 1", "Post 2", "Post 3"]);
    }, 1000);
}

// Using the functions with nested callbacks
loginUser("alice", "password123", (user) => {
    getUserProfile(user, (profile) => {
        getUserPosts(profile, (posts) => {
            console.log("User:", profile);
            console.log("Posts:", posts);
        });
    });
});