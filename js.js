let timerDisplay = document.querySelector('.timer')

const startTimer = 10

let count = startTimer
timerDisplay.textContent = count
const timer = setInterval(function () {
    count--
    timerDisplay.textContent = count
    if (count === 0) {
        clearInterval(timer)
        timerDisplay.textContent = "Time's up!"
    }
}, 1000)

let resetTimer = document.querySelector('.reset-timer')

resetTimer.addEventListener('click', () => {
    count = startTimer
    timerDisplay.textContent = count
})