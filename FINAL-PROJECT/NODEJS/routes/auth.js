var express = require('express');
var router = express.Router();
var passport = require('passport');
var cors = require('cors');
var GoogleStratergy = require('passport-google-oauth20');
var jwt = require('jsonwebtoken');
var passportJWT = require("passport-jwt");
var accountdetail = require('../models/AccountDetail');;
var login = require('./login');


router.use(cors());

var data={};

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

passport.use(new GoogleStratergy({
    clientID: '902297695743-1046aduv2bd7dms0o5cta1fa6h9gl5l6.apps.googleusercontent.com',
    clientSecret: 'hVdJVUjV0kDBzbF5df_joj3p',
    callbackURL: "/auth/google/redirect"
},function(accessToken, refreshToken, profile, done){
    accountdetail.findOrCreate(profile, function(err, account){
        console.log(account);
        data=account;
        return done(err, account) ;
    })
}
));

router.get('/google',passport.authenticate('google', { scope:['profile','email']}));

router.get('/google/redirect', passport.authenticate('google'),
    function(req, res){
        let conURL = "/user-access/u/"+data.name+"/email/"+data.email;
        res.redirect("http://localhost:4200/"+conURL); 
        //res.redirect("http://localhost:4200/home");
});

module.exports = router;