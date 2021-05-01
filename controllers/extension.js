const {getDomain} = require("../helpers/extension")
const User = require("../models/User")
const Note = require("../models/Note")
const Page = require("../models/Page")

async function postNote(req,res){
    try {
        console.log(req.body)
        var website = req.body.website
        var domain = getDomain(website)
        let page = await Page.findOne({"title":domain})
        if(!page){
            const myPage = {"ownerId":req.payload._id,"title":domain,"notesIn":[]}
            try{
                page = await Page.create(myPage)
                let user = await User.findById(req.payload._id)
                user.pages.push(page._id)
                await user.save()
            }catch(err){
                res.status(500)
            }
        }
        const thisNote = {
            "ownerId":req.payload._id,
            "pageId":page._id,
            "content":req.body.content
        }        
        let note = await Note.create(thisNote)
        let ID = note._id;
        console.log(page)
        page.notesIn.push(ID)
        console.log(page)
        await page.save()
        res.status(200).send(ID)
        return note._id
   
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

async function getData(req,res){
    console.log(req.body)
    res.json({'tasks':'2'})
    res.status(200).send()
}
module.exports = {postNote,getData}