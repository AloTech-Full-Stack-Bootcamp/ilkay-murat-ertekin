const express = require("express")
const mongoose = require("mongoose")
const dotenv = require('dotenv')
const session = require('express-session');
const MongoStore = require('connect-mongo');

const courseRoute = require("./routes/courseRoute")
const userRoute = require('./routes/authRoute')

app = express()
dotenv.config()


mongoose.connect(process.env.mongoUrl
    , {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log('DB CONNECTED!')
}).catch((err) => {
    console.log(err)
})

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.mongoUrl })
}))

//Routing
app.use('/courses', courseRoute)
app.use('/auth', userRoute)


app.listen(process.env.PORT, () => {
    console.log("server started")
})