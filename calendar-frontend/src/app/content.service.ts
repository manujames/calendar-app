import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  api = "http://localhost:5000";
  constructor(private http:HttpClient) { }

  getEvents(){
    return this.http.get(`${this.api}/events`);
  }

  addEvent(event:any){
    return this.http.post<any>(`${this.api}/events`,event);
  }
}
