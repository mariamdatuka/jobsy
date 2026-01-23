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
  type: string[];
  date: DateFilter | null;
}

export type MultiSelectFilterKey = "status" | "type";

interface FilterStore extends FiltersState {
  toggleFilter: (key: MultiSelectFilterKey, value: string) => void;
  resetFilters: () => void;
  setPresetDate: (preset: DatePreset) => void;
  setCustomDate: (from: string, to: string) => void;
  resetDate?: () => void;
}

export const useFiltersStore = create<FilterStore>((set) => ({
  status: [],
  type: [],
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
    set((state) => ({
      date: {
        type: "preset",
        preset,
      },
    })),

  setCustomDate: (from, to) =>
    set((state) => ({
      date: {
        type: "range",
        from,
        to,
      },
    })),

  resetFilters: () =>
    set({
      status: [],
      type: [],
      date: null,
    }),
}));
