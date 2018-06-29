var express = require('express');
var router = express.Router();
const PlayerDatabaseSchema = require('../models/Player');
var videoDetailsSchema = require('../models/video');
var logger = require('../config/winston');

var cache = require('express-redis-cache')();
cache.on('connected', function () {
    console.log("Redis DB connected.");
});

// ALL VIDEOS DETAILS //, cache.route('mib:allvideos', 36000)
router.get('', function(req,res){

    videoDetailsSchema.getAllVideos((err1, videodetails)=>{
        if(err1){
            logger.error(err1);
            res.status(500).json('Videos could not fetched');
            return;
        }
        else if(videodetails === null){
            logger.error("No videos Present in DataBase");
            res.status(404).json('No videos found in DataBase');
            return;
        }
        console.log("All Video Details Fetched from DB");
        res.status(200).json(videodetails);     
    })
});


module.exports = router;