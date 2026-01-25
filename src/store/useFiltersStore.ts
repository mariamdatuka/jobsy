import { create } from "zustand";

export type DatePreset = "7d" | "30d";

type DateFilter =
  | {
      type: "preset";
      preset: DatePreset;
    }
  | {
      type: "range";
      from: string; // ISO
      to: string; // ISO
    };

interface FiltersState {
  status: string[];
  jobType: string[];
  date: DateFilter | null;
}

interface initialState {
  filters: FiltersState;
}

export type MultiSelectFilterKey = "status" | "jobType";
interface FilterStore extends FiltersState {
  toggleFilter: (key: MultiSelectFilterKey, value: string) => void;
  resetFilters: () => void;
  setPresetDate: (preset: DatePreset) => void;
  setCustomDate: (from: string, to: string) => void;
  clearDate: () => void;
  resetDate?: () => void;
}

export const useFiltersStore = create<FilterStore>((set) => ({
  status: [],
  jobType: [],
  date: null,

  toggleFilter: (key, value) =>
    set((state) => {
      const values = state[key];
      const exists = values.includes(value);

      return {
        [key]: exists ? values.filter((v) => v !== value) : [...values, value],
      };
    }),

  setPresetDate: (preset) =>
    set(() => ({
      date: {
        type: "preset",
        preset,
      },
    })),

  setCustomDate: (from, to) =>
    set(() => ({
      date: {
        type: "range",
        from,
        to,
      },
    })),

  resetFilters: () =>
    set({
      status: [],
      jobType: [],
      date: null,
    }),
  clearDate: () =>
    set(() => ({
      date: null,
    })),
}));
