import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Route } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { SessionService } from "src/app/session.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router : ActivatedRoute,private route : Router ,private sessionService : SessionService) { }


  ngOnInit() {
  }

}
