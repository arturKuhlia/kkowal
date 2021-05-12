import { suitesReducer } from './suites.reducer';
import { suitesInitialState } from './suites.state';

describe('Suites Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = suitesReducer(suitesInitialState, action);

      expect(result).toBe(suitesInitialState);
    });
  });
});
