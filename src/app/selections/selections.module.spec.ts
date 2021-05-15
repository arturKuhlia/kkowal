import { SelectionsModule } from './selections.module';

describe('SelectionsModule', () => {
  let selectionsModule: SelectionsModule;

  beforeEach(() => {
    selectionsModule = new SelectionsModule();
  });

  it('should create an instance', () => {
    expect(selectionsModule).toBeTruthy();
  });
});
