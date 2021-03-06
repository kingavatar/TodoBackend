const express = require('express')
const router = express.Router()
// Controllers
const {getLandingPage, getDashboard, getStats} = require('../controllers/index')
// Middleware
const { ensureGuest, ensureAdmin, verifyToken} = require('../middleware/auth')



router.get("/dashboard", verifyToken, getLandingPage);
router.get('/',ensureGuest,getLandingPage)
router.get('/getstats',verifyToken,ensureAdmin, getStats)


router.post('/test',(req,res)=>{
	console.log("---");
	console.log(req.body);
})



  
module.exports = router
