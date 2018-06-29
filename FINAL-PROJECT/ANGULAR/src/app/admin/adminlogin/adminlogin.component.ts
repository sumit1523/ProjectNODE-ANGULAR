import { Component, OnInit } from '@angular/core';
import { SessionService } from "src/app/session.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/authentication.service";

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor(private auth : AuthenticationService, private router: Router, private http : HttpClient, private sessionService: SessionService) { }

  ngOnInit() {
  }

  afterSubmit(event){
    event.preventDefault();
    var loginid = event.target.querySelector('#loginid').value;
    var password = event.target.querySelector('#password').value;

    this.auth.userLogin(loginid, password).subscribe(data => {
      console.log(data);
      if(data.message==='notRegistered')
      {
        alert("Admin Not Found");
        this.router.navigate(['/home'])
      }
      if(data.message==='wrongPassword')
      {
        alert("You have Entered WRONG Password. Try Again");
        this.router.navigate(['admin-access/login'])
      }
      if(data.message ==='ok'){ 
        if(data.user.Usertype === 'admin'){
          this.sessionService.setValueToSession('isLoggedIn', true);
          this.sessionService.setValueToSession('_t', data.token);
          this.sessionService.setValueToSession('user',data.user.name);
          this.sessionService.LoggedInUserDetails.emit({user:data.user.name, isLogged:true});
          alert('Admin Login Successfull');
          this.router.navigate(['/home']);
        }
        else{
          alert('Sorry, This area is for ADMIN only. Redirecting to user Login Page......');
          this.router.navigate(['/user-access/login']);
        }
      }
    })

  }

}
