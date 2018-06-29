var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs'); 
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var urlencoded = bodyParser.urlencoded({extended:false});
var logger = require('../config/winston');
var accountDetail = require('../models/AccountDetail');
var userProfile = require('../models/userProfile');
const nodemailer = require('nodemailer');

//NodeMaoler set up
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mib.club.2018@gmail.com',
      pass: 'mibfanclub'
    }
});
// setup email data with unicode symbols
var mailOptions = {
    from: 'mib.club.2018@gmail.com',
    to: '',
    subject: 'MIB Fan Club Registration',
    html: '<h2>Welcome User</h2><h4>Now you are a Registered user of our fan club.</h4><p>You can deactivate your account any time by clicking <a href="http://localhost:4200/user-access/deactivate">HERE</a><p>'
  };

/* Registration will be handled Here */
router.post('/', function(req, res) {
    email = req.body.email;
    password = req.body.password;
    name = req.body.username;

    let enc_pwd= hashPassword(password);
    var account={'email': email, 'password':enc_pwd, 'name':name};
    accountDetail(account).save(function(err,data){
        if(err){
            logger.error(err);
            res.status(409).json('User Already Exist');
        }
        let user_data={'accountid':data._id,'username': req.body.username,'email':data.email, 'phoneno': req.body.phoneno, 'address': req.body.address};
        userProfile(user_data).save();

        //MAIL FUNCTION START
        mailOptions.to =email;
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              logger.error(error);
            } else {
              console.log('Email sent: ' + info.response);
              logger.info('Email sent: ' + info.response);
            }
        });
        //MAIL FUNCTION END



        res.status(200).json('success');
        logger.info('User registered successfully');
        console.log('User registered successfully');
    });
});

//* Deactivate account */
router.post('/deactivate', function(req, res) {
    Email = req.body.email;
    password = req.body.password;
    accountDetail.getAccount(Email,function(err1,data){
        console.log(data);
        console.log(err1);
        if(data){
            accountDetail.comparePassword(password,data.password,function(err2,isMatch){
                if(err2){
                    logger.error(err2);
                    res.status(500).json("Operation Failed. Error Occured");
                } 
                   
                else if(isMatch){
                  accountDetail.deleteOne({email: Email}, function (err3) {
                        if(err3){
                            logger.error(err3);
                            res.status(500).json("Operation Failed. Error Occured");
                        } 
                        else{
                            res.status(202).json('success');
                        }                         
                    });
                }
                else if(!isMatch){
                    res.status(401).json("Wrog Password Entered");
                }
            });
        }
        else if(data===null){
            res.status(400).json('No account Found');
        }
        else if(err1){
            logger.error(err);
            res.status(500).json("Operation Failed. Error Occured");
        }
    })
});

router.get('/data/:userid', function(req, res){
    var userid = req.params.userid;
    console.log(userid);
    accountDetail.getAccount(userid,function(err1,data){
        if(err1){
            logger.error(err1);
            res.status(500).json("Operation Failed. Error Occured");
            return;
        } 
        else if(data===null){
            logger.error("User not Registered");
            res.status(402).json("No user Found");
            return;
        }
        console.log(data);
        res.status(200).json(data);
    })


})


var hashPassword = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
}

//Email Sending Function



module.exports = router;