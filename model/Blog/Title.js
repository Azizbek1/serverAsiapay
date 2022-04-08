const mongoose = require('mongoose');

const BlogTitleShema = mongoose.Schema({
   name: {
       type: String,
       required: true
   }
})

module.exports = mongoose.model('blogTitle', BlogTitleShema) 