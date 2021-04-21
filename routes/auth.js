const express = require('express')
const passport = require('passport')
const { getUserStatus } = require('../controllers')
const { hashPassword } = require('../helpers/extension')
const { ensureGuest } = require('../middleware/auth')
const User = require('../models/User')
const router = express.Router()

// Google OAuth
router.get('/google',passport.authenticate('google',{scope:['profile','email']}))

router.get('/google/callback', passport.authenticate('google',{failureRedirect: '/' }),
     (req,res)=>{
        // console.log(req)
        res.redirect('/dashboard')
        // TODO:
        // return req.user
    }
)

router.get('/logout',(req,res)=>{
    req.logout()
    // TODO:

    res.redirect('/')
})


// Normal Loging / SignUP
router.post('/signin', ensureGuest,
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    console.log(req.isAuthenticated())
    res.redirect('/dashboard');
  });


//SignUp
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

router.get('/')





// Facebook OAuth

router.get('/facebook',passport.authenticate('facebook',{scope:['email']}))

router.get('/facebook/callback', passport.authenticate('facebook',{failureRedirect: '/' }),
     (req,res)=>{
        res.redirect('/dashboard')
    }
)



//Github OAuth
router.get('/github',passport.authenticate('github' ,{scope:['email']}))

router.get('/github/callback', passport.authenticate('github',{failureRedirect: '/' }),
     (req,res)=>{
        res.redirect('/dashboard')
    }
  )

router.get('/authstatus',ensureAuth,getUserStatus)


module.exports = router