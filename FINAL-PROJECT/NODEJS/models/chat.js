var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatSchema=new Schema({

question:String,
answer:[String],
hits: {type:Number,default:0 }

})
module.exports=  mongoose.model('chaterBox', chatSchema);
