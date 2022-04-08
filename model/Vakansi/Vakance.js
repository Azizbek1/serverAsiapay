const mongoose = require('mongoose');

const VakanceShema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {type: String},
    title_top: {type: String},
    slug: {type: String},
    status: {
        type: Boolean,
        default: true
    },
    updated: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    commentId: {
        type: String,
        ref: 'User'
    }
})

module.exports = mongoose.model('vakance', VakanceShema) 