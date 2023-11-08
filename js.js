const timerDisplay = document.querySelector('.timer')

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

const Direction = {
    up: [0, -1],
    right: [1, 0],
    down: [0, 1],
    left: [-1, 0]
}

class Player {
    constructor(x, y) {
        this.html = document.getElementById('player')
        this.position = [x, y]
    }
    updatePosition(direction, step) {
        console.log(direction)
        this.position[0] += direction[0]
        this.position[1] += direction[1]
        this.html.style.transform = `translate(${this.position[0] * step}rem, ${this.position[1] * step}rem)`
    }
}

let player = new Player(0, 0)

document.addEventListener('keydown', (event) => {
    let step = 10;

    switch (event.key) {
        case 'w': case 'W':
            player.updatePosition(Direction.up, step)
            break
        case 'a': case 'A':
            player.updatePosition(Direction.left, step)
            break
        case 's': case 'S':
            player.updatePosition(Direction.down, step)
            break
        case 'd': case 'D':
            player.updatePosition(Direction.right, step)
            break
    }
    console.log(event.key)
})