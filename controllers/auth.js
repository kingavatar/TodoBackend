const { response } = require("express");
const { JsonWebTokenError } = require("jsonwebtoken");
const { ONEDAY } = require("../config/constants");
const { generateToken } = require("../helpers/jwt");

async function loginCallback(req,res){
    console.log(req.user)
    const token = await generateToken(req,res,req.user)
    res.status(200).send({ token: token, user: req.user });
}

async function socialCallback(req, res) {
  const token = await generateToken(req, res, req.user);
  res.redirect("http://localhost:3000/redirect?token=" + token);

}

async function getUserDetails(req,res){
  res.send(req.payload);
}
async function localSignup(req,res){
    const newUser = {
        firstName: req.body.firstName,
        email: req.body.email,
      } 
      let user = await User.findOne({email:req.body.email})
      if(user){
        // NOT POSSIBLE USER EXISTS
        res.status(409)
      }
      else{
        user = await User.create(newUser)
        user.setPassword(req.body.password)
        await user.save()
  
        const token = await generateToken(user)
        res.status(201).send({ token: token, user: req.user });
      }
}




async function logout(req,res){
    req.logout()
    res.status(200).send({ message: "logged out" });
}




module.exports = {
  loginCallback,
  localSignup,
  logout,
  socialCallback,
  getUserDetails,
};