import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "src/app/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  
  constructor(private auth : AuthenticationService, private router: Router) { }
  public msg='';
  afterSubmit(event){  
    const errors = [];
    event.preventDefault();
    var username = event.target.querySelector('#username').value;
    var email = event.target.querySelector('#email').value;
    var password = event.target.querySelector('#psw').value;
    var repassword = event.target.querySelector('#psw-repeat').value;
    var phoneno = event.target.querySelector('#phoneno').value;
    var address = event.target.querySelector('#address').value;

    if(repassword != password){
      errors.push("Passwords do not Match");
      alert("Passwords didn't match");
    }

    if(errors.length === 0) {
      this.auth.registerUser(username, email, password, phoneno, address).subscribe(data => {
        console.log(data);
        if(data==='success')
          {
            alert('Registration Successful. Please Login To Continue');
            this.router.navigate(['user-access/login'])
          }
        
      },err=>{
        alert(err.error); 
        this.router.navigate(['error']);
      })
    }
  }

  ngOnInit() {
  }

}
