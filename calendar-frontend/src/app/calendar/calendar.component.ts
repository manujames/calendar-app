import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { startOfDay } from 'date-fns';
import { AddEventDialogComponent } from '../add-event-dialog/add-event-dialog.component';
import { ContentService } from '../content.service';

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
    let date =
      `${datetime.getFullYear()}` +
      `-${('0' + (datetime.getMonth() + 1)).slice(-2)}` +
      `-${('0' + datetime.getDate()).slice(-2)}`;

    // hh:mm format
    let time = `${('0' + datetime.getHours()).slice(-2)}:${(
      '0' + datetime.getMinutes()
    ).slice(-2)}`;

    const dialogRef = this.dialog.open(AddEventDialogComponent, {
      data: {
        date: date,
        time: time,
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data && (data.event == 'add' || data.event == '404')) {
        this.loadEvents();
      }
    });
  }

  loadEvents() {
    this.content.getEvents().subscribe((receivedEvents: any) => {
      let eventArray: { start: Date; title: any; }[] = [];
      receivedEvents.map((e: any) => {
        let eventObj = {
          start: new Date(`${e.date}:${e.time}`),
          title: e.title,
        };
        eventArray.push(eventObj);
      });
      this.events = eventArray;
    });
  }

  events: CalendarEvent[] = [];
  //   {
  //     start: startOfDay(new Date()),
  //     title: 'An event with no end date',
  //   },
  // ];

  constructor(private dialog: MatDialog, private content: ContentService) {}

  ngOnInit(): void {
    this.loadEvents();
  }
}
