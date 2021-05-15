import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { OptionsEffects } from './options.effects';

describe('OptionsEffects', () => {
  let actions$: Observable<any>;
  let effects: OptionsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OptionsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(OptionsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
