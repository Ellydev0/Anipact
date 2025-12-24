import { create } from "zustand";

type AnimeTypeStore = {
  animeType: "popular" | "trending";
  setAnimeType: (animeType: "popular" | "trending") => void;
};

export const useAnimeTypeStore = create<AnimeTypeStore>((set) => ({
  animeType: "trending",
  setAnimeType: (animeType) => set({ animeType: animeType }),
}));
