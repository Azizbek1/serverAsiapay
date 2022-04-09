const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    hashed_password: {
        type: String,
    },
    salt: String,
    role: {
        type: String,
        lowercase: true,
        default: "Subscripte"
    },
    image_path: {
        type: String,
    },
    image_name: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    },
    status_toggle: {
        type: Number,
        default: 1
    },
    is_ban: {
        type: Number,
        default: 1
    }
})

// virtual 
UserSchema.virtual('password')
.set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
})
.get(function() {
    return this._password
})

UserSchema.methods = {
    authticate : function(plainText) {
        return this.encryptPassword(plainText) == this.hashed_password
    },
    encryptPassword: function(password) {
        if(!password) return '' 
        try{
            return crypto.createHmac('sha1', this.salt)
            .update(password)
            .digest('hex');
        }catch(err) {
           return ''
        }
    },
    makeSalt: function() {
        return Math.round(new Date().valueOf() * Math.random())  + ''
    }
}
module.exports = mongoose.model('User', UserSchema) 