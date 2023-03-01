let deadline = new Date("May 4, 2022 13:00:00");

let countdown = document.getElementById("countdown");
countdown.innerHTML = "";

function setCountdown () {
    let now = new Date();

    let timeLeft = deadline.getTime() - now.getTime();

    let daysLeft = convertToDaysLeft(timeLeft);
    let hoursLeft = convertToHoursLeft(timeLeft);
    let minutesLeft = convertToMinutesLeft(timeLeft);
    let secondsLeft = convertToSecondsLeft(timeLeft);

    countdown.innerHTML =
        formatCountdownText(daysLeft, hoursLeft, minutesLeft, secondsLeft);
}

setInterval(setCountdown, 1000);