import { materialsReducer } from './materials.reducer';
import { materialsInitialState } from './materials.state';

describe('Materials Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = materialsReducer(materialsInitialState, action);

      expect(result).toBe(materialsInitialState);
    });
  });
});
