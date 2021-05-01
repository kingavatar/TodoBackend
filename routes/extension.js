const express = require('express')
const router = express.Router()
const passport = require('passport')

// Controllers
const {loginCallback} = require('../controllers/auth')
const {postNote,getData} = require('../controllers/extension')
// Middleware
const {verifyToken} = require('../middleware/auth')
    
router.post('/signin', passport.authenticate('local', { failureRedirect: '/login' }),loginCallback);

router.post('/note',verifyToken,postNote)

router.post('/data',verifyToken,getData)

  
module.exports = router
