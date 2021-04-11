const express = require('express')
const router = express.Router()
const JSON = require('JSON')
const {ensureAuth} = require('../middleware/auth')
const {myRegex} = require('../helpers/extension') 
const Note = require('../models/Note')

module.exports = router