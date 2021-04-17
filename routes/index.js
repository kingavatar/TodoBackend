const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')
const {getLandingPage, getDashboard, getStats, getUserStatus} = require('../controllers/index')




router.get('/',ensureGuest,getLandingPage)

router.get('/dashboard',ensureAuth,getDashboard)

// TODO: ensureAdmin
router.get('/getstats',ensureAuth, getStats)

router.get('/authstatus',ensureAuth,getUserStatus)



module.exports = router