import { Photo } from "@/stores/creatingPartyStore";
import { PartyDetail } from "@/types/party";
import { create } from "zustand";

export interface PhotoUrl {
  id: number;
  imageUri: string;
}

export interface editPartyState {
  seq: number;
  partyId: number;
  photos: (Photo | PhotoUrl)[];
  representativePhoto: number;
  title: {
    isEdited: boolean;
    value: string;
  };
  totalPrice: {
    isEdited: boolean;
    value: string;
  };
  maxParticipants: {
    isEdited: boolean;
    value: number;
  };
  pickupLocation: {
    isEdited: boolean;
    value: string;
  };
  latitude: {
    isEdited: boolean;
    value: number;
  };
  longitude: {
    isEdited: boolean;
    value: number;
  };
  description: string;
  productLink: {
    isEdited: boolean;
    value: string;
  };

  setInitialPartyInfo: (info: PartyDetail) => void;
  addPhoto: (uri: string, mimeType: string, fileName: string) => void;
  deletePhoto: (id: number) => void;
  setRepresentativePhoto: (id: number) => void;
  setPartyTitle: (title: string) => void;
  setTotalAmount: (amount: string) => void;
  setPickUpLocation: (location: string) => void;
  setDetailedDescription: (description: string) => void;
  setProductLink: (link: string) => void;
  setMaxParticipants: (number: number) => void;
}

export const useEditPartyStore = create<editPartyState>((set) => ({
  seq: 0,
  partyId: 0,
  photos: [],
  representativePhoto: 0,
  title: {
    isEdited: false,
    value: "",
  },
  totalPrice: {
    isEdited: false,
    value: "",
  },
  maxParticipants: {
    isEdited: false,
    value: 2,
  },
  pickupLocation: {
    isEdited: false,
    value: "",
  },
  latitude: {
    isEdited: false,
    value: 37.569,
  },
  longitude: {
    isEdited: false,
    value: 126.991,
  },
  description: "",
  productLink: {
    isEdited: false,
    value: "",
  },

  setInitialPartyInfo: (info: PartyDetail) =>
    set({
      seq: info.images.length,
      partyId: info.partyId,
      photos: info.images.map((imageUri, index) => ({
        id: index + 1,
        imageUri: imageUri,
      })),
      representativePhoto: info.images.length > 0 ? 1 : 0,
      title: {
        isEdited: false,
        value: info.title,
      },
      totalPrice: {
        isEdited: false,
        value: info.totalPrice.toString(),
      },
      maxParticipants: {
        isEdited: false,
        value: info.maxParticipants,
      },
      pickupLocation: {
        isEdited: false,
        value: info.pickupLocation.place,
      },
      latitude: {
        isEdited: false,
        value: info.pickupLocation.pickupLatitude,
      },
      longitude: {
        isEdited: false,
        value: info.pickupLocation.pickupLongitude,
      },
      description: info.description || "",
      productLink: {
        isEdited: false,
        value: info.productLink?.url || "",
      },
    }),
  setPartyTitle: (title: string) => {
    set(() => ({
      title: {
        isEdited: true,
        value: title,
      },
    }));
  },
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
          ? state.seq + 1
          : id === state.representativePhoto
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
  setTotalAmount: (amount: string) => {
    set(() => ({
      totalPrice: {
        isEdited: true,
        value: amount,
      },
    }));
  },
  setPickUpLocation: (location: string) => {
    set(() => ({
      pickupLocation: {
        isEdited: true,
        value: location,
      },
    }));
  },
  setDetailedDescription: (description: string) => {
    set(() => ({
      description: description,
    }));
  },
  setProductLink: (link: string) => {
    set(() => ({
      productLink: {
        isEdited: true,
        value: link,
      },
    }));
  },
  setMaxParticipants: (number: number) => {
    set(() => ({
      maxParticipants: {
        isEdited: true,
        value: number,
      },
    }));
  },
}));
