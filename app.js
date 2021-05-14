const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const cors = require("cors")
const path = require("path")
const ecsFormat = require("@elastic/ecs-morgan-format")
const cookieParser = require("cookie-parser")
var fs = require("fs")


//Configuration
dotenv.config({ path: './config/config.env' })

// Passport
require('./config/passport')(passport)

//Confugration Varaibles
const MODE = process.env.NENV
const publicRoot = "./dist";

//Application
const app = express()

//Logging
var logFile = fs.createWriteStream(__dirname+"/logs/app.log",{flags: 'a'})

if(MODE === 'development'){
    app.use(morgan('dev'))
}
else{
  app.use(morgan(ecsFormat(),{stream: logFile}))
}

//Parsing and rest api handling
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(express.static(publicRoot));

//CORS Support
var corsOptions = {
  origin: "http://localhost:3000",
};  
app.use(cors(corsOptions));


//Middleware function to set the user details inside the req body
app.use(function (req,res,next){
    res.locals.user = req.user || null
    next()
})


// Sessions for remembering data
// app.use(
//     session({
//       secret: 'spurvaj',
//       resave: false,
//       saveUninitialized: false,
//       store: new MongoStore({ mongooseConnection: mongoose.connection }),
//     })
//   )



//Passport initiliazation
app.use(passport.initialize())


app.use('/api',require('./routes/index'))
app.use('/api/auth',require('./routes/auth'))
app.use('/api/note',require('./routes/note'))
app.use('/api/page',require('./routes/page'))
app.use('/ext/api/',require('./routes/extension'))
app.get("/*", (req, res) => {
   res.sendFile(path.resolve(__dirname,"dist", "index.html"));
 })


module.exports = app;

