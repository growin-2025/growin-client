import { create } from "zustand";

export enum termTypes {
  age = "age",
  service = "service",
  finance = "finance",
  collectingPrivacy = "collectingPrivacy",
  providingPrivacy = "providingPrivacy",
  offer = "offer",
}

export interface SignupStoreState {
  phoneNumber: string;
  terms: {
    [key in termTypes]: boolean;
  };
  nickname: string;
  locationName: string;
  setPhoneNumber: (number: string) => void;
  toggleTerm: (term: string) => void;
  checkAllEssentialsOnly: () => void;
  getIsCheckedAllEssentialsOnly: () => boolean;
  getIsNextButtonEnabled: () => boolean;
  setNickname: (nickname: string) => void;
  setLocationName: (locationName: string) => void;
  resetSignupStore: () => void;
}

export const useSignupStore = create<SignupStoreState>((set, get) => ({
  phoneNumber: "",
  nickname: "",
  locationName: "",
  terms: {
    age: false,
    service: false,
    finance: false,
    collectingPrivacy: false,
    providingPrivacy: false,
    offer: false,
  },
  setPhoneNumber: (number: string) => {
    set(() => ({
      phoneNumber: number,
    }));
  },
  toggleTerm: (term: string) => {
    set((state) => ({
      terms: {
        ...state.terms,
        [term]: !state.terms[term as termTypes],
      },
    }));
  },
  checkAllEssentialsOnly: () => {
    set((state) => {
      const essentialKeys = (Object.keys(state.terms) as termTypes[]).filter(
        (key) => key !== termTypes.offer
      );

      const newTerms = { ...state.terms };

      if (get().getIsCheckedAllEssentialsOnly()) {
        essentialKeys.forEach((key) => {
          newTerms[key] = false;
        });
      } else {
        essentialKeys.forEach((key) => {
          newTerms[key] = true;
        });
      }

      return { terms: newTerms };
    });
  },
  getIsCheckedAllEssentialsOnly: () => {
    const { terms } = get();
    return (
      terms.age &&
      terms.service &&
      terms.finance &&
      terms.collectingPrivacy &&
      terms.providingPrivacy
    );
  },
  getIsNextButtonEnabled: () => {
    const state = get();
    const isAllEssentialChecked = state.getIsCheckedAllEssentialsOnly();
    const isPhoneValid = state.phoneNumber.length === 11;

    return isAllEssentialChecked && isPhoneValid;
  },
  setNickname: (nickname: string) => {
    set(() => ({
      nickname,
    }));
  },
  setLocationName: (locationName: string) => {
    set(() => ({
      locationName,
    }));
  },
  resetSignupStore: () => {
    set(() => ({
      phoneNumber: "",
      nickname: "",
      locationName: "",
      terms: {
        age: false,
        service: false,
        finance: false,
        collectingPrivacy: false,
        providingPrivacy: false,
        offer: false,
      },
    }));
  },
}));
