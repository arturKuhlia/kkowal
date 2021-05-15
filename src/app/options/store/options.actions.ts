import { Action } from '@ngrx/store';
import { Option } from '../models/option.model';

export enum OptionsActionTypes {
  CUSTOMERS_QUERY = '[Options] Query',
  CUSTOMERS_LOADED = '[Options] Fetched',

  CUSTOMERS_ADDED = '[Options] Added',
  CUSTOMERS_EDITED = '[Options] Edited',
  CUSTOMERS_DELETED = '[Options] Deleted',

  CUSTOMERS_ERROR = '[Options] Error'
}

export class OptionsQuery implements Action {
  readonly type = OptionsActionTypes.CUSTOMERS_QUERY;
}

export class OptionsLoaded implements Action {
  readonly type = OptionsActionTypes.CUSTOMERS_LOADED;

  constructor(public payload: { options: Option[] }) {}
}

export class OptionsAdded implements Action {
  readonly type = OptionsActionTypes.CUSTOMERS_ADDED;

  constructor(public payload: { option: Option }) {}
}

export class OptionsEdited implements Action {
  readonly type = OptionsActionTypes.CUSTOMERS_EDITED;

  constructor(public payload: { option: Option }) {}
}

export class OptionsDeleted implements Action {
  readonly type = OptionsActionTypes.CUSTOMERS_DELETED;

  constructor(public payload: { option: Option }) {}
}

export class OptionsError implements Action {
  readonly type = OptionsActionTypes.CUSTOMERS_ERROR;

  constructor(public payload: { error: any }) {}
}

export type OptionsActions =
  | OptionsQuery
  | OptionsLoaded
  | OptionsAdded
  | OptionsEdited
  | OptionsDeleted
  | OptionsError;
