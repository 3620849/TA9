import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment'; 
import { Client } from '../models/client';
import { MessagesDto } from '../models/messsagesDto';
import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  subscriptions: Subscription[]=[] ;
  private interval;
  private kaInProgress=false;
  constructor(private http:HttpClient, private clientSrv:ClientService) {      
   }  
   //this method runed from app module
   public init(){
    this.startKeepAlive();
   }
   startKeepAlive(){
     if(!this.kaInProgress){
      this.kaInProgress=true;
      let client = this.clientSrv.getCurrentClient();
      this.subscriptions.push(this.getClientIp().subscribe(res=>{
        client.ip=res['ip'];
        this.clientSrv.updateIp(client.ip);
        this.subscriptions.push(this.sendClientInfo(client).subscribe(res=>{
          this.interval=setInterval(()=>{
            this.subscriptions.push(this.keepAlive(client.clientId).subscribe(res=>{},err=>{}));
          },2000);
        },err=>{}));
      })); 
    }
   }
   stopKeepAlive(){
    clearInterval(this.interval);
    this.subscriptions.forEach(s=>s.unsubscribe());
    this.kaInProgress=false;
   }
   keepAlive(clientId){
     return this.http.patch(environment.producer_server+"/clients/"+clientId+"/keepAlive",null);
   }
   getRabbitLog(){
     return this.http.get<MessagesDto>(environment.consumer_server+"/messages");
   }
   getClientList(){
    return this.http.get<Client[]>(environment.producer_server+"/clients")
   }
   sendClientInfo(payload){
     return this.http.post(environment.producer_server+"/clients",payload)
   }
   getClientIp(){
    return this.http.get("http://api.ipify.org/?format=json")
  }

}
