const mongoose = require('mongoose');

const BlogCardShema = mongoose.Schema({
   title: {
       type: String,
       required: true
   },
   text: {
       type: String,
       required: true,
   },
   image_name: {type: String},
   image_path: {type: String},
   status: {
       type: Boolean,
       default: false
   },
   slug: {type: String, required: true}


})

module.exports = mongoose.model('blogCard', BlogCardShema) 