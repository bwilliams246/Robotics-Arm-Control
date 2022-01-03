const express = require("express")
const socket = require("socket.io")
const myRoutes = require("./routes.js")
const app = express()

app.use(express.static('public'))

app.get('/' , myRoutes)

app.listen(3000 , (error) => {
    if (!error) {
	console.log("Server currently running @ http://localhost:3000; press ctrl+c to cancel")
    }
})
