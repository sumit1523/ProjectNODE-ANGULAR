import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import { UserComponent } from './user.component';
import { UserloginComponent } from "src/app/user/userlogin/userlogin.component";
import { UserRegistrationComponent } from "src/app/user/user-registration/user-registration.component";
import { UserdeactivationComponent } from "src/app/user/userdeactivation/userdeactivation.component";
import { ProfileComponent } from "src/app/user/profile/profile.component";

const userRoutes: Routes = [
    { path: '', component: UserComponent, children: [
      {path : 'login' , component: UserloginComponent},
      {path : 'profile/:userid' , component: ProfileComponent},
      {path : 'deactivate' , component: UserdeactivationComponent},
      {path : "u/:name/email/:email", component :UserloginComponent},
      {path : 'register' , component: UserRegistrationComponent},
      {path : '**' , redirectTo: 'login'}
      ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(userRoutes)
      ],
      exports: [RouterModule]
})

export class UserRoutingModule { }
