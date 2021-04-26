const JSON = require('JSON')
const {myRegex} = require('../helpers/extension') 
const Note = require('../models/Note')
const Page = require('../models/Page')
const User = require('../models/User')


async function getNotes(req,res){
   const page = await Page.findById(req.params.id);
   const notes = await Note.find({ _id: { $in: page.notesIn } }).lean();
   res.send(notes);
}

async function postNote(req,res){
    // FIXME: HOW TO GET PAGE ID 
    // FIXME: See if new page to be created when page null or add to default page
    try {
        let pageId = null // DANGER PLEASE CHANGE THIS
        let myLink = '' //
        let page = null
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
            res.status(404).send()
        }
        else{
            if(note.ownerId != req.payload._id && !note.viewers.includes(req.payload._id)){
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
        res.status(500).send("Server Error")
    }
}

async function editNote(req,res){
    try {
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
                res.status(401)
            }
            else{
                let page = await Page.findById(note.pageId)
                await Note.deleteOne({_id: req.params.id})
                page.notesIn.splice(page.notesIn.indexOf(req.params.id),1);
                await page.save()
                res.status(202).send("deleted")
            }
        }

    } catch (error) {
        res.status(500)
    }
}



module.exports = {getNotes, postNote, getNoteById, editNote, deleteNote}