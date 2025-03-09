export type TFiltersProps = {
    initialFiltersValues: TFiltersValuesObj;
};

export type TFiltersValuesObj = Record<string, string | number | boolean>;

export type TFiltersState = {
    tmpFilters: TFiltersValuesObj;
    appliedFilters: TFiltersValuesObj;
};

export type TFiltersActions = {
    setTmpFilters: (tmpFilters: TFiltersValuesObj) => void;
    setAppliedFilters: (tmpFilters: TFiltersValuesObj) => void;
    applyTmpFilters: () => void;
    resetFilters: () => void;
};

export type TFiltersStore = TFiltersState & TFiltersActions;
