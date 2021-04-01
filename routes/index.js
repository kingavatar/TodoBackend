const express = require('express')
const router = express.Router()

const {ensureAuth, ensureGuest} = require('../middleware/auth')
const User = require('../models/User')

router.get('/',ensureGuest,(req,res)=>{
    var html = "<ul>\
            <li><a href='/auth/google'>Google</a></li>\
    </ul>"
    res.send(html)
})


router.get('/dashboard',ensureAuth, async (req,res)=>{
    try {
        const myuser = await User.findOne({_id : req.user.id}).lean()
        var html = "<h1> Hi "+myuser.firstName+"</h1><a href='/auth/logout'>logout</a>"   
        res.send(html)
    } catch (err) {
        console.log(err)
    }

})


module.exports = router