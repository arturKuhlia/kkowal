import { Action } from '@ngrx/store';
import { Suite } from '../models/suite.model';

export enum SuitesActionTypes {
  CUSTOMERS_QUERY = '[Suites] Query',
  CUSTOMERS_LOADED = '[Suites] Fetched',

  CUSTOMERS_ADDED = '[Suites] Added',
  CUSTOMERS_EDITED = '[Suites] Edited',
  CUSTOMERS_DELETED = '[Suites] Deleted',

  CUSTOMERS_ERROR = '[Suites] Error'
}

export class SuitesQuery implements Action {
  readonly type = SuitesActionTypes.CUSTOMERS_QUERY;
}

export class SuitesLoaded implements Action {
  readonly type = SuitesActionTypes.CUSTOMERS_LOADED;

  constructor(public payload: { suites: Suite[] }) {}
}

export class SuitesAdded implements Action {
  readonly type = SuitesActionTypes.CUSTOMERS_ADDED;

  constructor(public payload: { suite: Suite }) {}
}

export class SuitesEdited implements Action {
  readonly type = SuitesActionTypes.CUSTOMERS_EDITED;

  constructor(public payload: { suite: Suite }) {}
}

export class SuitesDeleted implements Action {
  readonly type = SuitesActionTypes.CUSTOMERS_DELETED;

  constructor(public payload: { suite: Suite }) {}
}

export class SuitesError implements Action {
  readonly type = SuitesActionTypes.CUSTOMERS_ERROR;

  constructor(public payload: { error: any }) {}
}

export type SuitesActions =
  | SuitesQuery
  | SuitesLoaded
  | SuitesAdded
  | SuitesEdited
  | SuitesDeleted
  | SuitesError;
