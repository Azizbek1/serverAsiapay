const mongoose = require('mongoose');

const MobileShema = mongoose.Schema({
    title: {
        type: String,
        default: 'Mobile-Operator'
    },
    status: {
        type: Boolean,
        default: true
    },
    operator_id: {
        type: String,
        ref: 'OperCat',
    },
    phone_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'numberCat',
    },
    paymet_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sumCat'
    },
    slug:{
        type: String,
    },
    updated: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('MobileCat', MobileShema) 