import { createStore, type StateCreator } from 'zustand';
import type {
    TFiltersProps,
    TFiltersStore,
    TFiltersValuesObj,
} from './helpers';
import { subscribeWithSelector } from 'zustand/middleware';

export const createFiltersStore = ({ initialFiltersValues }: TFiltersProps) => {
    const reducer: StateCreator<TFiltersStore> = (set) => ({
        tmpFilters: initialFiltersValues,
        appliedFilters: initialFiltersValues,

        setTmpFilters(tmpFilters) {
            set((state) => {
                return {
                    tmpFilters: {
                        ...state.tmpFilters,
                        ...tmpFilters,
                    },
                };
            });
        },

        setAppliedFilters(appliedFilters) {
            set((state) => {
                const newFiltersValues: TFiltersValuesObj = {
                    ...state.appliedFilters,
                    ...appliedFilters,
                };

                return {
                    appliedFilters: newFiltersValues,
                    tmpFilters: newFiltersValues,
                };
            });
        },

        applyTmpFilters() {
            set((state) => {
                return {
                    appliedFilters: state.tmpFilters,
                };
            });
        },

        resetFilters() {
            set(() => {
                return {
                    appliedFilters: initialFiltersValues,
                    tmpFilters: initialFiltersValues,
                };
            });
        },
    });

    return createStore<TFiltersStore>()(subscribeWithSelector(reducer));
};
