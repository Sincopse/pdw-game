const timerDisplay = document.querySelector('.timer')
const pauseWindow = document.querySelector('.pause-window')
const body = document.querySelector('body')
let isGameRunning = true

const togglePauseGame = () => {
    isGameRunning = !isGameRunning
    if (isGameRunning) {
        pauseWindow.style.display = 'none'
        body.style.animationPlayState = 'running'
    } else {
        pauseWindow.style.display = 'flex'
        body.style.animationPlayState = 'paused'
    }
}

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

//? --- Player ---

const Direction = {
    up: [0, -1],
    right: [1, 0],
    down: [0, 1],
    left: [-1, 0],
}

class Player {
    constructor(x, y) {
        this.html = document.getElementById('player')
        this.x = x
        this.y = y
    }
    setPosition(direction, step) {
        if (!this.checkPosition(direction)) return

        /* animation: walk .6s linear infinite; */
        this.x += direction[0]
        this.y += direction[1]
        this.html.style.transform = `translate(${this.x * step}rem,
                ${this.y * step}rem)`
    }
    checkPosition(direction) {
        return !(
            this.x + direction[0] < 0 ||
            this.x + direction[0] > 2 ||
            this.y + direction[1] < 0 ||
            this.y + direction[1] > 2
        )
    }
}

let player = new Player(0, 0)

document.addEventListener('keydown', (event) => {
    let step = 10

    switch (event.key) {
        case 'w':
        case 'W':
        case 'ArrowUp':
            player.setPosition(Direction.up, step)
            break
        case 'a':
        case 'A':
        case 'ArrowLeft':
            player.setPosition(Direction.left, step)
            break
        case 's':
        case 'S':
        case 'ArrowDown':
            player.setPosition(Direction.down, step)
            break
        case 'd':
        case 'D':
        case 'ArrowRight':
            player.setPosition(Direction.right, step)
            break
        case 'Escape':
            togglePauseGame()
            break
    }
})
