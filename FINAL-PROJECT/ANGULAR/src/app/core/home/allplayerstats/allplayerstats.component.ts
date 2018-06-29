import { Component, OnInit } from '@angular/core';
import { OthersService } from "src/app/others.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-allplayerstats',
  templateUrl: './allplayerstats.component.html',
  styleUrls: ['./allplayerstats.component.css']
})
export class AllplayerstatsComponent implements OnInit {

  public allPlayersDataArray;
  constructor(private serv : OthersService, private router : Router) { }

  ngOnInit() {
    this.serv.getAllPlayerStats().subscribe(data=>{
      this.allPlayersDataArray = data;
    },err=>{
      alert(err);
      this.router.navigate(['/error']);
    });
  }


}
