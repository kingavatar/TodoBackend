const User = require('../models/User')
const Note = require('../models/Note')
const Page = require('../models/Page')
const constants = require('../config/constants')

async function getLandingPage(req,res){
    res.sendFile("land.html",{root: './views'})
}

async function getDashboard(req,res){
    try {
        console.log(req)
        const myuser = await User.findOne({_id : req.payload._id}).lean()
        res.status(200).send("ok "+myuser.firstName)
    } catch (err) {
        console.log(err)
        res.status(500)
    }
}

async function getUserStatus(req,res){
    try {
        return req.isAuthenticated()
    } catch (err) {
        console.log(err)
    }
}
async function getStats(req,res){
    if(req.user.firstName != "admin" || req.user.email!=constants.ADMIN_EMAIL){
        //RETURN ERROR IN PAGE AS ONLY ADMIN HAS PERMISSION
        // res.render('')
    }
    else{
        var users = await User.estimatedDocumentCount();
        var notes = await Note.estimatedDocumentCount();
        var pages = await Page.estimatedDocumentCount();
        var domains = 0 //;
        console.log(users-1)
        console.log(notes)
        //RETURN VALUES users, notes
    }
}

module.exports = { getLandingPage, getDashboard, getStats, getUserStatus }