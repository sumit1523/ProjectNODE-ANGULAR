import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

 
  constructor(private http : HttpClient) {
   }


  registerUser(username, email, password, phoneno, address) : Observable<any> {
   return this.http.post('http://localhost:3001/register', {username : username, email: email, password : password, phoneno : phoneno, address : address});
  }

  userLogin(loginid,password) : Observable<any> {
    return this.http.post('http://localhost:3001/login', {loginid : loginid, password: password});
  }

  userDeactivation(loginid,password) : Observable<any> {
    return this.http.post('http://localhost:3001/register/deactivate', {email : loginid, password: password});
  }
  getProfileData(userid) : Observable<any>{
    return this.http.get('http://localhost:3001/register/data/'+userid);
  }
}
