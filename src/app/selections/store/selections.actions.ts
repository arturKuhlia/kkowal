import { Action } from '@ngrx/store';
import { Selection } from '../models/selection.model';

export enum SelectionsActionTypes {
  CUSTOMERS_QUERY = '[Selections] Query',
  CUSTOMERS_LOADED = '[Selections] Fetched',

  CUSTOMERS_ADDED = '[Selections] Added',
  CUSTOMERS_EDITED = '[Selections] Edited',
  CUSTOMERS_DELETED = '[Selections] Deleted',

  CUSTOMERS_ERROR = '[Selections] Error'
}

export class SelectionsQuery implements Action {
  readonly type = SelectionsActionTypes.CUSTOMERS_QUERY;
}

export class SelectionsLoaded implements Action {
  readonly type = SelectionsActionTypes.CUSTOMERS_LOADED;

  constructor(public payload: { selections: Selection[] }) {}
}

export class SelectionsAdded implements Action {
  readonly type = SelectionsActionTypes.CUSTOMERS_ADDED;

  constructor(public payload: { selection: Selection }) {}
}

export class SelectionsEdited implements Action {
  readonly type = SelectionsActionTypes.CUSTOMERS_EDITED;

  constructor(public payload: { selection: Selection }) {}
}

export class SelectionsDeleted implements Action {
  readonly type = SelectionsActionTypes.CUSTOMERS_DELETED;

  constructor(public payload: { selection: Selection }) {}
}

export class SelectionsError implements Action {
  readonly type = SelectionsActionTypes.CUSTOMERS_ERROR;

  constructor(public payload: { error: any }) {}
}

export type SelectionsActions =
  | SelectionsQuery
  | SelectionsLoaded
  | SelectionsAdded
  | SelectionsEdited
  | SelectionsDeleted
  | SelectionsError;
