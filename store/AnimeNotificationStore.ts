import { create } from "zustand";

type AnimeNotificationStore = {
  message: string;
  setMessage: (message: string) => void;
};

export const useAnimeNotificationStore = create<AnimeNotificationStore>(
  (set) => ({
    message: "",
    setMessage: (message: string) => set({ message }),
  }),
);
