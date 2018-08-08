import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '../../../../node_modules/@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  declarations: []
})
export class SharedModule {}
