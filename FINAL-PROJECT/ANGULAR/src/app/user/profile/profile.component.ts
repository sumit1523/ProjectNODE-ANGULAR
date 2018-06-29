import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "src/app/authentication.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userid;
  public userData;

  constructor(private actrouter : ActivatedRoute, private authService : AuthenticationService) { }

  ngOnInit() {
    this.userid= this.actrouter.snapshot.paramMap.get('userid');
    this.getProfileData(this.userid);
  }

  getProfileData(userid){
    this.authService.getProfileData(userid).subscribe(data=>{
      this.userData = data;
      console.log(this.userData);
    },err=>{
      alert(err);
    })

  }
  changePassword(event)
  {
    event.preventDefault();
    var password = event.target.querySelector('#pass').value;
    var repassword = event.target.querySelector('#repass').value;
    if(password!==repassword){
      alert("password did not match");
    }
    else{
      alert("Functionality Under Maintainance");
    }
  }

}
