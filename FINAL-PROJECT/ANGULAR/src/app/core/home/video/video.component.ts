import { Component, OnInit } from '@angular/core';
import { OthersService } from "src/app/others.service";
import { DomSanitizer } from "@angular/platform-browser";
import { SessionService } from "src/app/session.service";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  public allvideos= [];
  public trustedUrl;
  public url;
  public currentVideoId;
  public currentVideo={};
  public currentVideoTotalLike;
  public currentVideoTotalDislike;
  public currentVideoAllComments=[];
  public isLiked;
  public isDisliked;
  public randomVideos = [];
  public index = Math.floor(Math.random() * 20); 

  constructor(private serv : OthersService, private sanitizer: DomSanitizer, private sessionstorage : SessionService) { }

  idSpecificTouchUpAndUrlTrust(id: string) {
    this.currentVideoId= id;
    this.url = 'https://www.youtube.com/embed/' + id;
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);

    //**Get Current Object to do operations on that */
    this.allvideos.forEach(element=>{
      if(element.videoID===id){
        this.currentVideo=element
      }
    })
    console.log(this.currentVideo);
    
    this.currentVideoTotalLike=0;
    this.currentVideoTotalDislike=0;
    this.isLiked= false;
    this.isDisliked = false;


    this.getTotalLikesAndDislikesOfCurrentVideo();
    this.getAllCommentsOfCurrentVideo();

  }

  ngOnInit() {
    this.serv.getAllVideos().subscribe(videodetails=>{
      console.log(videodetails);
      this.pushOnRandomVideos(videodetails);
      this.allvideos = videodetails;
      this.idSpecificTouchUpAndUrlTrust(this.randomVideos[this.index]);
    });
  }

  getOnScreen(id){
    this.idSpecificTouchUpAndUrlTrust(id);
  }

  pushOnRandomVideos(objectt)
  {
    objectt.forEach(element => {
      this.randomVideos.push(element.videoID)
    });

  }

  liked(){
    if(!this.sessionstorage.getValueFromSession("isLoggedIn"))
      alert("Please Login to Like/comment a Video");
    else{
      var UserID = this.sessionstorage.getValueFromSession("userID");
      var VideoID = this.currentVideoId;
      var Likes = true;
      var likeObject = {userID : UserID, videoID: VideoID, likes: Likes};
      this.serv.countLikeOrDislike(likeObject).subscribe(data=>{
          this.getTotalLikesAndDislikesOfCurrentVideo();
      });
      
    }
  }
  disliked(){
    if(!this.sessionstorage.getValueFromSession("isLoggedIn"))
      alert("Please Login to Dislike a Video");
    else{
      var UserID = this.sessionstorage.getValueFromSession("userID");
      var VideoID = this.currentVideoId;
      var Likes = false;
      var likeObject = {userID : UserID, videoID: VideoID, likes: Likes};
      this.serv.countLikeOrDislike(likeObject).subscribe(data=>{
        this.getTotalLikesAndDislikesOfCurrentVideo();
      });
      
      
    }
  }

  commentSubmit(event){
    event.preventDefault();
    var comment = event.target.querySelector('#comment').value;
    if(comment===''){
      alert('Comment Field should not be empty');
    }
    else{
      if(!this.sessionstorage.getValueFromSession("isLoggedIn"))
        alert("Please Login to comment on a Video");
      else{
        var User = this.sessionstorage.getValueFromSession("user");
        var UserID = this.sessionstorage.getValueFromSession("userID");
        var VideoID = this.currentVideoId;
        var commentObject = {videoID: VideoID, userID : UserID, user :User, comments : comment};
        this.serv.storeComment(commentObject).subscribe(data=>{
          if(data==="Commnet Posted"){
            alert("Commnet Posted");
            this.getAllCommentsOfCurrentVideo();
          }
          else{
            alert('Sorry.. Comment Posting Failed For system Error');
          }   
        },err=>{
          alert('Something went wrong.comment Failed');
        });
      }
    }
  }
  
  getTotalLikesAndDislikesOfCurrentVideo(){
    var UserID = this.sessionstorage.getValueFromSession("userID");
    var videoId = this.currentVideoId;
    this.serv.getLikesAndDislikesCount(UserID,videoId).subscribe(data=>{
      //console.log(data);
      this.currentVideoTotalLike = data.liked;
      this.currentVideoTotalDislike = data.disliked;
      this.isLiked= data.isLiked;
      this.isDisliked = data.isDisliked;
    });
  }

  getAllCommentsOfCurrentVideo(){
    var videoid = this.currentVideoId;
    this.serv.getAllCommentsByVideoId(videoid).subscribe(comments =>{
      //console.log(comments);
      this.currentVideoAllComments= comments;
    })
  }

}
