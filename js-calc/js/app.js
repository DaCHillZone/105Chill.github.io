//  console.log("hi");

let answer = document.getElementById("answer");

function twentyTwoPlusTwo() {
    answer.innerHTML = 22 + 2;
}

function eightySevenTimesEight() {
    answer.innerHTML = 87 * 8;
}

function twentyFiveDivideByOnehundred() {
    answer.innerHTML = 25 / 100;
}



function multiplyTwoNumbers() {
    let firstNumber = document.getElementById("FirstNumber");
    let secondNumber = document.getElementById("SecondNumber");
    let solve = firstNumber.value * secondNumber.value;
    answer.innerHTML = solve;
}