import { Selection } from '../models/selection.model';

export interface SelectionsState {
    selections: Selection[] | null;
    isLoading: boolean;
    error: any;
}

export const selectionsInitialState: SelectionsState = {
    selections: null,
    isLoading: true,
    error: null
};
