const JSON = require('JSON')
const {myRegex} = require('../helpers/extension') 
const Note = require('../models/Note')
const Page = require('../models/Page')


async function getNotes(req,res){
    //RENDER THE ADDING PAGE
    res.sendFile('add.html',{root: './views'})
}

async function postNote(req,res){
    // FIXME: HOW TO GET PAGE ID 
    // FIXME: See if new page to be created when page null or add to default page
    try {
        // TODO: create new page if pageId === empty
        let pageId = null // DANGER PLEASE CHANGE THIS
        let myLink = '' //
        
        if(!pageId || pageId==undefined){
            let page = await Page.create({'ownerId':user.id})
            pageId = page._id
        }
        
        req.body.ownerId = req.user.id
        req.body.pageId = pageId

        let note = await Note.create(req.body)
        
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
            res.status(404)
        }
        else{
            console.log(note.ownerId == req.user.id);
            console.log(req.user.id);
            if(note.ownerId != req.user.id && !note.viewers.includes(req.user.id)){
                console.log('permission denied')
                res.status(401).send("Permission denied")
            }
            else if(note.ownerId == req.user.id){
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
        let note = await Note.findOne({_id: req.params.id}).lean()
        if(!story){
            res.status(404)
        }
        if(story.ownerId != req.user.id){
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


async function deleteNote(req,res){
    try {
        let note = await Note.findById({_id:req.params.id}).lean()
        if(!note){
            res.status(404)
        }
        else{
            if(note.ownerId != req.user.id){
                console.log('No you cannnot delete')
                res.status(401)
            }
            else{
                await Note.remove({_id: req.params.id})
                res.status(202).send("deleted")
            }
        }

    } catch (error) {
        res.status(500)
    }
}



module.exports = {getNotes, postNote, getNoteById, editNote, deleteNote}