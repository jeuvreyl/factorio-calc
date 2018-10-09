import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '../../../../node_modules/@angular/forms';
import { TooltipDirective } from './tooltip.directive';
import { IconComponent } from './icon/icon.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatGridListModule,
    MatListModule,
    MatInputModule,
    MatPaginatorModule,
    OverlayModule,
    BrowserAnimationsModule
  ],
  declarations: [
    TooltipDirective,
    IconComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatGridListModule,
    MatListModule,
    MatInputModule,
    MatPaginatorModule,
    OverlayModule,
    BrowserAnimationsModule,
    TooltipDirective,
    IconComponent
  ]
})
export class SharedModule {}
