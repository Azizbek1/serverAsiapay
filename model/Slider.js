const mongoose = require('mongoose');

const SliderShema = mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    image_name: {type: String},
    image_path: {type: String}
})

module.exports = mongoose.model('slider', SliderShema) 