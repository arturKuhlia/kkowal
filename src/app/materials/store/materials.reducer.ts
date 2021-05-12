import { materialsInitialState, MaterialsState } from './materials.state';
import { MaterialsActions, MaterialsActionTypes } from './materials.actions';

export function materialsReducer(state = materialsInitialState, action: MaterialsActions): MaterialsState {
  switch (action.type) {

    case MaterialsActionTypes.CUSTOMERS_QUERY: {
      return Object.assign({}, state, {
        isLoading: true,
      });
    }

    case MaterialsActionTypes.CUSTOMERS_LOADED: {
      return Object.assign({}, state, {
        materials: action.payload.materials,
        isLoading: false,
      });
    }

    case MaterialsActionTypes.CUSTOMERS_ERROR: {
      return Object.assign({}, state, {
        isLoading: false,
        error: action.payload.error
      });
    }

    default:
      return state;
  }
}
