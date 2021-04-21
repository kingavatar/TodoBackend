const User = require('../models/User')
const Note = require('../models/Note')
const Page = require('../models/Page')
const constants = require('../config/constants')

async function getLandingPage(req,res){
    res.sendFile("land.html",{root: './views'})
}

async function getDashboard(req,res){
    try {
        
        const myuser = await User.findOne({_id : req.user.id}).lean()
        var html = "<h1> Hi "+myuser.firstName+"</h1><a href='/auth/logout'>logout</a><a href='views/'>"   
        res.send(html)
    } catch (err) {
        console.log(err)
    }
}

async function getUserStatus(req,res){
    try {
        console.log(req.isAuthenticated());
        return req.isAuthenticated()
        // return req.user
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