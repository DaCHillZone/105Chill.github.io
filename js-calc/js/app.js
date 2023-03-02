//  console.log("hi");

let answer = document.getElementById("answer");

function twentyPlusThirty() {
    answer.innerHTML = 20 + 30;
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