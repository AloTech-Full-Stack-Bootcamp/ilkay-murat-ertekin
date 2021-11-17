const express = require("express")
const dotenv = require('dotenv')
const MongoStore = require('connect-mongo');
const cors = require('cors')

const Config = require('./config')

const courseRoute = require("./routes/courseRoute")
const userRoute = require('./routes/authRoute')
const adminRoute = require('./routes/adminRoute')

app = express()
dotenv.config()
Config()

//Routing
app.use('/courses', courseRoute)
app.use('/auth', userRoute)
app.use('/admin', adminRoute)


app.listen(process.env.PORT, () => {
    console.log("server started")
})