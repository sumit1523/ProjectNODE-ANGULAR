import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminloginComponent } from "src/app/admin/adminlogin/adminlogin.component";

const adminRoutes: Routes = [
  { path: '', component: AdminComponent, children: [
    {path : 'login' , component: AdminloginComponent},
    {path : '**' , redirectTo: 'login'}
    ]
  }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
      ],
      exports: [RouterModule]
})

export class AdminRoutingModule { }
