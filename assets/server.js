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

/* connecting from the backend to the js frontend file */
io.on('connection' , (socket) => {
    console.log('we\'ve made a socket connection')

    module.exports = socket

    /* calling  my Arduino Arm module after we're connected to the frontend */
    const myRobot = require("./arduino.js")
})

module.exports = io
