import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssemblingMachineComponent } from './assembling-machine.component';

describe('AssemblingMachineComponent', () => {
  let component: AssemblingMachineComponent;
  let fixture: ComponentFixture<AssemblingMachineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssemblingMachineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssemblingMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
