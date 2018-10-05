import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssemblingMachineDialogComponent } from './assembling-machine-dialog.component';

describe('AssemblingMachineDialogComponent', () => {
  let component: AssemblingMachineDialogComponent;
  let fixture: ComponentFixture<AssemblingMachineDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssemblingMachineDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssemblingMachineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
