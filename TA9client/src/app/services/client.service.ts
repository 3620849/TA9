import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Client } from '../models/client';
import { UUID } from 'angular2-uuid';
import { LocalStorageService } from 'ngx-webstorage';
import { Status } from '../models/status';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  client:Client;

  constructor(private http:HttpClient,private storage: LocalStorageService) {
  }
  getCurrentClient():Client{
    if(this.client==undefined){
      this.client = new Client();
      this.client.clientLocalTime=new Date().getTime();
      this.client.timeZone=this.getTimeZone(); 
      let width=window.screen.width * window.devicePixelRatio;
      let height=window.screen.height * window.devicePixelRatio;
      this.client.screenResolution=width+"x"+height;
      this.client.clientId= this.getClientId();
      this.client.status=Status.ONLINE;
    }    
    return this.client;
  }
  updateIp(ip){
    this.client.ip=ip;
  }
  getTimeZone() {
    let offset = new Date().getTimezoneOffset();
    let o = Math.abs(offset);               
    return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
  }
   

  getClientId(){
    let clientId=this.storage.retrieve("clientId");
    if(clientId==null){
      clientId=  UUID.UUID();
      this.storage.store("clientId",clientId);
    }
    return clientId;
  }
  
}
