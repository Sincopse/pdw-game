let rotate = document.querySelector('.rotate-character')
let isPlayerFacingLeft = false

rotate.addEventListener('click', () => {
    isPlayerFacingLeft = !isPlayerFacingLeft
    document.getElementById('player').style.transform = `translate(-50%,-50%)
    scale(${isPlayerFacingLeft ? '-1' : '1'}, 1)`
})

document.addEventListener('click', (event) => {
    updatePlayerColor(event.target.id)
})

document.onsubmit = (event) => {
    localStorage.setItem('color', currentColor)
    event.preventDefault();
    window.location.href = 'index.html'
}