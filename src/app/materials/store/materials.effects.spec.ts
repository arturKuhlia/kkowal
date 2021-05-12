import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MaterialsEffects } from './materials.effects';

describe('MaterialsEffects', () => {
  let actions$: Observable<any>;
  let effects: MaterialsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MaterialsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(MaterialsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
