import { SuitesModule } from './suites.module';

describe('SuitesModule', () => {
  let suitesModule: SuitesModule;

  beforeEach(() => {
    suitesModule = new SuitesModule();
  });

  it('should create an instance', () => {
    expect(suitesModule).toBeTruthy();
  });
});
