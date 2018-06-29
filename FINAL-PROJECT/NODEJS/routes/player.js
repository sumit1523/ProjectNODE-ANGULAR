var express = require('express');
var router = express.Router();
const PlayerDatabaseSchema = require('../models/Player');
var logger = require('../config/winston');
var syncLoop = require('sync-loop');
var cache = require('express-redis-cache')();

var playerIdList = ["253802","28081","36084","34102","35263","28114"];

router.get('/id/:playerid', function(req, res) {
    PlayerDatabaseSchema.allDetailsOfOnePlayer(req.params.playerid, (err, playerDetailsObject)=>{
        if(err){
            logger.error(err);
            res.status(500).json('Something went wrong. Could not fetch the player data');
        }
        logger.info("Player Details found and Sent. Player ID: "+req.params.playerid);
        res.status(200).json(playerDetailsObject);
    });
});


//, cache.route('mib:allplayer', 36000)
router.get('/allplayers', function(req,res){

    var dataObject = [];
    var numberOfLoop =6;

    syncLoop(numberOfLoop, function(loop){
        var index = loop.iteration();
        var playerId = playerIdList[index];

        PlayerDatabaseSchema.allDetailsOfOnePlayer(playerId, (err, playerDetailsObject)=>{
            if(err){
                logger.error(err);
                res.status(500).json('Something went wrong. Could not fetch the players data');
                return;
            }
            dataObject.push(playerDetailsObject);
            loop.next();
        });
    },function(){  
            console.log('All Players Data Pushed to dataObject[]');
            res.status(200).json(dataObject); 
    });
});
module.exports = router;