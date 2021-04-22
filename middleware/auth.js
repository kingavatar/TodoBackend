const constants = require("../config/constants");
const JWT = require('jsonwebtoken')
module.exports = {
    ensureAuth: function (req, res, next) {
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
    },
    verifyToken: function(req,res,next){
      if(!req.headers['authorization']){
        // FIXME: Return error or status
        return res.send(404)
      }
      const header = req.headers['authorization'];
      const token = header.split(' ')[1]  // Token is in the form of Bearer <token>
      JWT.verify(token,process.env.JWT_SECRET,(err,payload)=>{
        if(err){
          // FIXME: return erro
          return res.send(404)
        }
        req.payload = payload
        next()
      })


    }
  }