import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {

  constructor( private router : Router) { }

  ngOnInit() {
  }

  showDetails(playerid){
    this.router.navigate(['/singleplayer/'+playerid]);
  }
}
