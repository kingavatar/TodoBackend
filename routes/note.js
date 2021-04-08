const express = require('express')
const router = express.Router()
const JSON = require('JSON')
const {ensureAuth} = require('../middleware/auth')
const {myRegex} = require('../helpers/extension') 
const Note = require('../models/Note')

//Redirect to create a note page
router.get('/add',ensureAuth, (req,res)=>{
    //RENDER THE ADDING PAGE
    res.sendFile('add.html',{root: './views'})
})

//Ceate a note
router.post('/add',ensureAuth,async (req,res)=>{
    try {
        req.body.ownerId = req.user.id
        await Note.create(req.body)
        
        //Redirect to dashboard or this story
        res.redirect('/dashboard')

    } catch (error) {
        // RENDER 500
        console.log(error)
    }
})
//Get a note
router.get('/:id',ensureAuth, async (req,res)=>{
    try {
        let note = await Note.findById(req.params.id).lean()
        // if there is no such note
        if(!note){
            console.log('not found 404')
            // ERROR PAGE TO BE RENDERED
        }
        else{
            console.log(note.ownerId == req.user.id);
            console.log(req.user.id);
            if(note.ownerId != req.user.id && !note.viewers.includes(req.user.id)){
                console.log('permission denied')
                //PERMISSION DENIED
            }
            else if(note.ownerId == req.user.id){
                console.log('Owner')
                
                res.send(note)
                //OWNER CAN EDIT
            }
            else{
                // VIEWER CAN SEE
                res.send(note)
            }
        }
        
    } catch (error) {
        console.log('resoruce not there')
    }
})



// Routing to the edit option
router.get('/edit/:id',ensureAuth,async (res,req)=>{
    try {
        const note = await Note.findOne({_id: req.params.id}).lean()
        if(!story){
            //RETURN 404
        }
        if(story.ownerId != req.user.id){
            //NOT EDITABLE 
        }
        else{
            //RENDER THE STORY
            res.send(note)
        }

    } catch (error) {
        //RETURN 500 
    }

})


//Actually editing the note
router.get('/:id',ensureAuth,async (res,req)=>{
    try {
        let note = await Note.findOne({_id: req.params.id}).lean()
        if(!story){
            //RETURN 404
        }
        if(story.ownerId != req.user.id){
            //NOT EDITABLE 
        }
        else{
            //RENDER THE STORY
            note = await Note.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true,
              })
            //REDIRECT
            res.redirect('/dashboard')
        }

    } catch (error) {
        //RETURN 500 
    }

})
//Delete a note
router.delete('/:id',ensureAuth,async (req,res)=>{
    try {
        let note = await Note.findById({_id:req.params.id}).lean()
        if(!note){
            console.log('no story')
            // ERROR 404
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
    }
})

//API to get all notes specific to web page
router.get('/websites/:wsite',ensureAuth,async (req,res)=>{
    try {
        //Look into here
        let link = myTrim(req.params.wsite)
        let notes = Note.find({myLink:{$regex: link},timer:{$gte:new Date(Date.now())}})
        if(!notes || notes.length==0){
            //No website specific notes
        }
        else{
            //Have to return the list of all notes
            
        }
    } catch (error) {
        //ERROR
        console.log(error)
    }
})


//
module.exports = router