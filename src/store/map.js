import { create } from "zustand";

const useMapStore = create((set) => ({
  mapPoints: [],
  setMapPoints: (mapPoints) => set({ mapPoints }),
}));

export default useMapStore;
