const express = require('express')
const router = express.Router()

// Controllers
const { getPages, getPageById, addPage, updatePage, deletePage, copyPage } = require('../controllers/page')
// Middleware
const {verifyToken} = require('../middleware/auth')


router.get('/', verifyToken, getPages)

// ========================== Pages CRUD =============================================
router.get('/:id', verifyToken, getPageById)
router.post('/add',verifyToken, addPage)
router.post("/copy/:id", verifyToken, copyPage);
router.put('/:id',verifyToken, updatePage)
router.delete('/:id',verifyToken,deletePage)


module.exports = router