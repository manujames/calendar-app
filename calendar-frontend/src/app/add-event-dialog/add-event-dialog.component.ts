import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  date: '';
  time: '';
}

@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.css'],
})
export class AddEventDialogComponent implements OnInit {
  event = {
    title: '',
    date: this.data.date,
    time: this.data.time,
  };

  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  addEvent(form: any) {
    if (form.valid) {
      this.dialogRef.close({ event: 'add' });

      // this.content.deleteUser(id).subscribe(
      //   (data) => {
      //     this.snackBar.open('Deleted user!', '', { duration: 3000 });
      //     this.dialogRef.close({ event: 'delete' });
      //   },
      //   (error) => {
      //     if (error.status == 404) {
      //       this.snackBar.open(error.statusText, '', { duration: 3000 });
      //       this.dialogRef.close({ event: '404' });
      //     } else {
      //       this.snackBar.open('Sorry, Something went wrong.', '', {
      //         duration: 3000,
      //       });
      //       this.dialogRef.close({ event: 'error' });
      //     }
      //   }
      // );
    }
  }
}
