const express = require('express')
const router = express.Router()
// Controllers
const { getNotes, postNote, getNoteById, editNote, deleteNote} = require('../controllers/note')
//Middleware
const {verifyToken} = require('../middleware/auth')

//Redirect to create a note page
router.get("/page/:id", verifyToken, getNotes);

// ============================= Note operations CRUD ==========================================
router.post('/add',verifyToken,postNote)
router.get('/:id',verifyToken,getNoteById)
router.put('/:id',verifyToken, editNote)
router.delete('/:id',verifyToken, deleteNote)




module.exports = router