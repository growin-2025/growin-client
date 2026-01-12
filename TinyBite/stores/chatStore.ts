import { ChatMessageSchema } from "@/types/chat.types";
import { create } from "zustand";
import { Photo } from "./creatingPartyStore";

interface ChatStore {
  currentRoomId: number | null;
  messages: ChatMessageSchema[];

  // 채팅방 설정 및 메시지 초기화
  setRoom: (roomId: number, messages: ChatMessageSchema[]) => void;

  // 새 메시지 추가
  addMessage: (message: ChatMessageSchema) => void;

  // 채팅방 나갈 때 초기화
  clearRoom: () => void;

  // 이미지 선택 관련 추가
  selectedImage: Photo | null;
  setSelectedImage: (image: Photo) => void;
  clearSelectedImage: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  currentRoomId: null,
  messages: [],
  selectedImage: null,

  setRoom: (roomId, messages) =>
    set({
      currentRoomId: roomId,
      messages: messages,
    }),

  addMessage: (message) =>
    set((state) => {
      // 중복 메시지 방지
      const exists = state.messages.some(
        (m) => m.messageId === message.messageId
      );
      if (exists) return state;

      return {
        // 최신 메시지가 가장 앞쪽에 오도록
        messages: [message, ...state.messages],
      };
    }),

  clearRoom: () =>
    set({
      currentRoomId: null,
      messages: [],
      selectedImage: null,
    }),

  setSelectedImage: (image) => set({ selectedImage: image }),

  clearSelectedImage: () => set({ selectedImage: null }),
}));
