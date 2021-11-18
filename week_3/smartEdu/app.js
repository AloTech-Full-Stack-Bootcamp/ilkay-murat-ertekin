const express = require("express")
const dotenv = require('dotenv')
// Some server configure file
const server = require('./server')
// Routes
const courseRoute = require("./routes/courseRoute")
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')


app = express()
dotenv.config() // config for env file
server.config() // config for server

//Routing
app.use('/courses', courseRoute)
app.use('/auth', authRoute)
app.use('/users', userRoute)


app.listen(process.env.PORT, () => {
    console.log("server started")
})