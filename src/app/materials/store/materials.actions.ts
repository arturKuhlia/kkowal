import { Action } from '@ngrx/store';
import { Material } from '../models/material.model';

export enum MaterialsActionTypes {
  MATERIALS_QUERY = '[Materials] Query',
  MATERIALS_LOADED = '[Materials] Fetched',

  MATERIALS_ADDED = '[Materials] Added',
  MATERIALS_EDITED = '[Materials] Edited',
  MATERIALS_DELETED = '[Materials] Deleted',

  MATERIALS_ERROR = '[Materials] Error'
}

export class MaterialsQuery implements Action {
  readonly type = MaterialsActionTypes.MATERIALS_QUERY;
}

export class MaterialsLoaded implements Action {
  readonly type = MaterialsActionTypes.MATERIALS_LOADED;

  constructor(public payload: { materials: Material[] }) {}
}

export class MaterialsAdded implements Action {
  readonly type = MaterialsActionTypes.MATERIALS_ADDED;

  constructor(public payload: { material: Material }) {}
}

export class MaterialsEdited implements Action {
  readonly type = MaterialsActionTypes.MATERIALS_EDITED;

  constructor(public payload: { material: Material }) {}
}

export class MaterialsDeleted implements Action {
  readonly type = MaterialsActionTypes.MATERIALS_DELETED;

  constructor(public payload: { material: Material }) {}
}

export class MaterialsError implements Action {
  readonly type = MaterialsActionTypes.MATERIALS_ERROR;

  constructor(public payload: { error: any }) {}
}

export type MaterialsActions =
  | MaterialsQuery
  | MaterialsLoaded
  | MaterialsAdded
  | MaterialsEdited
  | MaterialsDeleted
  | MaterialsError;
