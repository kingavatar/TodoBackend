const mongoose = require('mongoose')
const constants = require('../config/constants')


const NoteSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    content:{
        type: String,
        required: true,

    },
    ownerId:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    myLink:{
        type:String,
        required: false,
        default: 'null'
    },
    timer:{
        type: Date, 
        required: true,
        default:  new Date(+new Date() + constants.ONEDAY)
    },
    pageId:{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Page'
    }
    
    },
    { timestamps: true }
    
)


module.exports = mongoose.model('Note',NoteSchema)