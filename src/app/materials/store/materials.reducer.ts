import { materialsInitialState, MaterialsState } from './materials.state';
import { MaterialsActions, MaterialsActionTypes } from './materials.actions';

export function materialsReducer(state = materialsInitialState, action: MaterialsActions): MaterialsState {
  switch (action.type) {

    case MaterialsActionTypes.MATERIALS_QUERY: {
      return Object.assign({}, state, {
        isLoading: true,
      });
    }

    case MaterialsActionTypes.MATERIALS_LOADED: {
      return Object.assign({}, state, {
        materials: action.payload.materials,
        isLoading: false,
      });
    }

    case MaterialsActionTypes.MATERIALS_ERROR: {
      return Object.assign({}, state, {
        isLoading: false,
        error: action.payload.error
      });
    }

    default:
      return state;
  }
}
