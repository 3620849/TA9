import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription,interval } from 'rxjs';
import { CommunicationService } from '../services/communication.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class AdminPageComponent implements OnInit,OnDestroy {
  subscriptions: Subscription[]=[] ;
  displayedColumns: string[] = ['ip', 'clientId', 'status'];
  rabbitLog ;
  dataSource;
  interval;
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;
  constructor(private cs:CommunicationService) { }
  
  ngOnDestroy(): void {
    clearInterval(this.interval);
    this.subscriptions.forEach(s=>s.unsubscribe());
  }

  ngOnInit(): void {
    this.cs.stopKeepAlive();
    this.getLog();
    this.getClientData(); 
    this.interval=setInterval(()=>{
      this.getLog();
      this.getClientData();
    },5000);
    
    
  }
  refresh(){
    this.getClientData();
    this.getLog();
  }
  getClientData(){
    this.subscriptions.push(this.cs.getClientList().subscribe(res=>{
      let rows=[];
      res.forEach(element => rows.push(element, { detailRow: true, element }));
      this.dataSource=rows;
    },err=>{
    }));
  }
  getLog(){ 
    this.subscriptions.push(this.cs.getRabbitLog().subscribe(res=>{ 
      if(res.messages){
        let str="";
        res.messages.forEach(s=>{ 
          str=str.concat(s+"\n")});
          this.rabbitLog=str;
      }
    },err=>{}));
  }
} 
