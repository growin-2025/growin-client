import { create } from "zustand";

export type photo = {
  id: number;
  imageUri: string;
};

export interface creatingPartyState {
  seq: number;
  photos: photo[];
  addPhoto: (uri: string) => void;
  deletePhoto: (id: number) => void;
}

export const usecreatingPartyStore = create<creatingPartyState>((set, get) => ({
  seq: 0,
  photos: [],
  addPhoto: (uri: string) =>
    set((state) => {
      const newPhoto: photo = {
        id: state.seq++,
        imageUri: uri,
      };
      return {
        photos: [...state.photos, newPhoto],
      };
    }),
  deletePhoto: (id: number) =>
    set((state) => ({
      photos: state.photos.filter((p) => p.id !== id),
    })),
}));
