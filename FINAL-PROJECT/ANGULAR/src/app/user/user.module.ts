import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';

import { UserComponent } from './user.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserdeactivationComponent } from './userdeactivation/userdeactivation.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  declarations: [
    UserComponent, 
    UserloginComponent, 
    UserRegistrationComponent, UserdeactivationComponent, ProfileComponent
  ]

})
export class UserModule { }
