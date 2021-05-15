import { Option } from '../models/option.model';

export interface OptionsState {
    options: Option[] | null;
    isLoading: boolean;
    error: any;
}

export const optionsInitialState: OptionsState = {
    options: null,
    isLoading: true,
    error: null
};
