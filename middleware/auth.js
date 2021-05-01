const constants = require("../config/constants");
const JWT = require('jsonwebtoken')
module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.status(208)
      }
    },
    ensureGuest: function (req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      } else {
        res.status(401);
      }
    },
    ensureAdmin: function(req,res,next){
      if(req.isAuthenticated()){
        // FIXME: change this to isadmin function 
        const email = req.payload.email;
        if(email == constants.ADMIN_EMAIL){
            return next();
        }
        else{
          res.status(401).send()
        }
      }
      else{
        res.status(401).send()
      }
    },
    verifyToken: function(req,res,next){
      if (!req.headers["authorization"]) {
        res.status(407).send();
      }
      const header = req.headers["authorization"];
      const token = header; 
      if(!token || token == undefined){
		res.status(407).send()
      }
      JWT.verify(token,process.env.JWT_SECRET,(err,payload)=>{
        if(err){
          return res.status(404).send()
        }
	else if(payload == undefined){
	  return res.status(407).send()	
	}
	console.log(payload == undefined)	
        req.payload = payload.user
        next()
      })
    }
  }
