let root = document.querySelector(':root')

document.addEventListener('click', (event) => {
    switch (event.target.id) {
        case 'color-red':
            root.style.setProperty('--player-primary-color', '#c51112')
            root.style.setProperty('--player-secundary-color', '#7a0839')
            break
        case 'color-blue':
            root.style.setProperty('--player-primary-color', '#132fd1')
            root.style.setProperty('--player-secundary-color', '#09158f')
            break
        case 'color-green':
            root.style.setProperty('--player-primary-color', '#127f2e')
            root.style.setProperty('--player-secundary-color', '#0a4d2e')
            break
        case 'color-orange':
            root.style.setProperty('--player-primary-color', '#ef7d0d')
            root.style.setProperty('--player-secundary-color', '#b33d15')
            break
        case 'color-pink':
            root.style.setProperty('--player-primary-color', '#ec54b9')
            root.style.setProperty('--player-secundary-color', '#aa2bac')
            break
        case 'color-yellow':
            root.style.setProperty('--player-primary-color', '#f7f457')
            root.style.setProperty('--player-secundary-color', '#c28723')
            break
    }
})
