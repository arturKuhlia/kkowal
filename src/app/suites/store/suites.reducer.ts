import { suitesInitialState, SuitesState } from './suites.state';
import { SuitesActions, SuitesActionTypes } from './suites.actions';

export function suitesReducer(state = suitesInitialState, action: SuitesActions): SuitesState {
  switch (action.type) {

    case SuitesActionTypes.CUSTOMERS_QUERY: {
      return Object.assign({}, state, {
        isLoading: true,
      });
    }

    case SuitesActionTypes.CUSTOMERS_LOADED: {
      return Object.assign({}, state, {
        suites: action.payload.suites,
        isLoading: false,
      });
    }

    case SuitesActionTypes.CUSTOMERS_ERROR: {
      return Object.assign({}, state, {
        isLoading: false,
        error: action.payload.error
      });
    }

    default:
      return state;
  }
}
