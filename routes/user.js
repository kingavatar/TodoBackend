const express = require('express')
const router = express.Router()

const {ensureAuth, ensureGuest} = require('../middleware/auth')
const User = require('../models/User')

router.get('/authstatus',ensureAuth,async (req,res)=>{
    try {
        return req.isAuthenticated()
        // return req.user
    } catch (err) {
        console.log(err)
    }

})




module.exports = router