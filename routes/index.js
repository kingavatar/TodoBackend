const express = require('express')
const router = express.Router()

const {ensureAuth, ensureGuest} = require('../middleware/auth')
const User = require('../models/User')

router.get('/',ensureGuest,(req,res)=>{
    res.sendFile("land.html",{root: './views'})
})


router.get('/dashboard',ensureAuth, async (req,res)=>{
    try {
        
        const myuser = await User.findOne({_id : req.user.id}).lean()
        var html = "<h1> Hi "+myuser.firstName+"</h1><a href='/auth/logout'>logout</a><a href='views/'>"   
        res.send(html)
    } catch (err) {
        console.log(err)
    }

})


module.exports = router