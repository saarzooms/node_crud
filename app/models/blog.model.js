const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
   },
   {
    timestamps:true
   }
   );

   var blog = new mongoose.model('Blog', schema);
   module.exports = blog;