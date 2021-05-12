import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SuitesState } from './suites.state';

export const getSuitesState = createFeatureSelector<SuitesState>('suites');

export const getSuites = createSelector(
  getSuitesState,
  suites => suites.suites
);

export const getIsLoading = createSelector(
  getSuitesState,
  suites => suites.isLoading
);

export const getError = createSelector(
  getSuitesState,
  suites => suites.error
);
