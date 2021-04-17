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
        // RENDER 500
        //TODO:
        console.log(error)
    }
}

async function getNoteById(req,res){
    try {
        let note = await Note.findById(req.params.id).lean()
        // if there is no such note
        if(!note){
            console.log('not found 404')
            // ERROR PAGE TO BE RENDERED
            // TODO:
        }
        else{
            console.log(note.ownerId == req.user.id);
            console.log(req.user.id);
            if(note.ownerId != req.user.id && !note.viewers.includes(req.user.id)){
                console.log('permission denied')
                //PERMISSION DENIED
                // TODO:
            }
            else if(note.ownerId == req.user.id){
                console.log('Owner')
                res.send(note)
                //OWNER CAN EDIT
                // TODO:
            }
            else{
                // VIEWER CAN SEE
                res.send(note)
            }
        }
    } catch (error) {
        //TODO:
        console.log('resource not there')
    }
}

async function editNote(req,res){
    try {
        // id, content
        let note = await Note.findOne({_id: req.params.id}).lean()
        if(!story){
            //RETURN 404
            //TODO:
        }
        if(story.ownerId != req.user.id){
            //NOT EDITABLE 
            //TODO:
        }
        else{
            //RENDER THE STORY
            //TODO:
            note = await Note.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true,
            })
            //TODO:
        }

    } catch (error) {
        //RETURN 500
        //TODO: 
    }
}


async function deleteNote(req,res){
    try {
        let note = await Note.findById({_id:req.params.id}).lean()
        if(!note){
            console.log('no story')
            // ERROR 404
            //TODO:
        }
        else{
            if(note.ownerId != req.user.id){
                console.log('No you cannnot delete')
            }
            else{
                await Note.remove({_id: req.params.id})
                res.redirect('/dashboard')
            }
        }

    } catch (error) {
        console.log('0000')
        //ERROR 503        
        //TODO:
    }
}



module.exports = {getNotes, postNote, getNoteById, editNote, deleteNote}