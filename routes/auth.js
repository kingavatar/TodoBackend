const express = require('express')
const passport = require('passport')
const User = require('../models/User')
const router = express.Router()

// Google OAuth
/**
 * @swagger
 * /auth/google:
 *   post:
 *     description: Google sigin
 *     responses:
 *       200:
 *         description: Please don't use this
 */
router.get('/google',passport.authenticate('google',{scope:['profile']}))

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     description: Google callback
 *     responses:
 *       200:
 *         description: please don't click these
 */
router.get('/google/callback', passport.authenticate('google',{failureRedirect: '/' }),
     (req,res)=>{
        res.redirect('/dashboard')
    }
)

/**
 * @swagger
 * /logout:
 *   get:
 *     description: Logout
 *     responses:
 *       200:
 *         description: Lougs out the user
 */
router.get('/logout',(req,res)=>{
    req.logout()
    res.redirect('/')
})


// Normal Loging / SignUP
/**
 * @swagger
 * /auth/signin:
 *   post:
 *     description: Signin
 *     responses:
 *       200:
 *         description: email and password required for response.
 */
router.post('/signin', 
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/dashboard');
  });


//SignUp
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     description: Signup
 *     responses:
 *       200:
 *         description: Signup.
 */
router.post('/signup',(req,res)=>{
    //Login
    // req.body.password = req.body
})
// Facebook OAuth





module.exports = router