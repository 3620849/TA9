import { Component, OnInit } from '@angular/core';
import { Client } from '../models/client';
import { ClientService } from '../services/client.service';
import { CommunicationService } from '../services/communication.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  panelOpenState=true;
  client:Client
  constructor(private clientSrv:ClientService,private cs:CommunicationService) {
    
   }

  ngOnInit(): void {
    this.cs.startKeepAlive();
    this.client=this.clientSrv.getCurrentClient();
  }


}
