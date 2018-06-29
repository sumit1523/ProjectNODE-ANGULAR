var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var uniqueValidator = require('mongoose-unique-validator');
var userProfile = require('./userProfile');

var accountDetailSchema = new mongoose.Schema({

    email: {type : String, required: true, unique: true},
    password: { type: String},
    name: {type : String},
    OauthSource: String,
    OauthId: Number,
    Flag: Boolean,
    Usertype: {type:String, default: 'user'}, 
    PrimeUser: Boolean,
    CreatedDate: { type: Date, default: Date.now },
});
accountDetailSchema.plugin(uniqueValidator);

var accountDetail = module.exports = mongoose.model('accountDetail', accountDetailSchema);

module.exports.comparePassword = function(password, hash, callback){
	bcrypt.compare(password, hash, function(err, isMatch) {
            if(err) isMatch===false;
    	    callback(null, isMatch);
	});
}

module.exports.getAccount = function(email, callback){
    accountDetail.findOne({email: email}, callback );
}

module.exports.findOrCreate = function(profile,callback){
    
    var email = profile.emails[0].value;
    accountDetail.findOne({email:email}, function(err, account){
        if(account)
            callback(err,account);
        else{
            var newacc = new accountDetail({email:email, name : profile.displayName,  OauthSource: profile.url, OauthId : profile.id }); 
            newacc.save(function(err,data){
                if(err) throw err;
                console.log('>>>>>>>>>>>>>>>> New Account Created');
                var newuser = new userProfile({username: profile.displayName, email: email,accountid : data._id});
                newuser.save(function(err,dat){
                    console.log('>>>>>>>>>>>>>>>> New User Created');
                    callback(err,data);
                });
            });
           
        }
    })
}

