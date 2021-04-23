const express = require('express')
const passport = require('passport')
const router = express.Router()

const { getUserStatus } = require('../controllers')
const { loginCallback, localSignup, logout } = require('../controllers/auth')
const { hashPassword } = require('../helpers/extension')
const { generateToken } = require('../helpers/jwt')
const { ensureGuest, ensureAuth } = require('../middleware/auth')
const User = require('../models/User')

// Google OAuth
router.get('/google',passport.authenticate('google',{scope:['profile','email']}))
router.get('/google/callback', passport.authenticate('google',{failureRedirect: '/' }),loginCallback)


// Facebook OAuth
router.get('/facebook',passport.authenticate('facebook',{scope:['email']}))
router.get('/facebook/callback', passport.authenticate('facebook',{failureRedirect: '/' }),loginCallback)


//Github OAuth
router.get('/github',passport.authenticate('github' ,{scope:['email']}))
router.get('/github/callback', passport.authenticate('github',{failureRedirect: '/' }),loginCallback)


// Normal Loging / SignUP
router.post('/signin', ensureGuest, passport.authenticate('local', { failureRedirect: '/' }),loginCallback);
router.post('/signup',ensureGuest,localSignup)

//Don't know why we need
router.get('/')


//Logout
router.get('/logout',ensureAuth,logout)


// Get user auth status for frontend
router.get('/authstatus',ensureAuth,getUserStatus)


module.exports = router