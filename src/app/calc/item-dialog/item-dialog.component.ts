import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '../../../../node_modules/@angular/material/dialog';

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.css']
})
export class ItemDialogComponent implements OnInit {
  quantity: number;

  constructor(private dialogRef: MatDialogRef<ItemDialogComponent>) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
