import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';

import { CoreComponent } from './core.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  declarations: [
    CoreComponent,
    LoginComponent
  ],
  entryComponents: [
    LoginComponent
  ]
})
export class CoreModule { }
