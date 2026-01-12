import { PartyCategory } from "@/types/party.types";
import { create } from "zustand";

export interface PartyState {
  partyType: PartyCategory;
  setPartyType: (category: PartyCategory) => void;
}

export const usePartyStore = create<PartyState>((set) => ({
  partyType: "ALL",
  setPartyType: (category: PartyCategory) => set({ partyType: category }),
}));
