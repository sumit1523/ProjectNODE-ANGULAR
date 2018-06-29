let express = require('express');
const appRoot = require('app-root-path');
let router = express.Router();
let bodyParser = require('body-parser');
var http = require('http');
const cronJob = require('node-schedule');
var syncLoop = require('sync-loop');
var axios = require('axios');

const PlayerDatabaseSchema = require(appRoot + '/models/Player');
const VideoDetailsSchema = require(appRoot + '/models/video');

let CricAPI_apiKey = "RrETD0um1bMKfkk54gRHE9Wlxd83";
let Youtube_appKey = "AIzaSyAVcxH9GbjBqrUqCIQMwbsMMipDcVGZWu0";

var PIdList = ["253802","28081","36084","34102","35263","28114"];
var numberOfLoop = 6;
var loopNumber = 20;
let body = '';


/**Cron Job For Player, Used syncLoop **/
var PlayerCronJob = cronJob.scheduleJob('00 01 00 * * *', function () { 
    console.log("***********Cron Job For Players started*************");
   
    syncLoop(numberOfLoop, function (loop) {
        var index = loop.iteration(); 

        console.log("index : "+index);
        let pid = PIdList[index];
                    
        let url = `http://cricapi.com/api/playerStats/?apikey=${CricAPI_apiKey}&pid=${pid}`;
        console.log("url : "+url);

        let urlencodeParser = bodyParser.urlencoded({ extended: false });

        let request = http.request(url, function(response){
            response.on('data', function (chunk) {
                body = body+chunk;
            });

            response.on('end', function () {
                var player = JSON.parse(body);
                console.log("Data Extracting with PlayerID : "+pid)
                PlayerDatabaseSchema.addOrUpdatePlayer(player,()=>{
                    body = "";
                    loop.next();
                });
            });
        }).end();
    }, function () {
        console.log("Data insertion/updatation successfully completed")
    });  
}
);    


/**Cron Job For Videos, Used Async/Await **/
var fetchData = async function(){
    console.log("inside fetch data");
    var details = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=indian%20cricket%202018&maxResults=${loopNumber}&key=${Youtube_appKey}`);
    return details.data.items;    
}


var videosCronJob = cronJob.scheduleJob('00 01 00 * * *', async function () {
    console.log("***********Cron Job For Videos started*************");
    var videodetails;
    videodetails = await fetchData();

    for (var index = 0; index < videodetails.length; index++) {
        var video = videodetails[index];
        VideoDetailsSchema.addOrUpdateVideo(video, (err,result)=>{
            if(err) throw err;
            console.log(result);
        });
    }
    console.log("Data updated/inserted successfully");
});



module.exports=router;
