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
    
   }
   
   getRabbitLog(){
     return this.http.get<MessagesDto>(environment.consumer_server+"/messages");
   }
   getClientList(){
    return this.http.get(environment.producer_server+"/clients")
   }
   sendClientInfo(payload){
     return this.http.post(environment.producer_server+"/clients",payload)
   }
}
