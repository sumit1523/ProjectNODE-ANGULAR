var express = require('express');
var router = express.Router();
var _ = require("lodash");
var jwt = require('jsonwebtoken');
var passportJWT = require("passport-jwt");
var passport = require('passport');
var bodyParser = require('body-parser');
var logger = require('../config/winston');
require('../config/passport');
var accountDetail=require('../models/AccountDetail');
var bcrypt = require('bcryptjs');  
var urlencoded = bodyParser.urlencoded({extended:false});

router.post('/',function(req, res){
    accountDetail.getAccount(req.body.loginid,function(err,data){
      if(err){
          logger.error(err);
          res.status(500).json('Error Occured');
      }
      else if(data===null){
          res.status(400).json('User not Registered');
      }
      else if(data!==null) {
            accountDetail.comparePassword(req.body.password,data.password,function(err,isMatch){
                if(err) logger.error(err);
                else if(isMatch){
                    logger.info('Match Found');
                    var payload = {id: data._id};
                    var token = jwt.sign(payload, 'mysecretkeyforlogin',{expiresIn:'20m'});
                    logger.info('Login successfull');
                    res.json({message: "ok", token: token, user :data});
                }
                else if(!isMatch){
                    logger.error('invalid Password');
                    res.status(401).json('Wrong Password Found');
                }
            });
        }
    })
});
module.exports = router;
