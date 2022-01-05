const express = require("express")
const socket = require("socket.io")
const five = require("johnny-five")
const myRoutes = require("./routes.js")
const app = express()

app.use(express.static('public'))

app.get('/' , myRoutes)

const server = app.listen(3000 , (error) => {
    if (!error) {
	console.log("Server currently running @ http://localhost:3000; press ctrl+c to cancel")
    }
})

const io = socket(server)

/* connecting to our board via johnny-five */
const board = new five.Board()

/* connecting from the backend to the js frontend file */
io.on('connection' , (socket) => {
    console.log('we\'ve made a socket connection')

    socket.on("baseSlider" , (data) => {
	console.log(data)

	/*board.on("ready" , () => {
	    let base = new five.Servo({
		pin: 11,
		range: [0 , 150],
		startAt: data.baseAngle
	    })
	})*/
    })

    board.on("ready" , function (data)  {
	console.log("arduino board connected")

	let base = new five.Servo({
	    pin: 9,
	    range: [0 , 150],
	    startAt: 60
	})

	socket.on('baseSlider' , (data) => {
	    base.to(data.baseAngle)
	})
    })
})
