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




module.exports = router