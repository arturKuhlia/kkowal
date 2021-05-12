import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MaterialsState } from './materials.state';

export const getMaterialsState = createFeatureSelector<MaterialsState>('materials');

export const getMaterials = createSelector(
  getMaterialsState,
  materials => materials.materials
);

export const getIsLoading = createSelector(
  getMaterialsState,
  materials => materials.isLoading
);

export const getError = createSelector(
  getMaterialsState,
  materials => materials.error
);
