var mongoose = require('mongoose');
var logger = require('../config/winston');
var Schema = mongoose.Schema;
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

var PlayerDatabaseSchema = new Schema({
    playerID: {type: String,required : true, unique: true},
    playerName: {type: String,required : true},
    BattingStyle: {type: String},
    BowlingStyle : {type: String},
    CurrentAge : {type: String},
    profileDescription: {type: String,required : true},
    profileImage: {type: String,required : true},
    playerFlag: {type: Boolean,required : true},
    playerType: {type: String,required : true},
    createdDate: {type: Date,required : true},
    playerAPIId: {type: String,unique : true,required : true}
})

var testMatchSchema = new Schema({

    playerID: {type: String,required : true, unique: true},
    matchesPlayed: {type: Number,required : true},
    totalRunSored: {type: Number,required : true},
    totalFifties: {type: Number,required : true},
    totalHundreads: {type: Number,required : true},
    average: {type: SchemaTypes.Double},
    wicketsTaken: {type: Number},
    topScore: {type: Number},
    economy: {type: SchemaTypes.Double}
})

var dataSchemaODI = new Schema({

    playerID: {type: String,required : true, unique: true},
    matchesPlayed: {type: Number,required : true},
    totalRunSored: {type: Number,required : true},
    totalFifties: {type: Number,required : true},
    totalHundreads: {type: Number,required : true},
    average: {type: SchemaTypes.Double},
    wicketsTaken: {type: Number},
    topScore: {type: Number},
    economy: {type: SchemaTypes.Double}
})

var dataSchemaT20 = new Schema({

    playerID: {type: String,required : true, unique: true},
    matchesPlayed: {type: Number,required : true},
    totalRunSored: {type: Number,required : true},
    totalFifties: {type: Number,required : true},
    totalHundreads: {type: Number,required : true},
    Average: {type: SchemaTypes.Double},
    wicketsTaken: {type: Number},
    TopScore: {type: Number},
    Economy: {type: SchemaTypes.Double}
})

var PlayerDetails = mongoose.model('playerDetails', PlayerDatabaseSchema);
var TestMatch = mongoose.model('testMatch', testMatchSchema);
var OneDayInternational = mongoose.model('oneDayInternational', dataSchemaODI);
var TTwenty = mongoose.model('tTwenty', dataSchemaT20);

module.exports = {
    PlayerDetails: PlayerDetails,
    TestMatch: TestMatch,
    OneDayInternational : OneDayInternational,
    TTwenty : TTwenty
};

module.exports.addOrUpdatePlayer = function (player,callbackfunction) {
    var id = player.pid;
    var _average;
    var _wicketsTaken;
    var _economy;

    var updatedPlayerDetails = {
        playerName : player.name,

        BattingStyle: player.battingStyle,
        BowlingStyle : player.bowlingStyle,
        CurrentAge : player.currentAge,

        profileDescription : player.profile,
        profileImage : player.imageURL,
        playerFlag : true,
        playerType : player.playingRole,
        createdDate : new Date(),
        playerAPIId :player.pid
    }

    var _average=1;
    var _wicketsTaken=1;
    var _economy=1;
   
    if(player.data.bowling.T20Is.Wkts==="-"){
        _average =0; 
        _wicketsTaken =0; 
        _economy =0;
    }    
    else{
        _average =player.data.batting.T20Is.Ave; 
        _wicketsTaken =player.data.bowling.T20Is.Wkts;  
        _economy =player.data.bowling.T20Is.Econ; 
    }
    var updatedtTwenty ={
        matchesPlayed : player.data.batting.T20Is.Mat,
        totalRunSored : player.data.batting.T20Is.Runs,
        totalFifties : player.data.batting.T20Is['50'],
        totalHundreads : player.data.batting.T20Is['100'],
        Average : _average,
        wicketsTaken : _wicketsTaken,
        TopScore : "",
        Economy : _economy,
    };
   
    var updatedOneDayInternational = {
        matchesPlayed : player.data.batting.ODIs.Mat,
        totalRunSored : player.data.batting.ODIs.Runs,
        totalFifties : player.data.batting.ODIs['50'],
        totalHundreads : player.data.batting.ODIs['100'],
        average : player.data.batting.ODIs.Ave,
        wicketsTaken : player.data.bowling.ODIs.Wkts,
        topScore : "",
        economy : player.data.bowling.ODIs.Econ
    }

    var updatedTestMatch = {
        matchesPlayed : player.data.batting.tests.Mat,
        totalRunSored : player.data.batting.tests.Runs,
        totalFifties : player.data.batting.tests['50'],
        totalHundreads : player.data.batting.tests['100'],
        average : player.data.batting.tests.Ave,
        wicketsTaken : player.data.bowling.tests.Wkts,
        topScore : "",
        economy : player.data.bowling.tests.Econ
    }
 
    PlayerDetails.findOneAndUpdate({playerID : id}, updatedPlayerDetails, {upsert: true, new: true}, (err, result) => {
        if (err){logger.error(err); return;}
        logger.info("PlayerDetails pushed to the Database !!!");
        TTwenty.findOneAndUpdate({playerID : id}, updatedtTwenty, {upsert: true, new: true}, (err1, result1) => {
            if (err1) {logger.error(err1); return;};
            logger.info("T20 Data pushed !!!");
            OneDayInternational.findOneAndUpdate({playerID : id},updatedOneDayInternational,{upsert: true, new: true},(err2, result2) => {
                if (err2) {logger.error(err2); return;}
                logger.info("ODI Data Pushed!!!");
                TestMatch.findOneAndUpdate({playerID : id},updatedTestMatch,{upsert: true, new: true},(err3, result3) => {
                    if (err3) {logger.error(err3); return;}
                    logger.info("Test Data Pushed !!!");
                    callbackfunction();
                });
            });
        });
    });
}


module.exports.allDetailsOfOnePlayer = function (playerid,callback){
    
    var playerDetailsObject = {};

    PlayerDetails.find({playerID : playerid}).exec(function(err1,data1){
        if(err1) {logger.error(err1); return;};
        logger.info('Player Details Added to playerDetailsObject');
        playerDetailsObject.playerDetails = data1;
        TestMatch.find({playerID : playerid}).exec(function(err2,data2){
            if(err2) {logger.error(err2); return;}
            logger.info('Player TestMatch Details Added to playerDetailsObject');
            playerDetailsObject.testMatch = data2;
            OneDayInternational.find({playerID : playerid}).exec(function(err3,data3){
                if(err3) {logger.error(err3); return;}
                logger.info('Player OneDayInternationalMatch Details Added to playerDetailsObject');
                playerDetailsObject.onedayMatch = data3;
                TTwenty.find({playerID : playerid}).exec(function(err4,data4){
                    if(err4) {logger.error(err4); return;}
                    logger.info('Player TTwenty match Details Added to playerDetailsObject');
                    playerDetailsObject.tTwenty = data4;
                    callback(err4, playerDetailsObject);
                })
            })
        })
       
    })
}