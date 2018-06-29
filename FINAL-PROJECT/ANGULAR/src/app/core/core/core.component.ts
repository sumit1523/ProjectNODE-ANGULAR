import { Component, OnInit } from '@angular/core';

import { SessionService } from '../../session.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css'],
  providers: [SessionService]
})
export class CoreComponent implements OnInit {

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
     this.sessionService.setValueToSession('isLoggedIn', false);
  }

}
