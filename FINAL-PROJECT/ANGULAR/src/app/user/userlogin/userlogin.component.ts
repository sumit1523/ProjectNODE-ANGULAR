import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "src/app/authentication.service";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { SessionService } from "src/app/session.service";

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {
  

  constructor(private auth : AuthenticationService, private router: Router, private http : HttpClient, private sessionService: SessionService, private actrouter : ActivatedRoute) { }
  
  afterSubmit(event){  
    event.preventDefault();
    var loginid = event.target.querySelector('#loginid').value;
    var password = event.target.querySelector('#password').value;
    
    this.auth.userLogin(loginid, password).subscribe(data => {
      console.log(data);
      if(data.message ==='ok'){
        this.sessionService.setValueToSession('isLoggedIn', true);
        this.sessionService.setValueToSession('_t', data.token);
        this.sessionService.setValueToSession('user',data.user.name);
        this.sessionService.setValueToSession('userID',data.user.email);
        this.sessionService.LoggedInUserDetails.emit({user:data.user.name, userid:data.user.email, isLogged:true});
        this.router.navigate(['/home']);
        alert('Login Successfull');
      }
    },err=>{
      if(err.error==='Wrong Password Found'){
        alert(err.error); 
        this.router.navigate(['user-access/login']);
      }
      else if(err.error==='User not Registered')
        {alert(err.error); this.router.navigate(['user-access/register']);}
      else{
        alert(err.error); this.router.navigate(['error']);
      }
    })
  }
  
  ngOnInit() {
    if(this.actrouter.snapshot.paramMap.get('name')){
    let name= this.actrouter.snapshot.paramMap.get('name'); 
    let email= this.actrouter.snapshot.paramMap.get('email');
    this.sessionService.setValueToSession('isLoggedIn', true);
    this.sessionService.setValueToSession('user',name);
    this.sessionService.setValueToSession('userID',email);
    this.sessionService.LoggedInUserDetails.emit({user:name, userid: email, isLogged:true});
    this.router.navigate(['/home']);
    alert('Login Successfull');
    }
  }
  
}




