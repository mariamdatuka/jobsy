import { create } from "zustand";

type DateFilter = {
  preset?: "7d" | "30d";
  from?: string;
  to?: string;
};

interface FiltersState {
  status: string[];
  vacancyType: string[];
  date: DateFilter;
}

type MultiSelectFilterKey = "status" | "vacancyType";

interface FilterStore extends FiltersState {
  toggleFilter: (key: MultiSelectFilterKey, value: string) => void;
  setDateFilter: (date: DateFilter) => void;
  resetFilters: () => void;
}

export const useFiltersStore = create<FilterStore>((set) => ({
  status: [],
  vacancyType: [],
  date: {},

  toggleFilter: (key, value) =>
    set((state) => {
      const values = state[key];
      const exists = values.includes(value);

      return {
        [key]: exists ? values.filter((v) => v !== value) : [...values, value],
      };
    }),

  setDateFilter: (date) =>
    set(() => ({
      date,
    })),

  resetFilters: () =>
    set({
      status: [],
      vacancyType: [],
      date: {},
    }),
}));
