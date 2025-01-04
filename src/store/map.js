import { create } from "zustand";

const useMapStore = create((set) => ({
  mapPoints: [],
  setMapPoints: (mapPoints) => set({ mapPoints }),
  filters: { start: null, end: null },
  setFilters: (filters) => set({ filters }),
}));

export default useMapStore;
