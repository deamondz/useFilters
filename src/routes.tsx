import { createBrowserRouter, useSearchParams } from 'react-router-dom';
import {
    FiltersProvider,
    type TFiltersStore,
    type TFiltersValuesObj,
    useFilters,
    useFiltersStore,
} from './Filters';
import { useCallback, useEffect } from 'react';

function appliedFiltersSelector(s: TFiltersStore) {
    return s.appliedFilters;
}

function useFiltersUrlSync() {
    const { subscribe, setState } = useFiltersStore();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const _searchParams = Object.fromEntries(searchParams.entries());
        setState({
            appliedFilters: _searchParams,
            tmpFilters: _searchParams,
        });
    }, [searchParams, setState]);

    const onChange = useCallback<
        (
            appliedFilters: TFiltersValuesObj,
            prevAppliedFilters: TFiltersValuesObj,
        ) => void
    >(
        (appliedFilters, prevAppliedFilters) => {
            const isEqual =
                JSON.stringify(appliedFilters) ===
                JSON.stringify(prevAppliedFilters);

            if (isEqual) {
                return;
            }

            setSearchParams(appliedFilters as unknown as URLSearchParams, {
                replace: false,
            });
        },
        [setSearchParams],
    );

    subscribe(appliedFiltersSelector, onChange);
}

const List = () => {
    const { appliedFilters, setAppliedFilters } = useFilters();
    useFiltersUrlSync();

    return (
        <>
            <div>
                <button
                    type="button"
                    onClick={() => {
                        setAppliedFilters({ page: 1 });
                    }}
                >
                    set Page = 1
                </button>

                <button
                    type="button"
                    onClick={() => {
                        setAppliedFilters({ page: 2 });
                    }}
                >
                    set Page = 2
                </button>
            </div>
            <div>
                <output>{JSON.stringify(appliedFilters, null, '    ')}</output>
            </div>
        </>
    );
};

const MainPage = () => {
    return (
        <FiltersProvider initialFiltersValues={{ page: 2 }}>
            <List />
        </FiltersProvider>
    );
};

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />,
    },
]);
