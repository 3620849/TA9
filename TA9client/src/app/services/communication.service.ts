import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'; 
import { MessagesDto } from '../models/messsagesDto';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private http:HttpClient) {      
   }
   public init(){
    console.log("RUN!");//ffdfd
    console.log("RUN!");//ffdfd
    console.log("RUN!");//ffdfd
   }
   getRabbitLog(){
     return this.http.get<MessagesDto>(environment.consumer_server+"/messages");
   }
   getClientList(){
    this.http.get(environment.producer_server+"/users")
   }
   sendClientInfo(payload){
     this.http.post(environment.producer_server+"/users",payload)
   }

}
