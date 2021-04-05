const mongoose = require('mongoose');
const constants = require('../config/constants');

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    googleId: {
        type: String,
        required: false,
        default: null
    },
    image: {
        type: String
    },
    password:{
        type: String,
        default: null,
        required: false
    },
    facebookId:{
        type: String, 
        required: false,
        default: null
    },
    email: {
        type: String,
        require: false 
    }

    },
    { timestamps: true }
    
);


//See if thse can be static ???????????

UserSchema.methods.setPassword = function(pass){
    
    //Check how to use salt and use the below statements
    // this.salt = crypto.randomBytes(16).toString(constants.DEFAULT_ENCODING);
    // this.password = crypto.pbkdf2Sync(password, this.salt,constants.PASSWORD_ITER, 64, 'sha512').toString(constants.DEFAULT_ENCODING);
    
    this.password = crypto.pbkdf2Sync(password, 'salt',constants.PASSWORD_ITER, constants.REQ_BYTE_LEN, 'sha512').toString(constants.DEFAULT_ENCODING);

}


UserSchema.methods.verifyPassword = function(pass){
    var given_password = crypto.pbkdf2Sync(pass, 'salt',constants.PASSWORD_ITER, constants.REQ_BYTE_LEN, 'sha512').toString(constants.DEFAULT_ENCODING);
    return given_password === this.password;
}
module.exports = mongoose.model('User',UserSchema)