import { Suite } from '../models/suite.model';

export interface SuitesState {
    suites: Suite[] | null;
    isLoading: boolean;
    error: any;
}

export const suitesInitialState: SuitesState = {
    suites: null,
    isLoading: true,
    error: null
};
