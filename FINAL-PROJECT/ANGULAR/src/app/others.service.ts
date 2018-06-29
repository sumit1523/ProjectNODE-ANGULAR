import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OthersService {

  constructor(private http : HttpClient) { }

  getPlayerById(playerid) : Observable<any>{
    return this.http.get('http://localhost:3001/player/id/'+playerid);
  }

  getAllPlayerStats() : Observable<any>{
    return this.http.get('http://localhost:3001/player/allplayers');
  }
  getAllVideos() : Observable<any>{
    return this.http.get('http://localhost:3001/allvideos');
  }

  countLikeOrDislike(likeObject) : Observable<any>{
    return this.http.post('http://localhost:3001/like-dislike', likeObject);
  }

  storeComment(commentObject) : Observable<any>{
    return this.http.post('http://localhost:3001/like-dislike/comment', commentObject);
  }

  getLikesAndDislikesCount(userid, videoid) : Observable<any>{
    return this.http.post('http://localhost:3001/like-dislike/getlikes', {'userid':userid, 'videoid':videoid});
  }

  getAllCommentsByVideoId(videoid) : Observable<any>{
    return this.http.get('http://localhost:3001/like-dislike/comments/'+videoid);
  }

}
