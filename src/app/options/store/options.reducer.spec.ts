import { optionsReducer } from './options.reducer';
import { optionsInitialState } from './options.state';

describe('Options Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = optionsReducer(optionsInitialState, action);

      expect(result).toBe(optionsInitialState);
    });
  });
});
