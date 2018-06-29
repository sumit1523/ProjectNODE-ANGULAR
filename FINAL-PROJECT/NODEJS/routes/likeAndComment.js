var express = require('express');
var router = express.Router();
var syncLoop = require('sync-loop');
var logger = require('../config/winston');
var bodyParser = require('body-parser');
var urlencoded = bodyParser.urlencoded({extended:false});
//var cache = require('express-redis-cache')();
var videoDetailsSchema = require('../models/video');

// Update VideoLikeStatus Schema on every like and Dislike From user
router.post('',function(req, res){
    
    videoDetailsSchema.videoLikeStatus.findOneAndUpdate({$and:[{userID :req.body.userID},{videoID:req.body.videoID}]},
        {likes:req.body.likes},{upsert: true, new: true},(err1, result)=>{
            if(err1) {
                logger.error(err1);
                return;
            }
            //console.log(result);
            res.status(200).json("Liked/disliked");
        }
    );
});

router.post('/comment', function(req, res){
    videoDetailsSchema.videoComment.create(req.body, (err, result)=>{
        if(err){
            logger.error(err);
            res.status(500).json("DataBase Operation Error. Comment Could Not be Posted");
        }
        //console.log(result);
        res.status(200).json("Commnet Posted");
    });
})

router.post('/getlikes', function(req, res){
    var userid = req.body.userid;
    var videoid= req.body.videoid;
    var liked=0;
    var disliked=0;
    var isLiked = false;
    var isDisliked = false;
    
    videoDetailsSchema.videoLikeStatus.find({videoID:videoid}).exec((err, data)=>{
        data.forEach(element=>{
            if(element.likes === true){
                liked=liked+1;
            }
            if(element.likes === false){
                disliked=disliked+1;
            }
            if(element.userID ===req.body.userid){
                if(element.likes === true){
                    isLiked=true;
                }
                if(element.likes === false){
                    isDisliked=true;
                }
            }
        })
        res.json({liked, disliked,isLiked, isDisliked});
    })
    
})

router.get('/comments/:videoid', function(req,res){
    
    var commentSet = [];
    videoDetailsSchema.videoComment.find({videoID : req.params.videoid}).exec((err,data)=>{
        data.forEach(element=>{
            var username = element.user;
            var comments = element.comments;
            commentSet.push({user : username, comment: comments})
        })
        res.json(commentSet);
    })
    
})

module.exports = router;