import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SuitesEffects } from './suites.effects';

describe('SuitesEffects', () => {
  let actions$: Observable<any>;
  let effects: SuitesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SuitesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(SuitesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
