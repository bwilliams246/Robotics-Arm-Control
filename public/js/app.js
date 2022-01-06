/* socket.io frontend to backend connection */
const socket = io.connect("http://localhost:3000")

/* HTML class variables */
const baseSlider = document.getElementsByClassName('base-slider')[0]
const shoulderSlider = document.getElementsByClassName('shoulder-slider')[0]
const elbowSlider = document.getElementsByClassName('elbow-slider')[0]
const wristSlider= document.getElementsByClassName('wrist-slider')[0]
const clawSlider = document.getElementsByClassName('claw-slider')[0]

/* Input Event Listeners */
baseSlider.addEventListener('input' , (e) => {
    let angle = e.target.value
    console.log(angle)
    socket.emit('baseSlider' , {baseAngle: angle})
})

shoulderSlider.addEventListener('input' , (e) => {
    let angle = e.target.value
    socket.emit('shoulderSlider' , {shoulderAngle: angle})
})

elbowSlider.addEventListener('input' , (e) => {
    let angle = e.target.value
    socket.emit('elbowSlider' , {elbowAngle: angle})
})

wristSlider.addEventListener('input' , (e) => {
    let angle = e.target.value
    socket.emit('wristSlider' , {wristAngle: angle})
})

clawSlider.addEventListener('input' , (e) => {
    let angle = e.target.value
    socket.emit('clawSlider' , {clawAngle: angle})
})
