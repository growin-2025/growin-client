import { create } from "zustand";

export type Photo = {
  id: number;
  imageUri: string;
  mimeType: string;
  fileName: string;
};

export interface CreatingPartyState {
  seq: number;
  photos: Photo[];
  representativePhoto: number;
  partyTitle: string;
  totalAmount: string;
  numberOfPeople: number;
  pickUpLocation: string;
  detailedDescription: string;
  productLink: string;
  addPhoto: (uri: string, mimeType: string, fileName: string) => void;
  deletePhoto: (id: number) => void;
  setRepresentativePhoto: (id: number) => void;
  setPartyTitle: (title: string) => void;
  setTotalAmount: (amount: string) => void;
  setNumberOfPeople: (number: number) => void;
  setPickUpLocation: (location: string) => void;
  setDetailedDescription: (description: string) => void;
  setProductLink: (link: string) => void;
  resetCreateParty: () => void;
}

export const useCreatingPartyStore = create<CreatingPartyState>((set, get) => ({
  seq: 0,
  photos: [],
  representativePhoto: 0,
  partyTitle: "",
  totalAmount: "",
  numberOfPeople: 2,
  pickUpLocation: "",
  detailedDescription: "",
  productLink: "",
  addPhoto: (uri: string, mimeType: string, fileName: string) => {
    set((state) => {
      const nextSeq = state.seq + 1;
      const newPhoto: Photo = {
        id: nextSeq,
        imageUri: uri,
        mimeType: mimeType,
        fileName: fileName,
      };
      const newRepresentativePhoto =
        state.photos.length === 0 ? newPhoto.id : state.representativePhoto;

      return {
        seq: nextSeq,
        photos: [...state.photos, newPhoto],
        representativePhoto: newRepresentativePhoto,
      };
    });
  },
  deletePhoto: (id: number) => {
    set((state) => {
      const updatedPhotos = state.photos.filter((p) => p.id !== id);
      const newRepresentativePhoto =
        updatedPhotos.length === 0
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
  setPartyTitle: (title: string) => {
    set(() => ({
      partyTitle: title,
    }));
  },
  setTotalAmount: (amount: string) => {
    set(() => ({
      totalAmount: amount,
    }));
  },
  setNumberOfPeople: (number: number) => {
    set(() => ({
      numberOfPeople: number,
    }));
  },
  setPickUpLocation: (location: string) => {
    set(() => ({
      pickUpLocation: location,
    }));
  },
  setDetailedDescription: (description: string) => {
    set(() => ({
      detailedDescription: description,
    }));
  },
  setProductLink: (link: string) => {
    set(() => ({
      productLink: link,
    }));
  },
  resetCreateParty: () => {
    set(() => ({
      seq: 0,
      photos: [],
      representativePhoto: 0,
      partyTitle: "",
      totalAmount: "",
      numberOfPeople: 2,
      pickUpLocation: "",
      detailedDescription: "",
      productLink: "",
    }));
  },
}));
