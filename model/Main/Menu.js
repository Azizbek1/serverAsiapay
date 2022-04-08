const mongoose = require('mongoose');

const MenuShema = mongoose.Schema({
   name: {
       type: String,
       required: true
   }
})

module.exports = mongoose.model('menu', MenuShema) 