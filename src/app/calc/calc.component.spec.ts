import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcComponent } from './calc.component';
import { ItemsComponent } from './items/items.component';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from '../reducers';

describe('CalcComponent', () => {
  let component: CalcComponent;
  let fixture: ComponentFixture<CalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalcComponent, ItemsComponent],
      imports: [SharedModule, StoreModule.forRoot(reducers, { metaReducers })]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
