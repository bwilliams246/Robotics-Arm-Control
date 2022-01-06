const five = require("johnny-five")
const board = new five.Board()

board.on("ready" , () => {
    console.log("robotic arm connected")
    const socket = require("./server.js")

    let base = new five.Servo({
	pin: 9,
	range: [0 , 150],
	startAt: 60
    })

    let shoulder = new five.Servo({
	pin: 6,
	range: [90 , 130],
	startAt: 90
    })

    let elbow = new five.Servo({
	pin: 5,
	range: [25 , 90],
	startAt: 65
    })

    let wrist = new five.Servo({
	pin: 3,
	range: [0 , 180],
	startAt: 90
    })

    let claw = new five.Servo({
	pin: 11,
	range: [0 , 60],
	startAt: 0
    })

    socket.on('baseSlider' , (data) => {
	base.to(data.baseAngle)
    })

    socket.on('shoulderSlider' , (data) => {
	shoulder.to(data.shoulderAngle)
    })

    socket.on('elbowSlider' , (data) => {
	elbow.to(data.elbowAngle)
    })

    socket.on('wristSlider' , (data) => {
	wrist.to(data.wristAngle)
    })

    socket.on('clawSlider' , (data) => {
	claw.to(data.clawAngle)
    })
})

module.exports = board
