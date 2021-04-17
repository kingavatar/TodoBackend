const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest, ensureAdmin} = require('../middleware/auth')
const {getLandingPage, getDashboard, getStats, getUserStatus} = require('../controllers/index')




router.get('/',ensureGuest,getLandingPage)

router.get('/dashboard',ensureAuth,getDashboard)

router.get('/getstats',ensureAdmin, getStats)

router.get('/authstatus',ensureAuth,getUserStatus)



module.exports = router