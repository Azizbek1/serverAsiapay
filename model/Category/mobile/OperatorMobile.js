const mongoose = require('mongoose');

const OperShema = mongoose.Schema({
    name: {
        type: String,
    },
    status: {
        type: Boolean,
        default: false
    },
    updated: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('OperCat', OperShema) 