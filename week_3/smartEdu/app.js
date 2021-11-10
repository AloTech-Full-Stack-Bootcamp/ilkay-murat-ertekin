const express = require("express")
const mongoose = require("mongoose")
const session = require('express-session');
const MongoStore = require('connect-mongo');

const courseRoute = require("./routes/courseRoute")
const userRoute=require('./routes/userRoute')

app = express()

mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.9dcvf.mongodb.net/smartEdu?retryWrites=true&w=majority",{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
).then(()=>{
    console.log('DB CONNECTED!')
}).catch((err)=>{
    console.log(err)
})


// Middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: "mongodb+srv://admin:admin@cluster0.9dcvf.mongodb.net/smartEdu?retryWrites=true&w=majority" })
  }))

global.userIn = null;

app.use('*', (req, res, next)=> {
    userIn = req.session.userId; 
    console.log(userIn)
    next();
  });

//Routing

app.use('/courses', courseRoute)
app.use('/auth', userRoute)


app.listen(3000, () => {
    console.log("server started")
})