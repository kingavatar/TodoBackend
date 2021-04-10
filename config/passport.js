const GoogleStrategy = require('passport-google-oauth20').Strategy
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const GithubStrategy = require('passport-github2').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')


module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        }
        try {
            let user = await User.findOne({googleId: profile.id})
            if(user){
              done(null,user)
            }
            else{
              user = await User.create(newUser)
              done(null,user)
            }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  //Passport strategy for local
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
  },
    function(email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) { 
          return done(err); 
        }
        if (!user) {
           return done(null, false); 
        }
        if (!user.verifyPassword(password)) { 
          return done(null, false); 
        }
        return done(null, user);
      });
    }
  ));

  //Facebook strategy
  passport.use(new FacebookStrategy(
    {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        facebookId: profile.id,
        firstName: profile._json.name,
        lastName: ''
      }
      try {
        let user = await User.findOne({facebookId: profile.id})
          if(user){
            done(null,user)
          }
          else{
            user = await User.create(newUser)
            done(null,user)
          }
      } catch (err) {
        console.error(err)
      }
    }
  ));

  //Github Strategy
  passport.use(new GithubStrategy(
    {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        githubId: profile.id,
        firstName: profile.displayName,
        lastName: ''
      }
      
      try {
        let user = await User.findOne({githubId: profile.id})
          if(user){
            done(null,user)
          }
          else{
            user = await User.create(newUser)
            done(null,user)
          }
      } catch (err) {
        console.error(err)
      }
    }
  ));




  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })


}