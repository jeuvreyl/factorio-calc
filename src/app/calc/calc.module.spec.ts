import { CalcModule } from './calc.module';

describe('CalcModule', () => {
  let calcModule: CalcModule;

  beforeEach(() => {
    calcModule = new CalcModule();
  });

  it('should create an instance', () => {
    expect(calcModule).toBeTruthy();
  });
});
