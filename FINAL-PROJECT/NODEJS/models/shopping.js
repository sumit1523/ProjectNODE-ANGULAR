var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

var categorySchema = new Schema({
    categoryName : {type: String,required : true, unique: true},
},{ versionKey: false })

var productSchema = new Schema({
    CategoryID : {type: String,required : true},
    ProductName: {type: String,required : true},
    Quantity: {type: Number,required : true},
    Description: {type: String,required : true},
    price: {type: SchemaTypes.Double,required : true},
    image: {type: String},
    flag: {type: Boolean},
},{ versionKey: false })

var cartSchema = new Schema({
    userID : {type: String, required : true},
    productID : {type: String, required : true},
    flag : {type: Boolean, default: false}
},{ versionKey: false })


var category = mongoose.model('category', categorySchema);
var productlist = mongoose.model('productlists', productSchema);
var cartList = mongoose.model('cart', cartSchema);

module.exports={ 
    category : category,
    productlist : productlist,
    cartList : cartList
}


module.exports.getAllProducts = function(callback){
    productlist.find({}).exec(callback)
}

module.exports.getProductById = function(productid, callback){
    productlist.findOne({_id: productid}).exec(callback);
}

