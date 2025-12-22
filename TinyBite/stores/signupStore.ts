import { create } from "zustand";

enum termTypes {
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
  setPhoneNumber: (number: string) => void;
  toggleTerm: (term: string) => void;
  checkAllEssentialsOnly: () => void;
}

export const useSignupStore = create<SignupStoreState>((set, get) => ({
  phoneNumber: "",
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

      const isAllEssentialChecked = essentialKeys.every(
        (key) => state.terms[key]
      );

      const newTerms = { ...state.terms };

      if (isAllEssentialChecked) {
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
}));
