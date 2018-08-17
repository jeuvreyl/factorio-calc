import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalcComponent } from './calc.component';
import { ItemsComponent } from './items/items.component';
import { PlanComponent } from './plan/plan.component';
import { SharedModule } from './shared/shared.module';
import { ItemService } from './shared/item.service';
import { ItemDialogComponent } from './item-dialog/item-dialog.component';
import { ItemEffects } from './store/item.effects';
import { EffectsModule } from '../../../node_modules/@ngrx/effects';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDialogComponent } from './recipe-dialog/recipe-dialog.component';
import { ItemComponent } from './item/item.component';

@NgModule({
  imports: [
    SharedModule,
    EffectsModule.forFeature([ItemEffects]),
  ],
  declarations: [
    CalcComponent,
    ItemsComponent,
    PlanComponent,
    ItemDialogComponent,
    RecipesComponent,
    RecipeDialogComponent,
    ItemComponent
  ],
  entryComponents: [
    ItemDialogComponent
  ],
  providers: [
    ItemService
  ],
  exports: [CalcComponent]
})
export class CalcModule {}
