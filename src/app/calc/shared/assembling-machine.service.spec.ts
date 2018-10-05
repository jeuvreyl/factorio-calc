import { TestBed, inject } from '@angular/core/testing';

import { AssemblingMachineService } from './assembling-machine.service';

describe('AssemblingMachineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssemblingMachineService]
    });
  });

  it('should be created', inject([AssemblingMachineService], (service: AssemblingMachineService) => {
    expect(service).toBeTruthy();
  }));
});
