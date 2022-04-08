const mongoose = require('mongoose');

const ContactShema = mongoose.Schema({
    contactPhone: {type: String},
    contactAdress: { type: String },
    cotnactTime: { type: String },
    cotnactMap: { type: String },
    image_name: { type: String },
    image_path: { type: String },
    slug: { type: String},
    status: {
        type: Boolean,
        default: true
    },
})

module.exports = mongoose.model('contact', ContactShema) 