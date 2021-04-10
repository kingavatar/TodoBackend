const constants = require('../config/constants');
const crypto = require('crypto') 
module.exports = {
    myRegex: function(s){
        let reg = new RegExp(s,'i')//this makes the regex case insensitive
        return reg

    },
    hashPassword: function(password){
        let hashed = crypto.pbkdf2Sync(password, 'salt',constants.PASSWORD_ITER, constants.REQ_BYTE_LEN, 'sha512').toString(constants.DEFAULT_ENCODING);
        return hashed;
    }
}