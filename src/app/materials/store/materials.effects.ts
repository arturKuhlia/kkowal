import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { MaterialsService } from '../services/materials.service';
import { MaterialsActionTypes } from './materials.actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Material } from '../models/material.model';

import * as fromMaterials from './materials.actions';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers/index';
import { getUser } from '../../auth/store/auth.selectors';

@Injectable()
export class MaterialsEffects {

  constructor(private actions$: Actions, private materialsService: MaterialsService, private store: Store<AppState>) {}

  @Effect()
  query$ = this.actions$.pipe(
    ofType(MaterialsActionTypes.MATERIALS_QUERY),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([, user]: any) => this.materialsService.get(user.uid)
      .pipe(
        map((data: any) => {
          const materialsData: Material[] = data.map((res: any) => {
            const key = res.payload.key;
            const material: Material = res.payload.val();
            return {
              key: key,
              id: material.id,
        name: material.name,
        type: material.type,
        price: material.price,
        cost: material.cost,
        options: material.options,
        active: material.active,
        note: material.note,
        required:material.required,
        option:material.option

            };
          });
          return (new fromMaterials.MaterialsLoaded({ materials: materialsData }));
        }),
        catchError(error => {
          return of(new fromMaterials.MaterialsError({ error }));
        })
      )
    ),
  );

  @Effect({ dispatch: false })
  added$ = this.actions$.pipe(
    ofType(MaterialsActionTypes.MATERIALS_ADDED),
    map((action: fromMaterials.MaterialsAdded) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.materialsService.add(payload.material, user.uid))
  );

  @Effect({ dispatch: false })
  edit$ = this.actions$.pipe(
    ofType(MaterialsActionTypes.MATERIALS_EDITED),
    map((action: fromMaterials.MaterialsEdited) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.materialsService.update(payload.material, user.uid)
    .pipe(
      catchError( error => {
      return of(new fromMaterials.MaterialsError({ error }));
    }))
    )
  );

  @Effect({ dispatch: false })
  delete$ = this.actions$.pipe(
    ofType(MaterialsActionTypes.MATERIALS_DELETED),
    map((action: fromMaterials.MaterialsDeleted) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.materialsService.delete(payload.material, user.uid))
  );
}
