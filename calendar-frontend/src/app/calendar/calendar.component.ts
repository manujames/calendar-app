import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { AddEventDialogComponent } from '../add-event-dialog/add-event-dialog.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  setView(view: CalendarView) {
    this.view = view;
  }

  addEvent(datetime: any) {
    // yyyy-MM-dd format
    let date = `${datetime.getFullYear()}` + 
      `-${('0' + (datetime.getMonth() + 1)).slice(-2)}` +
      `-${('0' + datetime.getDate()).slice(-2)}`;
    
    // hh:mm format
    let time = `${('0' + datetime.getHours()).slice(-2)}:${('0' + datetime.getMinutes()).slice(-2)}`

    const dialogRef = this.dialog.open(AddEventDialogComponent, {
      data: { 
        date: date,
        time: time
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data.event == 'add' || data.event == '404') {
        this.loadEvents();
      }
    });
  }

  loadEvents() {

  }

  events: CalendarEvent[] = [];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadEvents();
  }
}
