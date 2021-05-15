import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SelectionsService } from '../services/selections.service';
import { SelectionsActionTypes } from './selections.actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Selection } from '../models/selection.model';

import * as fromSelections from './selections.actions';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers/index';
import { getUser } from '../../_auth/store/auth.selectors';

@Injectable()
export class SelectionsEffects {

  constructor(private actions$: Actions, private selectionsService: SelectionsService, private store: Store<AppState>) {}

  @Effect()
  query$ = this.actions$.pipe(
    ofType(SelectionsActionTypes.CUSTOMERS_QUERY),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([, user]: any) => this.selectionsService.get(user.uid)
      .pipe(
        map((data: any) => {
          const selectionsData: Selection[] = data.map((res: any) => {
            const key = res.payload.key;
            const selection: Selection = res.payload.val();
            return {
              key: key,
              id: selection.id,
              name: selection.name,
              type: selection.type,
              size: selection.size,
              area: selection.area,
              clients: selection.clients,
              active: selection.active,
              note: selection.note,
               categories:selection.categories
            };
          });
          return (new fromSelections.SelectionsLoaded({ selections: selectionsData }));
        }),
        catchError(error => {
          return of(new fromSelections.SelectionsError({ error }));
        })
      )
    ),
  );

  @Effect({ dispatch: false })
  added$ = this.actions$.pipe(
    ofType(SelectionsActionTypes.CUSTOMERS_ADDED),
    map((action: fromSelections.SelectionsAdded) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.selectionsService.add(payload.selection, user.uid))
  );

  @Effect({ dispatch: false })
  edit$ = this.actions$.pipe(
    ofType(SelectionsActionTypes.CUSTOMERS_EDITED),
    map((action: fromSelections.SelectionsEdited) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.selectionsService.update(payload.selection, user.uid)
    .pipe(
      catchError( error => {
      return of(new fromSelections.SelectionsError({ error }));
    }))
    )
  );

  @Effect({ dispatch: false })
  delete$ = this.actions$.pipe(
    ofType(SelectionsActionTypes.CUSTOMERS_DELETED),
    map((action: fromSelections.SelectionsDeleted) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.selectionsService.delete(payload.selection, user.uid))
  );
}
