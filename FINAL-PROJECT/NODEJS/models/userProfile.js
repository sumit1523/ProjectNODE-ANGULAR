var mongoose = require('mongoose');

var userProfileSchema = new mongoose.Schema({

    username : String,
    email: String,
    phoneno : String,
    address : String,
    accountid : String,
    PrimeUser : Boolean,
    ActiveFlag : Boolean,
    CreatedDate : {type : Date , default : Date.now}
    
});

module.exports = mongoose.model('userProfile', userProfileSchema);