import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { startOfDay, endOfDay, isFuture, isPast, isToday } from 'date-fns';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  todaysEvents: any = [];
  pastEvents: any = {};
  futureEvents: any = {};
  constructor(private content: ContentService, private snackBar:MatSnackBar) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.pastEvents = {};
    this.futureEvents = {};
    this.content.getEvents().subscribe((receivedEvents: any) => {
      this.todaysEvents = receivedEvents.filter((e: any) => {
        let eventDate = startOfDay(new Date(e.date)); //Starting time of the event date 00:00
        return isToday(eventDate);
      });
      this.todaysEvents.reverse();

      receivedEvents.map((e: any) => {
        let eventDate = endOfDay(new Date(e.date)); //Ending time of the event date 23:59
        if (isPast(eventDate)) {
          if (this.pastEvents[e.date]) {
            this.pastEvents[e.date].push(e);
          } else {
            this.pastEvents[e.date] = [e];
          }
        }
      });

      receivedEvents.filter((e: any) => {
        let eventDate = startOfDay(new Date(e.date)); //Starting time of the event date 00:00
        if (isFuture(eventDate)) {
          if (this.futureEvents[e.date]) {
            this.futureEvents[e.date].push(e);
          } else {
            this.futureEvents[e.date] = [e];
          }
        }
      });
    });
  }

  deleteEvent(id:any){
    this.content.deleteEvent(id)
    .subscribe(
      data=>{
        this.snackBar.open("Deleted user!",'',{duration:3000});
        this.loadEvents();
      },
      error=>{
        if(error.status == 404){
          this.snackBar.open("Event not found",'',{duration:3000});
          this.loadEvents();
        }
        else{
          this.snackBar.open('Sorry, Something went wrong.','',{duration:3000});
        }
      }
    )
  }

  trackByIndex(index: any, item: any) {
    return index;
  }
}
