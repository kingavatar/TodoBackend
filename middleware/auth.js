const constants = require("../config/constants");

module.exports = {
    ensureAuth: function (req, res, next) {
      // console.log(req.isAuthenticated())
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/')
      }
    },
    ensureGuest: function (req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      } else {
        res.redirect('/dashboard');
      }
    },
    ensureAdmin: function(req,res,next){
      if(req.isAuthenticated()){
        // FIXME: change this to isadmin function 
        if(req.user.firstName === "admin" && req.user.email === constants.ADMIN_EMAIL){
        
            return next();
        }
        else{
          res.redirect('/dashboard')
        }
      }
      else{
        res.redirect('/')
      }
    }
  }