const express = require('express')
const router = express.Router()
const {ensureAuth} = require('../middleware/auth')
const { getNotes, postNote, getNoteById, editNote, deleteNote} = require('../controllers/note')

//Redirect to create a note page
router.get('/add',ensureAuth,getNotes)

//Ceate a note
router.post('/add',ensureAuth,postNote)

//Get a note
router.get('/:id',ensureAuth,getNoteById)

//Actually editing the note
router.put('/:id',ensureAuth, editNote)

//Delete a note
router.delete('/:id',ensureAuth, deleteNote)

//API to get all notes specific to web page
router.get('/websites/:wsite',ensureAuth,async (req,res)=>{
    try {
        //Look into here
        let link = myTrim(req.params.wsite)
        let notes = Note.find({myLink:{$regex: link},timer:{$gte:new Date(Date.now())}})
        if(!notes || notes.length==0){
            //No website specific notes
            //TODO:
        }
        else{
            //Have to return the list of all notes
            //TODO:
        }
    } catch (error) {
        //ERROR
        //TODO:
        console.log(error)
    }
})


module.exports = router