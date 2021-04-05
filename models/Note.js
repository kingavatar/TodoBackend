const mongoose = require('mongoose')

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
    viewers:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    myLink:{
        type:String,
        required: false,
        default: 'null'
    }
    
    },
    { timestamps: true }
    
)


module.exports = mongoose.model('Note',NoteSchema)