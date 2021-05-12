const User = require('../models/User')
const Note = require('../models/Note')
const Page = require('../models/Page')
const constants = require('../config/constants')

async function getLandingPage(req,res){
    res.sendFile("index.html", { root: "./dist" });
}

async function getDashboard(req,res){
    try {
        res.sendFile("index.html", { root: "./dist" });
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
        res.status(500)
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