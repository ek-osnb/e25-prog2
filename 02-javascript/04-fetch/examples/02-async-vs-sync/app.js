// TODO: Create slow tasks -> show tasks
// TODO: Create async tasks

document.querySelector("button").addEventListener("click", (e) => {
    e.target.style.backgroundColor = "red";
});



// function wait(ms) {
//     const start = Date.now();
//     while ((Date.now() - start) < ms) {

//     }
//     console.log("wait finished!")
// }


// wait(10_000);


setTimeout(() => {
    console.log("FINISHED ASYNC WORK");
}, 5_000);