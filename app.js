const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
//Local requires
const connectDB = require('./config/db')


//Configuration
dotenv.config({ path: './config/config.env' })
//Confugration Varaibles
const PORT = process.env.PORT
const MODE = process.env.NENV


//Connect to database
connectDB()

//Application
const app = express()


//Logging
if(MODE === 'development'){
    app.use(morgan('dev'))
}



app.listen(
    PORT,
    console.log(`APP Started ${MODE} mode on port ${PORT}`) 
    )