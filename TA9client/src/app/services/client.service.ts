import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { 

  }
  getCurrentclientInfo(){
    let client = new Client();
    client.timeZone=this.getTimeZone(); 
    let width=window.screen.width * window.devicePixelRatio;
    let height=window.screen.height * window.devicePixelRatio;
    client.screenResolution=width+"x"+height;
    this.getClientIp().subscribe(res=>{client.ip=res['ip']});
  }
  getTimeZone() {
    let offset = new Date().getTimezoneOffset();
    let o = Math.abs(offset);               
    return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
  }
  
  getClientIp(){
    return this.http.get("http://api.ipify.org/?format=json")
  }
  
}
