const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
        pageName:{
            type: String,
            require: true,
            default: 'Untitled'
        },
        pageLink:{
            type: String,
            reqiure: false,
        },
        ownerId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        notesIn:{
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Note',
            required: false
        }        

    },
    { timestamps: true }    
);



module.exports = mongoose.model('Page',PageSchema)