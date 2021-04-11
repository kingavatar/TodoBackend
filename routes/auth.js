const express = require('express')
const passport = require('passport')
const { hashPassword } = require('../helpers/extension')
const { ensureGuest } = require('../middleware/auth')
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
router.post('/signin', ensureGuest,
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    console.log(req.isAuthenticated())
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
router.post('/signup',ensureGuest,async (req,res)=>{
    const newUser = {
      firstName: req.body.firstName,
      email: req.body.email,
    } 
    let user = await User.findOne({email:req.body.email})
    if(user){
      // NOT POSSIBLE USER EXISTS
      res.redirect('/dashboard')
    }
    else{
      user = await User.create(newUser);
      user.setPassword(req.body.password);
      await user.save()
      res.redirect('/')
    }
})






// Facebook OAuth

router.get('/facebook',passport.authenticate('facebook',
// {scope:['profile']}
))

/**
 * @swagger
 * /auth/facebook/callback:
 *   get:
 *     description: FB callback
 *     responses:
 *       200:
 *         description: please don't click these
 */
router.get('/facebook/callback', passport.authenticate('facebook',{failureRedirect: '/' }),
     (req,res)=>{
        res.redirect('/dashboard')
    }
)



//Github OAuth
router.get('/github',passport.authenticate('github'))

/**
 * @swagger
 * /auth/facebook/callback:
 *   get:
 *     tags: User
 *     description: FB callback
 *     responses:
 *       200:
 *         description: please don't click these
 */
router.get('/github/callback', passport.authenticate('github',{failureRedirect: '/' }),
     (req,res)=>{
        res.redirect('/dashboard')
    }
)

module.exports = router