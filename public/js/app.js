/* socket.io frontend to backend connection */
const socket = io.connect("http://localhost:3000")

/* HTML class variables */
const baseSlider = document.getElementsByClassName('base-slider')[0]
const shoulderSlider = document.getElementsByClassName('shoulder-slider')[0]
const elbowSlider = document.getElementsByClassName('elbow-slider')[0]
const wristSlider= document.getElementsByClassName('wrist-slider')[0]
const clawSlider = document.getElementsByClassName('claw-slider')[0]
