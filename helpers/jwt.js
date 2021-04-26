const JWT = require('jsonwebtoken')
const constants = require('../config/constants')
function generateToken(req,res,user){

    var payload = {user}
    var token = null
    var token = JWT.sign(payload, process.env.JWT_SECRET, {expiresIn:4*constants.ONEDAY})
    return token
}

// verifyToken in middleware/auth


module.exports = {generateToken}