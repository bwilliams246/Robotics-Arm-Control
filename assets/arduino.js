const five = require("johnny-five")
const board = new five.Board()

board.on("ready" , () => {
    console.log("robotic arm connected")

    /* Grabbing the socket param from the io connection callback function */
    const socket = require("./server.js")

    const GPIO = require("onoff").Gpio

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

    const redLight = new GPIO(4 , 'out')

    socket.on('baseSlider' , (data) => {
	base.to(data.baseAngle)
	redLightSwitch(data , redLight)
    })

    socket.on('shoulderSlider' , (data) => {
	shoulder.to(data.shoulderAngle)
	redLightSwitch(data , redLight)
    })

    socket.on('elbowSlider' , (data) => {
	elbow.to(data.elbowAngle)
	redLightSwitch(data , redLight)
    })

    socket.on('wristSlider' , (data) => {
	wrist.to(data.wristAngle)
	redLightSwitch(data , redLight)
    })

    socket.on('clawSlider' , (data) => {
	claw.to(data.clawAngle)
	redLightSwitch(data , redLight)
    })
})

function redLightSwitch (data , light) {
    if (data.baseAngle) {
	if (data.baseAngle >= 150 || data.baseAngle <= 0) {
	    light.writeSync(1)
	}
	else {
	    light.writeSync(0)
	}
    }

    else if (data.shoulderAngle) {
	if (data.shoulderAngle >= 130 || data.shoulderAngle <= 90) {
	    light.writeSync(1)
	}
	else {
	    light.writeSync(0)
	}
    }

    else if (data.elbowAngle) {
	if (data.elbowAngle >= 90 || data.elbowAngle <= 25) {
	    light.writeSync(1)
	}
	else {
	    light.writeSync(0)
	}
    }

    else if (data.wristAngle) {
	if (data.wristAngle >= 180 || data.wristAngle <= 0) {
	    light.writeSync(1)
	}
	else {
	    light.writeSync(0)
	}
    }

    else if (data.clawAngle) {
	if (data.clawAngle >= 60 || data.clawAngle <= 0) {
	    light.writeSync(1)
	}
	else {
	    light.writeSync(0)
	}
    }
}

module.exports = board
