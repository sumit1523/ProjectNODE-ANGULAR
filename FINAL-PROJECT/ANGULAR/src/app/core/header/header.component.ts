import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { SessionService } from "src/app/session.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isLogged;
  public user;
  public userid;
  constructor(private router: Router, private sessionservice : SessionService) { 
    this.sessionservice.LoggedInUserDetails.subscribe(data=>{
      this.isLogged = data.isLogged;
      this.user = data.user;
      this.userid = data.userid;
    }) 
  }

  ngOnInit() {
    this.isLogged = this.sessionservice.getValueFromSession("isLoggedIn");
    this.user = this.sessionservice.getValueFromSession("user");
  }

  openCart() {
    alert('Please Login to check cart');
  }

  openLogin() {
    this.router.navigate(['login-information']);
  } 
  logout(){
    this.sessionservice.removeSessionItem("isLoggedIn");
    this.sessionservice.removeSessionItem("_t");
    this.sessionservice.removeSessionItem("user");
    this.sessionservice.removeSessionItem("userID");
    this.isLogged = false;
    this.router.navigate(['/home']);
    alert("Logged out successfully");
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  goTovideos() {
    this.router.navigate(['videos']);

  }

  goToStats() {
    this.router.navigate(['allPlayersStats']);
  }

  goToShopping() {
    this.router.navigate(['shopping/display']);
  }

  goToProfile() {
    var Logged = this.sessionservice.getValueFromSession("isLoggedIn");

    if(Logged){
      var userId = this.sessionservice.getValueFromSession("userID");
      this.router.navigate(['/user-access/profile/'+userId]);
    }
    else
      alert("Please Login to view profile page");
  }

  goToAboutUS() {

  }
}
