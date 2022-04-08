const mongoose = require('mongoose');

const NumberShema = mongoose.Schema({
    status: {
        type: Boolean,
        default: true
    },
    name: {type: String},
    updated: {
        type: Date,
        default: Date.now
    }
 
})

module.exports = mongoose.model('numberCat', NumberShema) 