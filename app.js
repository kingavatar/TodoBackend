const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const cors = require("cors")
const path = require("path")
const swaggerUi = require("swagger-ui-express")
const escFormat = require("@elastic/ecs-morgan-format")


//Local requires
const {connectDB,connectProductionDB} = require('./config/db')
const swaggerFile = require('./swagger_output.json')
const ecsFormat = require('@elastic/ecs-morgan-format')
// const { swaggerUi } = require('./swagger')
// const { swaggerUi,specs } = require('./swagger')



//Configuration
dotenv.config({ path: './config/config.env' })

// Passport
require('./config/passport')(passport)

//Confugration Varaibles
const PORT = process.env.PORT
const MODE = process.env.NENV


//Connect to database
if(MODE === 'development'){
  connectDB()
}
else{
  connectProductionDB()
}

//Application
const app = express()

//Logging
if(MODE === 'development'){
    app.use(morgan('dev'))
}
else{
  app.use(morgan(ecsFormat()))
}


//Static UI 

//CORS Support
var corsOptions = {
    origin: "http://localhost:3000"
};
  
app.use(cors(corsOptions));




//Parsing and rest api handling
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Middleware function to set the user details inside the req body
app.use(function (req,res,next){
    res.locals.user = req.user || null
    next()
})

//Swagger docs
// app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(specs))
app.use('/doc',swaggerUi.serve,swaggerUi.setup(swaggerFile))


// Sessions for remembering data
app.use(
    session({
      secret: 'spurvaj',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )

//Passport initiliazation
app.use(passport.initialize())
app.use(passport.session())


//Routes
app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))
app.use('/note',require('./routes/note'))
app.use('/page',require('./routes/page'))


//running the app
app.listen(
    PORT,
    console.log(`APP Started ${MODE} mode on port ${PORT}`) 
  )