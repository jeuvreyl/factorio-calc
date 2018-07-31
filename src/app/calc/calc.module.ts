import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalcComponent } from './calc.component';
import { ItemsComponent } from './items/items.component';
import { PlanComponent } from './plan/plan.component';
import { SharedModule } from './shared/shared.module';
import { ItemService } from './shared/item.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    CalcComponent,
    ItemsComponent,
    PlanComponent
  ],
  providers: [
    ItemService
  ],
  exports: [CalcComponent]
})
export class CalcModule {}
