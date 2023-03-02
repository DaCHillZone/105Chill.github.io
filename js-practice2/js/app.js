 function displayDate() {
    let demo = document.getElementById("demo");

    demo.innerHTML = Date();
 }

let btn = document.getElementById("btn");

btn.addEventListener("click", displayDate);