const JSON = require('JSON')
const {myRegex} = require('../helpers/extension') 
const Note = require('../models/Note')
const Page = require('../models/Page')
const User = require('../models/User')


async function getNotes(req,res){
    //RENDER THE ADDING PAGE
    res.sendFile('add.html',{root: './views'})
}

async function postNote(req,res){
    // FIXME: HOW TO GET PAGE ID 
    // FIXME: See if new page to be created when page null or add to default page
    try {
        let pageId = null // DANGER PLEASE CHANGE THIS
        let myLink = '' //
        let page = null
        console.log("----")
        if(!pageId || pageId==undefined){   
            const myPage = { "ownerId" : req.payload._id}
            try{
                page = await Page.create(myPage)
                let user = await User.findById(req.payload._id)
                user.pages.push(page._id)
                await user.save()

            }catch(err){
                console.log(error)
                res.status(500)
            }
        }
        
        req.body.ownerId = req.payload._id
        req.body.pageId = page._id

        let note = await Note.create(req.body)
        let ID = note._id;
        page.notesIn.push(ID)
        await page.save()
        res.status(200).send(ID)
        return note._id
   
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

async function getNoteById(req,res){
    // TODO: Have to add features regarding public , private and selected view.
    try {
        let note = await Note.findById(req.params.id).lean()
        // if there is no such note
        if(!note){
            console.log('not found 404')
            res.status(404).send()
        }
        else{
            if(note.ownerId != req.payload._id && !note.viewers.includes(req.payload._id)){
                console.log('permission denied')
                res.status(401).send("Permission denied")
            }
            else if(note.ownerId == req.payload._id){
                res.status(200).send(note)
            }
            else{
                // VIEWER CAN SEE
                res.status(200).send(note)
            }
        }
    } catch (error) {
        console.log('resource not there')
        res.status(500).send("Server Error")
    }
}

async function editNote(req,res){
    try {
        console.log(req.params.id)
        let note = await Note.findOne({_id: req.params.id}).lean()
        if(!note){
            res.status(404)
        }
        if(note.ownerId != req.payload._id){
            res.status(401)
        }
        else{
            // TODO:
            note = await Note.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true,
            })
            res.status(200).send("edited")
        }

    } catch (error) {
        res.status(500)
    }
}

// TODO: See if this query can be optimized
async function deleteNote(req,res){
    try {
        let note = await Note.findById({_id:req.params.id}).lean()
        if(!note){
            res.status(404)
        }
        else{
            if(note.ownerId != req.payload._id){
                console.log('No you cannnot delete')
                res.status(401)
            }
            else{
                let page = await Page.findById(note.pageId)
                await Note.remove({_id: req.params.id})
                page.notesIn.remove(req.params.id)
                await page.save()
                res.status(202).send("deleted")
            }
        }

    } catch (error) {
        res.status(500)
    }
}



module.exports = {getNotes, postNote, getNoteById, editNote, deleteNote}