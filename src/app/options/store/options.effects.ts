import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { OptionsService } from '../services/options.service';
import { OptionsActionTypes } from './options.actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Option } from '../models/option.model';

import * as fromOptions from './options.actions';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers/index';
import { getUser } from '../../_auth/store/auth.selectors';

@Injectable()
export class OptionsEffects {

  constructor(private actions$: Actions, private optionsService: OptionsService, private store: Store<AppState>) {}

  @Effect()
  query$ = this.actions$.pipe(
    ofType(OptionsActionTypes.CUSTOMERS_QUERY),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([, user]: any) => this.optionsService.get(user.uid)
      .pipe(
        map((data: any) => {
          const optionsData: Option[] = data.map((res: any) => {
            const key = res.payload.key;
            const option: Option = res.payload.val();
            return {
              key: key,
              id: option.id,
              name: option.name,
              type: option.type,
              size: option.size,
              area: option.area,
              clients: option.clients,
              active: option.active,
              note: option.note,
               categories:option.categories
            };
          });
          return (new fromOptions.OptionsLoaded({ options: optionsData }));
        }),
        catchError(error => {
          return of(new fromOptions.OptionsError({ error }));
        })
      )
    ),
  );

  @Effect({ dispatch: false })
  added$ = this.actions$.pipe(
    ofType(OptionsActionTypes.CUSTOMERS_ADDED),
    map((action: fromOptions.OptionsAdded) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.optionsService.add(payload.option, user.uid))
  );

  @Effect({ dispatch: false })
  edit$ = this.actions$.pipe(
    ofType(OptionsActionTypes.CUSTOMERS_EDITED),
    map((action: fromOptions.OptionsEdited) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.optionsService.update(payload.option, user.uid)
    .pipe(
      catchError( error => {
      return of(new fromOptions.OptionsError({ error }));
    }))
    )
  );

  @Effect({ dispatch: false })
  delete$ = this.actions$.pipe(
    ofType(OptionsActionTypes.CUSTOMERS_DELETED),
    map((action: fromOptions.OptionsDeleted) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.optionsService.delete(payload.option, user.uid))
  );
}
