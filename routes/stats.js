const express = require('express')
const constants = require('../config/constants')
const router = express.Router()
const {ensureAuth} = require('../middleware/auth')
const User = require('../models/User')
const Note = require('../models/Note')
const Page = require('../models/Page')


router.get('/getstats',ensureAuth,async (req,res)=>{
    if(req.user.firstName != "admin" || req.user.email!=constants.ADMIN_EMAIL){
        //RETURN ERROR IN PAGE AS ONLY ADMIN HAS PERMISSION
        // res.render('')
    }
    else{
        var users = await User.estimatedDocumentCount();
        var notes = await Note.estimatedDocumentCount();
        var pages = await Page.estimatedDocumentCount();
        var domains = 0 //;
        console.log(users-1)
        console.log(notes)
        //RETURN VALUES users, notes
    }
})



module.exports = router