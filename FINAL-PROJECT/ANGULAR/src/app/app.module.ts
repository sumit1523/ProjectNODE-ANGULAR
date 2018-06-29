import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { HomeComponent } from './core/home/home.component';
import { TestimonialComponent } from './core/home/testimonial/testimonial.component';
import { CoreModule } from "./core/core/core.module";
import { UserModule } from "./user/user.module";
import { AdminModule } from "./admin/admin.module";
import { AuthenticationService } from "./authentication.service";
import { SinglePlayerComponent } from './core/home/single-player/single-player.component';
import { SessionService } from "src/app/session.service";
import { OthersService } from "src/app/others.service";
import { AllplayerstatsComponent } from './core/home/allplayerstats/allplayerstats.component';
import { VideoComponent } from './core/home/video/video.component';
import { ChatboxComponent } from './core/home/chatbox/chatbox.component';
import { ShoppingModule } from "src/app/shopping/shopping.module";
import { ShoppingService } from "src/app/shopping.service";
import { ErrorpagesComponent } from './errorpages/errorpages.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TestimonialComponent,
    SinglePlayerComponent,
    AllplayerstatsComponent,
    VideoComponent,
    ChatboxComponent,
    ErrorpagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    UserModule,
    ShoppingModule,
    CarouselModule.forRoot()
  ],
  providers: [
    AuthenticationService,
    SessionService,
    OthersService,
    ShoppingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
