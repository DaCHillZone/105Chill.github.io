// set initial image by saving it in a varable
let starter = document.getElementById("starter"); 

// save rest of img's in array
let heartArray = ["assets/Asset19.png", "assets/Asset20.png", "assets/Asset21.png", "assets/Asset22.png", "assets/Asset23.png", "assets/Asset24.png", "assets/Asset25.png", "assets/Asset26.png", "assets/Asset27.png"];

// set a counter varable
let count = 0;

// declare animation function
function animate() {
    // set starter image
    starter.src = heartArray[count];
    // increment through array
    count++;
    // increase count through full length of array
    if(heartArray.length == count) {
        count = 0;
    }
}

setInterval(animate, 140);