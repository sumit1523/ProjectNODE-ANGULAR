import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  PreloadAllModules
} from '@angular/router';

import { CoreComponent } from './core.component';
import { LoginComponent } from './login/login.component';

const coreRoutes: Routes = [
    {path: '', component: CoreComponent, children: [
        { path: 'login', component: LoginComponent },
        { path : '**', redirectTo: 'login' }
    ]}
];

@NgModule({
    imports: [
        RouterModule.forChild(coreRoutes)
      ],
      exports: [RouterModule]
})

export class CoreRoutingModule { }
