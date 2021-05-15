import { OptionsModule } from './options.module';

describe('OptionsModule', () => {
  let optionsModule: OptionsModule;

  beforeEach(() => {
    optionsModule = new OptionsModule();
  });

  it('should create an instance', () => {
    expect(optionsModule).toBeTruthy();
  });
});
