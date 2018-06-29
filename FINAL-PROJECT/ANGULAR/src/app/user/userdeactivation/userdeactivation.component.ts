import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "src/app/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-userdeactivation',
  templateUrl: './userdeactivation.component.html',
  styleUrls: ['./userdeactivation.component.css']
})
export class UserdeactivationComponent implements OnInit {

  constructor(private auth : AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  afterSubmit(event){
    event.preventDefault();
    var loginid = event.target.querySelector('#loginid').value;
    var password = event.target.querySelector('#password').value;

    this.auth.userDeactivation(loginid,password).subscribe(data=>{
      // if(data.message==='No account Found')
      //   alert("No Account Found.You are not a Registered User");
      // if(data.message === 'wrongPassword')
      //   alert("Password didn't match");
      if(data === 'success'){
        alert("Account Deactivated Successfully");
        this.router.navigate(['/home']);
      }
    },err=>{
      alert(err.error)
    })
  }

}
