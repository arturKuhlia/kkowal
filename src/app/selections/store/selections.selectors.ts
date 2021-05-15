import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SelectionsState } from './selections.state';

export const getSelectionsState = createFeatureSelector<SelectionsState>('selections');

export const getSelections = createSelector(
  getSelectionsState,
  selections => selections.selections
);

export const getIsLoading = createSelector(
  getSelectionsState,
  selections => selections.isLoading
);

export const getError = createSelector(
  getSelectionsState,
  selections => selections.error
);
