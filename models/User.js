const mongoose = require('mongoose');
const constants = require('../config/constants');
const {hashPassword} = require("../helpers/extension")
const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: false
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
    githubId:{
        type: String, 
        required: false,
        default: null
    },
    pages:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Page',
        required: true,
        default: []
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
    this.password = hashPassword(pass)

}


UserSchema.methods.verifyPassword = function(pass){
    var given_password = hashPassword(pass);
    return given_password === this.password;
}
module.exports = mongoose.model('User',UserSchema)