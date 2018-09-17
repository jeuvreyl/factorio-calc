import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '../../../../node_modules/@angular/forms';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatGridListModule,
    MatInputModule,
    MatPaginatorModule,
    OverlayModule,
    BrowserAnimationsModule
  ],
  declarations: [
    TooltipDirective
  ],
  exports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatGridListModule,
    MatInputModule,
    MatPaginatorModule,
    OverlayModule,
    BrowserAnimationsModule,
    TooltipDirective,
  ]
})
export class SharedModule {}
