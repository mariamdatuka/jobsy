import { create } from "zustand";
import { persist } from "zustand/middleware";

export type DatePreset = "7d" | "30d";

export type DateFilter =
  | {
      type: "preset";
      preset: DatePreset;
    }
  | {
      type: "range";
      from: string; // ISO
      to: string; // ISO
    };

export interface FiltersState {
  status: string[];
  jobType: string[];
  date: DateFilter | null;
}

interface Filters {
  filters: FiltersState;
}

const initialFilters: FiltersState = {
  status: [],
  jobType: [],
  date: null,
};

export type MultiSelectFilterKey = "status" | "jobType";
interface FilterStore extends Filters {
  toggleFilter: (key: MultiSelectFilterKey, value: string) => void;
  resetFilters: () => void;
  setPresetDate: (preset: DatePreset) => void;
  setCustomDate: (from: string, to: string) => void;
  clearDate: () => void;
}

export const useFiltersStore = create<FilterStore>()(
  persist(
    (set) => ({
      filters: initialFilters,

      toggleFilter: (key, value) =>
        set((state) => {
          const values = state.filters[key];
          const exists = values.includes(value);

          return {
            filters: {
              ...state.filters,
              [key]: exists
                ? values.filter((v) => v !== value)
                : [...values, value],
            },
          };
        }),

      setPresetDate: (preset) =>
        set((state) => ({
          filters: {
            ...state.filters,
            date: {
              type: "preset",
              preset,
            },
          },
        })),

      setCustomDate: (from, to) =>
        set((state) => ({
          filters: {
            ...state.filters,
            date: {
              type: "range",
              from,
              to,
            },
          },
        })),

      resetFilters: () =>
        set({
          filters: initialFilters,
        }),

      clearDate: () =>
        set((state) => ({
          filters: {
            ...state.filters,
            date: null,
          },
        })),
    }),
    {
      name: "filters-storage", // key in localStorage
    },
  ),
);
