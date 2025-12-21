import { create } from "zustand";

export type photo = {
  id: number;
  imageUri: string;
};

export interface creatingPartyState {
  seq: number;
  photos: photo[];
  representativePhoto: number;
  addPhoto: (uri: string) => void;
  deletePhoto: (id: number) => void;
  setRepresentativePhoto: (id: number) => void;
}

export const usecreatingPartyStore = create<creatingPartyState>((set, get) => ({
  seq: 0,
  photos: [],
  representativePhoto: 0,
  addPhoto: (uri: string) => {
    set((state) => {
      const newPhoto: photo = {
        id: state.seq++,
        imageUri: uri,
      };
      const newRepresentativePhoto =
        state.photos.length === 0 ? newPhoto.id : state.representativePhoto;

      return {
        photos: [...state.photos, newPhoto],
        representativePhoto: newRepresentativePhoto,
      };
    });
  },
  deletePhoto: (id: number) => {
    set((state) => {
      const updatedPhotos = state.photos.filter((p) => p.id !== id);
      const newRepresentativePhoto =
        state.representativePhoto === id && updatedPhotos.length > 0
          ? updatedPhotos[0].id
          : state.representativePhoto;

      return {
        photos: updatedPhotos,
        representativePhoto: newRepresentativePhoto,
      };
    });
  },
  setRepresentativePhoto: (id: number) =>
    set(() => ({
      representativePhoto: id,
    })),
}));
