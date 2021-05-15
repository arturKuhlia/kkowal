import { selectionsReducer } from './selections.reducer';
import { selectionsInitialState } from './selections.state';

describe('Selections Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = selectionsReducer(selectionsInitialState, action);

      expect(result).toBe(selectionsInitialState);
    });
  });
});
