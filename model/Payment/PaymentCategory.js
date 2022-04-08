const mongoose = require('mongoose');

const CategoryeShema = mongoose.Schema({
   name: {
       type: String,
       required: true
   },
   status: {
       type: Boolean,
       default: false
   }
})

module.exports = mongoose.model('categodyPaymet', CategoryeShema) 