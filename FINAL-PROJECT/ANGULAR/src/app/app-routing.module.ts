import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { SinglePlayerComponent } from "src/app/core/home/single-player/single-player.component";
import { AllplayerstatsComponent } from "src/app/core/home/allplayerstats/allplayerstats.component";
import { VideoComponent } from "src/app/core/home/video/video.component";
import { ErrorpagesComponent } from "src/app/errorpages/errorpages.component";

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  {path: 'singleplayer/:playerid', component: SinglePlayerComponent},
  {path : 'allPlayersStats', component: AllplayerstatsComponent},
  {path : 'videos', component: VideoComponent},
  {path : 'error', component: ErrorpagesComponent},
  
  {
      path: 'login-information',
      loadChildren: './core/core/core.module#CoreModule'
  },
  {
      path: 'admin-access',
      loadChildren: './admin/admin.module#AdminModule'
  },
  {
      path: 'user-access',
      loadChildren: './user/user.module#UserModule'
  },
  {
    path: 'shopping',
    loadChildren: './shopping/shopping.module#ShoppingModule'

  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
      ],
      exports: [RouterModule]
})

export class AppRoutingModule { }
