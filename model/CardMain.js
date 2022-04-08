const mongoose = require('mongoose');

const CardShema = mongoose.Schema({
   title: {
       type: String,
       required: true,
   },
   text: {
       type: String,
       required: true,
   },
   link: {
       type: String,
       required: true,
   },
   image_name: {type: String},
   image_path: {type: String}

})

module.exports = mongoose.model('cardmain', CardShema) 