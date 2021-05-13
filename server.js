const app = require('./app')
const dotenv = require('dotenv')
const {connectDB, connectProductionDB} = require('./config/db')


const PORT = process.env.PORT
const MODE = process.env.NENV

if(MODE == 'development'){
  connectDB();
}
else{
  connectProductionDB();
}

app.listen(
    PORT,
    console.log(`APP Started ${MODE} mode on port ${PORT}`) 
  )