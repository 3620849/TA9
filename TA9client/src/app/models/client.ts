import { Status } from "./status";

export class Client{
    clientId:string;
    updateTime:number;
    ip:string;
    agent:string;
    screenResolution:string;
    clientLocalTime:number;
    timeZone:string;
    status:Status;
}