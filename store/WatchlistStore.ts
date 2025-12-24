import { create } from "zustand";
import { persist } from "zustand/middleware";

type WatchlistStore = {
  watchlist: number[];
  addToWatchlist: (anime: number) => void;
  removeFromWatchlist: (id: number) => void;
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
    }),
    {
      name: "watchlist-store",
      partialize: (state) => ({ watchlist: state.watchlist }),
    },
  ),
);
