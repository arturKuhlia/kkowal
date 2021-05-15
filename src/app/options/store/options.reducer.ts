import { optionsInitialState, OptionsState } from './options.state';
import { OptionsActions, OptionsActionTypes } from './options.actions';

export function optionsReducer(state = optionsInitialState, action: OptionsActions): OptionsState {
  switch (action.type) {

    case OptionsActionTypes.CUSTOMERS_QUERY: {
      return Object.assign({}, state, {
        isLoading: true,
      });
    }

    case OptionsActionTypes.CUSTOMERS_LOADED: {
      return Object.assign({}, state, {
        options: action.payload.options,
        isLoading: false,
      });
    }

    case OptionsActionTypes.CUSTOMERS_ERROR: {
      return Object.assign({}, state, {
        isLoading: false,
        error: action.payload.error
      });
    }

    default:
      return state;
  }
}
