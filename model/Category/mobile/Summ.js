const mongoose = require('mongoose');

const SummShema = mongoose.Schema({
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

module.exports = mongoose.model('sumCat', SummShema) 