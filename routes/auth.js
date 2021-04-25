const express = require('express')
const passport = require('passport')
const router = express.Router()

//Controllers
const { getUserStatus } = require('../controllers/index')
const {
  loginCallback,
  localSignup,
  logout,
  socialCallback,
  getUserDetails
} = require("../controllers/auth");
//Middleware
const { ensureGuest, verifyToken } = require('../middleware/auth')

// ================================= O Auth and Signup ===============================
router.get('/google',passport.authenticate('google',{scope:['profile','email']}))
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  socialCallback
);

router.get('/facebook',passport.authenticate('facebook',{scope:['email']}))
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  socialCallback
);

router.get('/github',passport.authenticate('github' ,{scope:['email']}))
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  socialCallback
);

router.get("/social",verifyToken, getUserDetails);

router.post('/signin', passport.authenticate('local', { failureRedirect: '/' }),loginCallback);
router.post('/signup',ensureGuest,localSignup)

router.get("/logout", logout);


//Don't know why we need
router.get('/')



// Get user auth status for frontend
router.get('/authstatus',verifyToken,getUserStatus)


module.exports = router