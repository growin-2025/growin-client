import { create } from "zustand";

export enum TermCode {
  AGE_OVER_14 = "AGE_OVER_14",
  SERVICE_USE = "SERVICE_USE",
  ELECTRONIC_FINANCE = "ELECTRONIC_FINANCE",
  PRIVACY_COLLECT = "PRIVACY_COLLECT",
  PRIVACY_PROVIDE = "PRIVACY_PROVIDE",
  MARKETING_RECEIVE = "MARKETING_RECEIVE",
}

export interface Coords {
  place: string;
  latitude: number;
  longitude: number;
}

export interface SignupStoreState {
  phoneNumber: string;
  terms: {
    [key in TermCode]: boolean;
  };
  nickname: string;
  location: Coords | null;
  setPhoneNumber: (number: string) => void;
  toggleTerm: (term: TermCode) => void;
  checkAllEssentialsOnly: () => void;
  getIsCheckedAllEssentialsOnly: () => boolean;
  getIsNextButtonEnabled: () => boolean;
  setNickname: (nickname: string) => void;
  setLocation: (coords: Coords) => void;
  resetSignupStore: () => void;
}

export const useSignupStore = create<SignupStoreState>((set, get) => ({
  phoneNumber: "",
  nickname: "",
  location: null,
  terms: {
    AGE_OVER_14: false,
    SERVICE_USE: false,
    ELECTRONIC_FINANCE: false,
    PRIVACY_COLLECT: false,
    PRIVACY_PROVIDE: false,
    MARKETING_RECEIVE: false,
  },
  setPhoneNumber: (number: string) => {
    set(() => ({
      phoneNumber: number,
    }));
  },
  toggleTerm: (term: TermCode) => {
    set((state) => ({
      terms: {
        ...state.terms,
        [term]: !state.terms[term as TermCode],
      },
    }));
  },
  checkAllEssentialsOnly: () => {
    set((state) => {
      const essentialKeys = (Object.keys(state.terms) as TermCode[]).filter(
        (key) => key !== TermCode.MARKETING_RECEIVE
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
      terms.AGE_OVER_14 &&
      terms.SERVICE_USE &&
      terms.ELECTRONIC_FINANCE &&
      terms.PRIVACY_COLLECT &&
      terms.PRIVACY_PROVIDE
    );
  },
  getIsNextButtonEnabled: () => {
    const state = get();
    const isAllEssentialChecked = state.getIsCheckedAllEssentialsOnly();
    const phoneNumberPattern = /^\d{3}-\d{4}-\d{4}$/;
    const isPhoneValid = phoneNumberPattern.test(state.phoneNumber);

    return isAllEssentialChecked && isPhoneValid;
  },
  setNickname: (nickname: string) => {
    set(() => ({
      nickname,
    }));
  },
  setLocation: (coords: Coords) => {
    set(() => ({
      location: coords,
    }));
  },
  resetSignupStore: () => {
    set(() => ({
      phoneNumber: "",
      nickname: "",
      location: null,
      terms: {
        AGE_OVER_14: false,
        SERVICE_USE: false,
        ELECTRONIC_FINANCE: false,
        PRIVACY_COLLECT: false,
        PRIVACY_PROVIDE: false,
        MARKETING_RECEIVE: false,
      },
    }));
  },
}));
