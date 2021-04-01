const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    googleId: {
        type: String,
        required: false,
        default: "null"
    },
    image: {
        type: String
    }


    },
    { timestamps: true }
    
)

module.exports = mongoose.model('User',UserSchema)