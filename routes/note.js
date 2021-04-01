const express = require('express')
const router = express.Router()
const {ensureAuth} = require('../middleware/auth')
const {myRegex} = require('../helpers/extension')  
//Create a note
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
            if(note.ownerId != req.user.id && !note.viewers.includes(req.user.id)){
                console.log('permission denied')
                //PERMISSION DENIED
            }
            else if(note.ownerId === req.user.id){
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


//Edit a note 
router.get('/edit/:id',ensureAuth,async (req,res) => {
    try {
        
    } catch (error) {
        
    }
})
//Update the note in dbase

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
        let notes = Note.find({myLink:{$regex: link}})
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

module.exports = router