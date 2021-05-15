import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SuitesService } from '../services/suites.service';
import { SuitesActionTypes } from './suites.actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Suite } from '../models/suite.model';

import * as fromSuites from './suites.actions';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers/index';
import { getUser } from '../../_auth/store/auth.selectors';

@Injectable()
export class SuitesEffects {

  constructor(private actions$: Actions, private suitesService: SuitesService, private store: Store<AppState>) {}

  @Effect()
  query$ = this.actions$.pipe(
    ofType(SuitesActionTypes.CUSTOMERS_QUERY),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([, user]: any) => this.suitesService.get(user.uid)
      .pipe(
        map((data: any) => {
          const suitesData: Suite[] = data.map((res: any) => {
            const key = res.payload.key;
            const suite: Suite = res.payload.val();
            return {
              key: key,
              id: suite.id,
              name: suite.name,
              type: suite.type,
              size: suite.size,
              area: suite.area,
              clients: suite.clients,
              active: suite.active,
              note: suite.note,
               categories:suite.categories
            };
          });
          return (new fromSuites.SuitesLoaded({ suites: suitesData }));
        }),
        catchError(error => {
          return of(new fromSuites.SuitesError({ error }));
        })
      )
    ),
  );

  @Effect({ dispatch: false })
  added$ = this.actions$.pipe(
    ofType(SuitesActionTypes.CUSTOMERS_ADDED),
    map((action: fromSuites.SuitesAdded) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.suitesService.add(payload.suite, user.uid))
  );

  @Effect({ dispatch: false })
  edit$ = this.actions$.pipe(
    ofType(SuitesActionTypes.CUSTOMERS_EDITED),
    map((action: fromSuites.SuitesEdited) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.suitesService.update(payload.suite, user.uid)
    .pipe(
      catchError( error => {
      return of(new fromSuites.SuitesError({ error }));
    }))
    )
  );

  @Effect({ dispatch: false })
  delete$ = this.actions$.pipe(
    ofType(SuitesActionTypes.CUSTOMERS_DELETED),
    map((action: fromSuites.SuitesDeleted) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.suitesService.delete(payload.suite, user.uid))
  );
}
