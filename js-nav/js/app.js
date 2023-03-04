let navbutton = document.getElementById("nav-button");  
  let dropDown = document.getElementById("dropdown");
  let Arrow = document.getElementById("arrow");


function toggleClass() {
  dropdown.classList.toggle("reveal");
  arrow.classList.toggle("arrow-flip");
}
  
navbutton.onclick = toggleClass;
  
