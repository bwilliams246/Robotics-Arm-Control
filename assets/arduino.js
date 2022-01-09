const five = require("johnny-five")
const board = new five.Board()

/* Global Starting Point for the servos */
let baseStart = 60
let shoulderStart = 90
let elbowStart = 65
let wristStart = 90
let clawStart = 0

board.on("ready" , () => {
    console.log("robotic arm connected")

    /* Grabbing the socket param from the io connection callback function */
    const socket = require("./server.js")

    /* Grabbing the Gpio module */
    const GPIO = require("onoff").Gpio

   /* Setting up our servos */
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

    /* Seting up our lights */
    const redLight = new GPIO(4 , 'out')
    const blueLight = new GPIO(3 , 'out')
    const greenLight = new GPIO(17 , 'out')

    /* Storing the current starting points of the servos in a variable */
    /*let baseStart = base.startAt
    let shoulderStart = shoulder.startAt
    let elbowStart = elbow.startAt
    let wristStart = wrist.startAt
    let clawStart = claw.startAt*/

    let isBaseMoving = false
    let isShoulderMoving = false
    let isElbowMoving = false
    let isWristMoving = false
    let isClawMoving = false

    socket.on('baseSlider' , (data) => {
	base.to(data.baseAngle)
	currentSlider('base')
	altLight(data.baseAngle , blueLight , greenLight)
	redLightSwitch(data , redLight)
    })

    socket.on('shoulderSlider' , (data) => {
	shoulder.to(data.shoulderAngle)
	currentSlider('shoulder')
	altLight(data.shoulderAngle , blueLight , greenLight)
	redLightSwitch(data , redLight)
    })

    socket.on('elbowSlider' , (data) => {
	elbow.to(data.elbowAngle)
	currentSlider('elbow')
	altLight(data.elbowAngle , blueLight , greenLight)
	redLightSwitch(data , redLight)
    })

    socket.on('wristSlider' , (data) => {
	wrist.to(data.wristAngle)
	currentSlider('wrist')
	altLight(data.wristAngle , blueLight , greenLight)
	redLightSwitch(data , redLight)
    })

    socket.on('clawSlider' , (data) => {
	claw.to(data.clawAngle)
	currentSlider('claw')
	altLight(data.clawAngle , blueLight , greenLight)
	redLightSwitch(data , redLight)
    })
})

function currentSlider(str) {
    if (str === 'base') {
	isBaseMoving = true
	isShoulderMoving = false
	isElbowMoving = false
	isWristoving = false
	isClawMoving = false
    }
    else if (str === 'shoulder') {
	isBaseMoving = false
	isShoulderMoving = true
	isElbowMoving = false
	isWristMoving = false
	isClawMoving = false
    }
    else if (str === 'elbow') {
	isBaseMoving = false
	isShoulderMoving = false
	isElbowMoving = true
	isWristMoving = false
	isClawMoving = true
    }
    else if (str === 'wrist') {
	iBaseMoving = false
	isShoulderMoving = false
	isElbowMoving = false
	isWristMoving = true
	isClawMoving = false
    }
    else if (str === 'claw') {
	isBaseMoving = false
	isShoulderMoving = false
	isElbowMoving = false
	isWristMoving = false
	isClawMoving = true
    }
}

/* LED Functions */
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

function altLight(newInputValue , blueLight , greenLight) {
    if (isBaseMoving) {
	if (baseStart < newInputValue) {
	    console.log("increasing")
	    greenLight.writeSync(1)
	    blueLight.writeSync(0)
	}

	else if (baseStart > newInputValue) {
	    console.log("decreasing")
	    blueLight.writeSync(1)
	    greenLight.writeSync(0)
	}

	baseStart = newInputValue
    }

    else if (isShoulderMoving) {
	if (shoulderStart < newInputValue) {
	    greenLight.writeSync(1)
	    blueLight.writeSync(0)
	}
	else {
	    greenLight.writeSync(0)
	    blueLight.writeSync(1)
	}
	shoulderStart = newInputValue
    }

    else if (isElbowMoving) {
	if (elbowStart < newInputValue) {
	    greenLight.writeSync(1)
	    blueLight.writeSync(0)
	}
	else {
	    greenLight.writeSync(0)
	    blueLight.writeSync(1)
	}
	elbowStart = newInputValue
    }

    else if (isWristMoving) {
	if (wristStart < newInputValue) {
	    greenLight.writeSync(1)
	    blueLight.writeSync(0)
	}
	else {
	    greenLight.writeSync(0)
	    blueLight.writeSync(1)
	}
	wristStart = newInputValue
    }

    else if (isClawMoving) {
	if (clawStart < newInputValue) {
	    greenLight.writeSync(1)
	    blueLight.writeSync(0)
	}
	else {
	    greenLight.writeSync(0)
	    blueLight.writeSync(1)
	}
	clawStart = newInputValue
    }
}

module.exports = board
