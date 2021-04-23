const { JsonWebTokenError } = require("jsonwebtoken");
const { ONEDAY } = require("../config/constants");
const { generateToken } = require("../helpers/jwt");

async function loginCallback(req,res){
    const token = await generateToken(req,res,req.user)
    res.status(200).send({'token':token})
}

async function localSignup(req,res){
    const newUser = {
        firstName: req.body.firstName,
        email: req.body.email,
      } 
      let user = await User.findOne({email:req.body.email})
      if(user){
        // NOT POSSIBLE USER EXISTS
        res.redirect('/api/dashboard')
        res.status(409)
      }
      else{
        user = await User.create(newUser)
        user.setPassword(req.body.password)
        await user.save()
  
        const token = await generateToken(user)
        res.status(201).send({'token':token})
      }
}


async function logout(req,res){
    req.logout()
    res.satus(200).send({message:"loggedout"})
}


module.exports = {loginCallback, localSignup, logout}