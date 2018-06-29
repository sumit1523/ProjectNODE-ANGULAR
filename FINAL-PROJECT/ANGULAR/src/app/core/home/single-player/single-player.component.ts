import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { OthersService } from "src/app/others.service";

@Component({
  selector: 'app-single-player',
  templateUrl: './single-player.component.html',
  styleUrls: ['./single-player.component.css']
})
export class SinglePlayerComponent implements OnInit {

  public playerid;
  public image='';
  public playerDetailsObject;
  constructor(private route : ActivatedRoute, private serv : OthersService, private router : Router) { }

  ngOnInit() {
    this.playerid = this.route.snapshot.params.playerid;
    this.serv.getPlayerById(this.playerid).subscribe(dataObject=>{
      this.playerDetailsObject = dataObject;
    },err=>{
      alert(err);
      this.router.navigate(['/error']);
    });
  }
}
