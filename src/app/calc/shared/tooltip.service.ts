import { Injectable, Injector } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { RecipeComponent, TOOLTIP_DATA } from '../recipe/recipe.component';
import { Recipe } from './recipe.model';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class TooltipService {
  constructor(private injector: Injector) {}

  openRecipeDetail(overlayRef: OverlayRef, recipe: Recipe, items: { [name: string]: Item }) {
    const injectionTokens = new WeakMap<any, any>([
      [TOOLTIP_DATA, { recipe: recipe, items: items }]
    ]);

    const portalInjector = new PortalInjector(this.injector, injectionTokens);

    const portal = new ComponentPortal(RecipeComponent, null, portalInjector);
    overlayRef.attach(portal);
  }

  closeRecipeDetail(overlayRef: OverlayRef) {
    overlayRef.detach();
  }
}
