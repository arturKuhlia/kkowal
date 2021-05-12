import { Action } from '@ngrx/store';
import { Material } from '../models/material.model';

export enum MaterialsActionTypes {
  CUSTOMERS_QUERY = '[Materials] Query',
  CUSTOMERS_LOADED = '[Materials] Fetched',

  CUSTOMERS_ADDED = '[Materials] Added',
  CUSTOMERS_EDITED = '[Materials] Edited',
  CUSTOMERS_DELETED = '[Materials] Deleted',

  CUSTOMERS_ERROR = '[Materials] Error'
}

export class MaterialsQuery implements Action {
  readonly type = MaterialsActionTypes.CUSTOMERS_QUERY;
}

export class MaterialsLoaded implements Action {
  readonly type = MaterialsActionTypes.CUSTOMERS_LOADED;

  constructor(public payload: { materials: Material[] }) {}
}

export class MaterialsAdded implements Action {
  readonly type = MaterialsActionTypes.CUSTOMERS_ADDED;

  constructor(public payload: { material: Material }) {}
}

export class MaterialsEdited implements Action {
  readonly type = MaterialsActionTypes.CUSTOMERS_EDITED;

  constructor(public payload: { material: Material }) {}
}

export class MaterialsDeleted implements Action {
  readonly type = MaterialsActionTypes.CUSTOMERS_DELETED;

  constructor(public payload: { material: Material }) {}
}

export class MaterialsError implements Action {
  readonly type = MaterialsActionTypes.CUSTOMERS_ERROR;

  constructor(public payload: { error: any }) {}
}

export type MaterialsActions =
  | MaterialsQuery
  | MaterialsLoaded
  | MaterialsAdded
  | MaterialsEdited
  | MaterialsDeleted
  | MaterialsError;
