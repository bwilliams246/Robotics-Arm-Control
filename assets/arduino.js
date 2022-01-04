const five = require("johnny-five")
const board = new five.Board()

board.on('ready' , () => {
    console.log('connected to Arduino Board')
    const base = new five.Servo({
	pin: 9,
	range: [0 , 180],
	startAt: 60
    })

    const claw = new five.Servo({
	pin: 11,
	range: [0 , 90],
	startAt: 0
    })
})

module.exports = board
