const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest, ensureAdmin, verifyToken} = require('../middleware/auth')
const {getLandingPage, getDashboard, getStats, getUserStatus} = require('../controllers/index')
const passport = require('passport')



// router.get('/',ensureGuest,getLandingPage)

// router.get('/dashboard',ensureAuth,getDashboard)

// router.get('/getstats',ensureAdmin, getStats)


router.get('/dashboard',verifyToken,getDashboard)
router.get('/',ensureGuest,getLandingPage)
router.get('/getstats',verifyToken,ensureAdmin, getStats)


router.post('/test',(req,res)=>{
	console.log("---");
	console.log(req.body);
})



  
module.exports = router
