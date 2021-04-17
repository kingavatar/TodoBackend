const express = require('express')
const { getPages, getPageById, addPage, updatePage } = require('../controllers/page')
const router = express.Router()
const {ensureAuth} = require('../middleware/auth')


router.get('/', ensureAuth, getPages)

router.get('/:id', ensureAuth, getPageById)

router.post('/add',ensureAuth, addPage)

router.put('/:id',ensureAuth, updatePage)


module.exports = router