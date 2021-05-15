import {
  ActionReducerMap,
  MetaReducer,
  ActionReducer,
  Action
} from '@ngrx/store';
import * as fromAuth from '../_auth/store/auth.reducer';
import * as fromAdmin from '../_admin/store/admin.reducer';
import { AuthState } from '../_auth/store/auth.state';
import { AdminState } from '../_admin/store/admin.state';

export interface AppState {
  auth: AuthState;
  admin: AdminState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  admin: fromAdmin.adminReducer
};

export function clearState(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function(state: AppState | undefined, action: Action): AppState {
    if (action.type === '[Auth] LOGOUT completed') {
      state = undefined;
    }
    return reducer(state, action);
  };
}


export const metaReducers: MetaReducer<AppState>[] = [clearState];
