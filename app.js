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
const cookieParser = require("cookie-parser")

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
const publicRoot = "./dist";

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

//Parsing and rest api handling
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(express.static(publicRoot));


app.use((req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080/*");
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept"
  // );
  next();
});
//Static UI 

//CORS Support
var corsOptions = {
  origin: "http://localhost:3000",
  // credentials: true,
};
  
app.use(cors(corsOptions));





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
// app.use(passport.session())


app.use('/api',require('./routes/index'))
app.use('/api/auth',require('./routes/auth'))
app.use('/api/note',require('./routes/note'))
app.use('/api/page',require('./routes/page'))
app.get("*", (req, res) => {
   res.sendFile(path.resolve(__dirname,"dist", "index.html"));
 });

//running the app
module.exports=app.listen(
    PORT,
    console.log(`APP Started ${MODE} mode on port ${PORT}`)
  )
