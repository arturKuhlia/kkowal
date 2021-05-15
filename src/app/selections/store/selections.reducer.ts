import { selectionsInitialState, SelectionsState } from './selections.state';
import { SelectionsActions, SelectionsActionTypes } from './selections.actions';

export function selectionsReducer(state = selectionsInitialState, action: SelectionsActions): SelectionsState {
  switch (action.type) {

    case SelectionsActionTypes.CUSTOMERS_QUERY: {
      return Object.assign({}, state, {
        isLoading: true,
      });
    }

    case SelectionsActionTypes.CUSTOMERS_LOADED: {
      return Object.assign({}, state, {
        selections: action.payload.selections,
        isLoading: false,
      });
    }

    case SelectionsActionTypes.CUSTOMERS_ERROR: {
      return Object.assign({}, state, {
        isLoading: false,
        error: action.payload.error
      });
    }

    default:
      return state;
  }
}
