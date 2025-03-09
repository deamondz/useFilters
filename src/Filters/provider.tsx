import {
    type PropsWithChildren,
    createContext,
    useContext,
    useRef,
} from 'react';
import { useStore } from 'zustand';
import type { TFiltersProps } from './helpers';
import { createFiltersStore } from './store';

export const FiltersContext = createContext<ReturnType<
    typeof createFiltersStore
> | null>(null);

export const FiltersProvider = ({
    children,
    initialFiltersValues,
}: PropsWithChildren<TFiltersProps>) => {
    const storeRef = useRef<ReturnType<typeof createFiltersStore>>(null);

    if (!storeRef.current) {
        storeRef.current = createFiltersStore({
            initialFiltersValues,
        });
    }

    return (
        <FiltersContext.Provider value={storeRef.current}>
            {children}
        </FiltersContext.Provider>
    );
};

export function useFiltersStore() {
    const store = useContext(FiltersContext);

    if (!store) {
        throw new Error('Missing FiltersContext.Provider');
    }

    return store;
}

export function useFilters() {
    const store = useContext(FiltersContext);

    if (!store) {
        throw new Error('Missing FiltersContext.Provider');
    }

    return useStore(store);
}
