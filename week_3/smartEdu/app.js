const express = require("express")
const dotenv = require('dotenv')
// Some server configure file
const server = require('./server')
// Routes
const courseRoute = require("./routes/courseRoute")
const userRoute = require('./routes/authRoute')
const adminRoute = require('./routes/adminRoute')

app = express()
dotenv.config() // config for env file
server.config() // config for server

//Routing
app.use('/courses', courseRoute)
app.use('/auth', userRoute)
app.use('/admin', adminRoute)


app.listen(process.env.PORT, () => {
    console.log("server started")
})