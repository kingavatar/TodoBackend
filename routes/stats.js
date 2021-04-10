const express = require('express')
const constants = require('../config/constants')
const router = express.Router()
const {ensureAuth} = require('../middleware/auth')
const User = require('../models/User')
const Note = require('../models/Note')


router.get('/getstats',ensureAuth,async (req,res)=>{
    if(req.user.firstName != "admin" || req.user.email!=constants.ADMIN_EMAIL){
        //RETURN ERROR IN PAGE AS ONLY ADMIN HAS PERMISSION
        // res.render('')
    }
    else{
        // User.estimatedDocumentCount({},function(err,result){
        //     if(err){
        //         //RENDER ERROR
        //     }
        //     else{
        //         //Send stats
        //         var users = result-1;
        //     }
        // })
        var users = await User.estimatedDocumentCount();
        var notes = await Note.estimatedDocumentCount();
        // res.send(users)
        console.log(users)
        console.log(notes)
        //RETURN VALUES users, notes
    }
})

module.exports = router