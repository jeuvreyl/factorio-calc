import { NgModule } from '@angular/core';
import { CalcComponent } from './calc.component';
import { ItemsComponent } from './items/items.component';
import { SharedModule } from './shared/shared.module';
import { ItemService } from './shared/item.service';
import { ItemDialogComponent } from './item-dialog/item-dialog.component';
import { ItemEffects } from './store/item.effects';
import { EffectsModule } from '../../../node_modules/@ngrx/effects';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDialogComponent } from './recipe-dialog/recipe-dialog.component';
import { RecipeComponent } from './recipe/recipe.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { ResultsComponent } from './results/results.component';

@NgModule({
  imports: [SharedModule, EffectsModule.forFeature([ItemEffects])],
  declarations: [
    CalcComponent,
    IngredientsComponent,
    ItemsComponent,
    ItemDialogComponent,
    RecipeComponent,
    RecipesComponent,
    RecipeDialogComponent,
    ResultsComponent
  ],
  entryComponents: [
    ItemDialogComponent,
    RecipeDialogComponent,
    RecipeComponent
  ],
  providers: [ItemService],
  exports: [CalcComponent]
})
export class CalcModule {}
