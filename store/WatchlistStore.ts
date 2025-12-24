import { create } from "zustand";
import { persist } from "zustand/middleware";

type WatchlistStore = {
  watchlist: number[];
  addToWatchlist: (anime: number) => void;
  removeFromWatchlist: (id: number) => void;
  hasHydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
};

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set) => ({
      watchlist: [],

      addToWatchlist: (anime) =>
        set((state) => {
          if (state.watchlist.includes(anime)) return state;
          return { watchlist: [...state.watchlist, anime] };
        }),

      removeFromWatchlist: (id) =>
        set((state) => ({
          watchlist: state.watchlist.filter((animeid) => animeid !== id),
        })),
      hasHydrated: false,
      setHydrated: (hydrated: boolean) => set({ hasHydrated: hydrated }),
    }),
    {
      name: "watchlist-store",
      partialize: (state) => ({ watchlist: state.watchlist }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
