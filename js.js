const timerDisplay = document.querySelector('.timer')
const restartBtn = document.querySelector('.reset-timer')
const pauseWindow = document.querySelector('.pause-window')
const pointsWindow = document.querySelector('.points')
const body = document.querySelector('body')
let killSound = new Audio('assets/sounds/kill.wav')
let emergencySound = new Audio('assets/sounds/emergency.wav')
let isGameRunning = true
let hasGameEnded = false
let isPlayerMoving = false
let timer
let seconds
let points = 0

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

const togglePauseGame = () => {
    if (hasGameEnded) return

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

const endGame = () => {
    clearInterval(timer)
    timerDisplay.textContent = "Time's up!"
    timerDisplay.style.color = 'red'
    isGameRunning = false
    hasGameEnded = true
    emergencySound.play()
}

const startTimer = (startingSeconds) => {
    seconds = startingSeconds
    timerDisplay.textContent = seconds
    timerDisplay.style.color = 'white'
    timer = setInterval(function () {
        seconds--
        timerDisplay.textContent = seconds
        timerDisplay.style.color = (seconds % 2 == 0) ? 'white' : 'red'
        if (seconds <= 0) endGame()
    }, 1000)
}

const AddPoints = (quantity) => {
    points += quantity
    pointsWindow.textContent = 'Points: ' + points
}

restartBtn.addEventListener('click', () => {
    clearInterval(timer)
    startTimer(20)
    player.reset()
    enemies.forEach((enemy) => {
        enemy.spawn(enemies)
    });
    points = 0
    pointsWindow.textContent = 'Points: 0'
    isGameRunning = true
    hasGameEnded = false
})

//? --- Player ---

const Direction = {
    up: [0, -1],
    right: [1, 0],
    down: [0, 1],
    left: [-1, 0],
}

let movementStep = 10

class Crewmate {
    constructor(objectId) {
        this.html = document.getElementById(objectId)
        this.x = 0
        this.y = 0
        this.isFacingLeft = false
    }
    updatePosition() {
        this.html.style.transform = `translate(calc(${this.x * movementStep}rem - 50%),
            calc(${this.y * movementStep}rem - 50%)) scale(${
            this.isFacingLeft ? '-1' : '1'
        }, 1)`
    }
    reset() {
        this.isFacingLeft = false
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

class Player extends Crewmate {
    goTo(direction) {
        if (!this.checkPosition(direction) || !isGameRunning || isPlayerMoving)
            return

        // Prevent player from spamming inputs
        isPlayerMoving = true
        setTimeout(() => {
            isPlayerMoving = false
        }, 100)

        this.x += direction[0]
        this.y += direction[1]
        if (direction == Direction.left) this.isFacingLeft = true
        else if (direction == Direction.right) this.isFacingLeft = false
        this.updatePosition(direction)
        this.checkColision()
    }
    kill(crewmate) {
        killSound.cloneNode(true).play()
        AddPoints(10)
        crewmate.spawn()
    }
    reset() {
        isPlayerMoving = false
        this.x = 0
        this.y = 0
        super.reset()
    }
    checkPosition(direction) {
        return !(
            this.x + direction[0] < 0 ||
            this.x + direction[0] > 2 ||
            this.y + direction[1] < 0 ||
            this.y + direction[1] > 2
        )
    }
    checkColision() {
        enemies.forEach((enemy) => {
            if (enemy.x == this.x && enemy.y == this.y)
                this.kill(enemy)
        })
    }
}

class Enemy extends Crewmate {
    spawn() {
        let positionOccupied
        do {
            positionOccupied = false
            this.x = getRandomInt(3)
            this.y = getRandomInt(3)
            if (player.x == this.x && player.y == this.y) {
                positionOccupied = true
            }
            enemies.forEach((enemy) => {
                if(enemy != this)
                    if (enemy.x == this.x && enemy.y == this.y)
                        positionOccupied = true
            })
        } while (positionOccupied)
        this.isFacingLeft = getRandomInt(2) == 1 ? true : false

        this.updatePosition()
    }
    reset() {
        this.x = -1
        this.y = -1
        super.reset()
    }
}

let player = new Player('player')

let enemies = [
    new Enemy('crewmate0')
]

enemies.forEach((enemy) => {
    enemy.spawn()
});

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

startTimer(20)
