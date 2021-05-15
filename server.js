const app = require('./app')
const dotenv = require('dotenv')
const {connectDB, connectProductionDB} = require('./config/db')


const PORT = process.env.PORT
const MODE = process.env.NENV
const APP_URL = process.env.APP_URL
if(MODE == 'development'){
  connectDB();
}
else{
  connectProductionDB();
}

app.listen(
    PORT,
    APP_URL,
    console.log(`APP Started ${MODE} mode on port ${PORT}`) 
  )