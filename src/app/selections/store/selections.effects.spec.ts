import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SelectionsEffects } from './selections.effects';

describe('SelectionsEffects', () => {
  let actions$: Observable<any>;
  let effects: SelectionsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SelectionsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(SelectionsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
