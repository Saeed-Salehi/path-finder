import { create } from "zustand";

const useTeasersStore = create((set) => ({
  mapPoints: [],
  setMapPoints: (mapPoints) => set({ mapPoints }),
}));

export default useTeasersStore;
