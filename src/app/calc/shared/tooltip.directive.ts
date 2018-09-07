import { Directive, ElementRef, HostListener, Input, InjectionToken } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Recipe } from './recipe.model';
import { TooltipService } from './tooltip.service';
import { Item } from './item.model';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  private overlayRef: OverlayRef;

  @Input()
  recipe: Recipe;

  @Input()
  items: Item[];

  constructor(private elmentRef: ElementRef, private overlay: Overlay, private tooltipService: TooltipService) {
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .connectedTo(
          this.elmentRef,
          { originX: 'start', originY: 'bottom' },
          { overlayX: 'start', overlayY: 'top' }
        )
    });
  }

  @HostListener('mouseenter')
  show() {
    this.tooltipService.openRecipeDetail(this.overlayRef, this.recipe, this.items);
  }

  @HostListener('mouseleave')
  hideOnLeave() {
    this.tooltipService.closeRecipeDetail(this.overlayRef);
  }

  @HostListener('click')
  hideOnClick() {
    this.tooltipService.closeRecipeDetail(this.overlayRef);
  }
}
