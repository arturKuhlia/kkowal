import { Material } from '../models/material.model';

export interface MaterialsState {
    materials: Material[] | null;
    isLoading: boolean;
    error: any;
}

export const materialsInitialState: MaterialsState = {
    materials: null,
    isLoading: true,
    error: null
};
