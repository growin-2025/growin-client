import { create } from "zustand";

export enum TermCode {
  AGE_OVER_14 = "AGE_OVER_14",
  SERVICE_USE = "SERVICE_USE",
  ELECTRONIC_FINANCE = "ELECTRONIC_FINANCE",
  PRIVACY_COLLECT = "PRIVACY_COLLECT",
  PRIVACY_PROVIDE = "PRIVACY_PROVIDE",
  MARKETING_RECEIVE = "MARKETING_RECEIVE",
}

export interface SignupStoreState {
  googleIdToken: string;
  phoneNumber: string;
  terms: {
    [key in TermCode]: boolean;
  };
  nickname: string;
  locationName: string;
  setGoogleIdToken: (token: string) => void;
  setPhoneNumber: (number: string) => void;
  toggleTerm: (term: TermCode) => void;
  checkAllEssentialsOnly: () => void;
  getIsCheckedAllEssentialsOnly: () => boolean;
  getIsNextButtonEnabled: () => boolean;
  setNickname: (nickname: string) => void;
  setLocationName: (locationName: string) => void;
  resetSignupStore: () => void;
}

export const useSignupStore = create<SignupStoreState>((set, get) => ({
  googleIdToken: "",
  phoneNumber: "",
  nickname: "",
  locationName: "",
  terms: {
    AGE_OVER_14: false,
    SERVICE_USE: false,
    ELECTRONIC_FINANCE: false,
    PRIVACY_COLLECT: false,
    PRIVACY_PROVIDE: false,
    MARKETING_RECEIVE: false,
  },
  setGoogleIdToken: (token: string) => {
    set(() => ({
      googleIdToken: token,
    }));
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
    const isPhoneValid = state.phoneNumber.length === 13;

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
      googleIdToken: "",
      phoneNumber: "",
      nickname: "",
      locationName: "",
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
