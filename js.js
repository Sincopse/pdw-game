const timerDisplay = document.querySelector('.timer')
const restartBtn = document.querySelector('.reset-timer')
const pauseWindow = document.querySelector('.pause-window')
const body = document.querySelector('body')
let isGameRunning = true
let isPlayerMoving = false
let isPlayerFacingLeft = false
let timer
let seconds

function togglePauseGame() {
    isGameRunning = !isGameRunning
    if (isGameRunning) {
        startTimer(seconds)
        pauseWindow.style.display = 'none'
        body.style.animationPlayState = 'running'
    } else {
        clearInterval(timer)
        pauseWindow.style.display = 'flex'
        body.style.animationPlayState = 'paused'
    }
}

function startTimer(startingSeconds) {
    seconds = startingSeconds
    timerDisplay.textContent = seconds
    timer = setInterval(function () {
        seconds--
        timerDisplay.textContent = seconds
        if (seconds == 0) {
            clearInterval(timer)
            timerDisplay.textContent = "Time's up!"
        }
    }, 1000)
}

restartBtn.addEventListener('click', () => {
    clearInterval(timer)
    startTimer(10)
    player.resetPlayer()
})

//? --- Player ---

const Direction = {
    up: [0, -1],
    right: [1, 0],
    down: [0, 1],
    left: [-1, 0],
}

let playerStep = 10

class Player {
    constructor() {
        this.html = document.getElementById('player')
        this.x = 0
        this.y = 0
    }
    goTo(direction) {
        if (!this.checkPosition(direction) || !isGameRunning || isPlayerMoving)
            return

        isPlayerMoving = true
        /* animation: walk .6s linear infinite; */
        this.x += direction[0]
        this.y += direction[1]
        if (direction == Direction.left) isPlayerFacingLeft = true
        else if (direction == Direction.right) isPlayerFacingLeft = false
        this.updatePosition(direction)
        setTimeout(() => {
            isPlayerMoving = false
        }, 100)
    }
    updatePosition() {
        this.html.style.transform = `translate(${this.x * playerStep}rem,
            ${this.y * playerStep}rem) scale(${isPlayerFacingLeft ? '-1' : '1'}, 1)`
    }
    resetPlayer() {
        isPlayerMoving = false
        isPlayerFacingLeft = false
        this.x = 0
        this.y = 0
        this.updatePosition()
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

let player = new Player()

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w': case 'W': case 'ArrowUp':
            player.goTo(Direction.up)
            break
        case 'a': case 'A': case 'ArrowLeft':
            player.goTo(Direction.left)
            break
        case 's': case 'S': case 'ArrowDown':
            player.goTo(Direction.down)
            break
        case 'd': case 'D': case 'ArrowRight':
            player.goTo(Direction.right)
            break
        case 'Escape':
            togglePauseGame()
            break
    }
})

startTimer(10)