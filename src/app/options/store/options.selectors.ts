import { createSelector, createFeatureSelector } from '@ngrx/store';
import { OptionsState } from './options.state';

export const getOptionsState = createFeatureSelector<OptionsState>('options');

export const getOptions = createSelector(
  getOptionsState,
  options => options.options
);

export const getIsLoading = createSelector(
  getOptionsState,
  options => options.isLoading
);

export const getError = createSelector(
  getOptionsState,
  options => options.error
);
