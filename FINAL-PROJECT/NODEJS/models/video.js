var mongoose = require('mongoose');
var logger = require('../config/winston');
var Schema = mongoose.Schema;

var videoDetailsSchema = new Schema({
    videoDescription:String,
    thumbnails:String,
    videoURL:String,
    videoID:{ type:  String, required:  true, unique:  true  },
    videoDuration:String,
    videoTitle:String,
    likes:{type:Number, default: 0},
    disLikes:{type:Number, default: 0},
    createdDate:Date,
})

var videoLikeStatusSchema = new Schema({
    videoID:String,
    userID:String,
    likes:Boolean,
    createdDate:{type:Date, default: Date.now()}
})

var videocommentSchema = new Schema({
    videoID:String,
    userID:String,
    user:String,
    comments:String,
    createdDate:{type:Date, default: Date.now()},
    ModifiedDate:Date
})
var videoDetails = mongoose.model('videoDetails', videoDetailsSchema);
var videoLikeStatus = mongoose.model('videoLikeStatus', videoLikeStatusSchema);
var videoComment = mongoose.model('videocomment', videocommentSchema);

module.exports ={
    videoDetails:videoDetails,
    videoLikeStatus:videoLikeStatus,
    videoComment:videoComment
}


module.exports.addOrUpdateVideo = function (video,callback) {

    var id = video.id.videoId;

    var newVideo={
        videoDescription : video.snippet.description,
        videoID : id,
        videoURL : "https://www.youtube.com/embed/"+id,
        videoDuration : "",

        videoTitle : video.snippet.title,
        createdDate : new Date(),
        thumbnails :  video.snippet.thumbnails.default.url,
    }

    videoDetails.findOneAndUpdate({videoID : id}, newVideo, {upsert: true, new: true}, (err, result)=>{
        if(err) throw err;
        //console.log("Video Details Pushed To DataBase");
        callback(err, result);
    });
}

module.exports.getAllVideos = function(callback){
    //console.log('Fetching All videos Details From DataBase');
    videoDetails.find({}).exec(callback);
}

module.exports.getAllVideosLikeStatus = function(callback){
    //console.log('Fetching All videos Like Status From DataBase');
    videoLikeStatus.find({}).exec(callback)
}
module.exports.getAllVideosComments = function(callback){
    //console.log('Fetching All videos Comments From DataBase');
    videoComment.find({}).exec(callback)
}