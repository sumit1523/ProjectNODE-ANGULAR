const passport    = require('passport');
const passportJWT = require("passport-jwt");
var logger = require('./winston');
const accountDetail = require('../models/AccountDetail');

var JwtStrategy = passportJWT.Strategy;
var ExtractJWT = passportJWT.ExtractJwt;

var strategy = new JwtStrategy({jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'mysecretkeyforlogin'}, function(jwt_payload, next) {
        console.log('payload received', jwt_payload);
        // DatBase Call
        accountDetail.findById(jwt_payload.id, function(err, user) {
            if (err) {
                return next(err, false);
            }
            if (user) {
                next(null, user);
            } else {
                next(null, false);
            }
        }); 
});
passport.use(strategy);   
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    