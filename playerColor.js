const Colors = {
    red:    ['#c51112', '#7a0839'],
    blue:   ['#132fd1', '#09158f'],
    green:  ['#127f2e', '#0a4d2e'],
    orange: ['#ef7d0d', '#b33d15'],
    pink:   ['#ec54b9', '#aa2bac'],
    yellow: ['#f7f457', '#c28723']
}

let root = document.querySelector(':root')
let currentColor = localStorage.getItem('color')

const updatePlayerColor = (color) => {
    if (color in Colors) {
        currentColor = color
        root.style.setProperty('--player-primary-color', Colors[color][0])
        root.style.setProperty('--player-secundary-color', Colors[color][1])
    }
}

if (currentColor != null) {
    updatePlayerColor(currentColor)
}