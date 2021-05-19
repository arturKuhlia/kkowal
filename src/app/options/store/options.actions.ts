import { Action } from '@ngrx/store';
import { Option } from '../models/option.model';

export enum OptionsActionTypes {
  OPTIONS_QUERY = '[Options] Query',
  OPTIONS_LOADED = '[Options] Fetched',

  OPTIONS_ADDED = '[Options] Added',
  OPTIONS_EDITED = '[Options] Edited',
  OPTIONS_DELETED = '[Options] Deleted',

  OPTIONS_ERROR = '[Options] Error'
}

export class OptionsQuery implements Action {
  readonly type = OptionsActionTypes.OPTIONS_QUERY;
}

export class OptionsLoaded implements Action {
  readonly type = OptionsActionTypes.OPTIONS_LOADED;

  constructor(public payload: { options: Option[] }) {}
}

export class OptionsAdded implements Action {
  readonly type = OptionsActionTypes.OPTIONS_ADDED;

  constructor(public payload: { option: Option }) {}
}

export class OptionsEdited implements Action {
  readonly type = OptionsActionTypes.OPTIONS_EDITED;

  constructor(public payload: { option: Option }) {}
}

export class OptionsDeleted implements Action {
  readonly type = OptionsActionTypes.OPTIONS_DELETED;

  constructor(public payload: { option: Option }) {}
}

export class OptionsError implements Action {
  readonly type = OptionsActionTypes.OPTIONS_ERROR;

  constructor(public payload: { error: any }) {}
}

export type OptionsActions =
  | OptionsQuery
  | OptionsLoaded
  | OptionsAdded
  | OptionsEdited
  | OptionsDeleted
  | OptionsError;
