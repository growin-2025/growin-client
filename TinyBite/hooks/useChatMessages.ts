import { useChatStore } from "@/stores/chatStore";
import { ChatMessageSchema } from "@/types/chat.types";
import { useCallback, useEffect } from "react";
import { useWebSocketChat } from "./useWebSocketChat";

/**
 * useChatMessages 훅 옵션
 */
interface UseChatMessagesOptions {
  chatRoomId: number;
  initialMessages?: ChatMessageSchema[];
  userId: number; // 메시지 전송 시 필요
  nickname: string; // 메시지 전송 시 필요
}

/**
 * 채팅 메시지 관리 훅
 * - WebSocket 연결 및 구독 (useWebSocketChat 사용)
 * - Zustand store를 통한 메시지 상태 관리
 * - 메시지 송수신 인터페이스 제공
 *
 * @example
 * const { messages, sendTextMessage, sendImageMessage, isConnected } = useChatMessages({
 *   chatRoomId: 123,
 *   initialMessages: [],
 *   userId: 456,
 *   nickname: "홍길동",
 * });
 */
export function useChatMessages({
  chatRoomId,
  initialMessages = [],
  userId,
  nickname,
}: UseChatMessagesOptions) {
  const { setRoom, addMessage, clearRoom, messages, currentRoomId } =
    useChatStore();

  /**
   * 새 메시지 수신 핸들러
   */
  const handleNewMessage = useCallback(
    (message: ChatMessageSchema) => {
      // 현재 채팅방의 메시지인지 확인
      if (currentRoomId === chatRoomId) {
        addMessage(message);
      }
    },
    [chatRoomId, currentRoomId, addMessage]
  );

  /**
   * WebSocket 연결 및 구독
   */
  const { sendMessage, status, isConnected } = useWebSocketChat({
    chatRoomId,
    onMessage: handleNewMessage,
    onStatusChange: (newStatus) => {
      console.log(`[useChatMessages] 연결 상태 변경: ${newStatus}`);
    },
  });

  /**
   * 채팅방 초기화
   */
  useEffect(() => {
    setRoom(chatRoomId, initialMessages);

    // cleanup: 채팅방 나갈 때 상태 초기화
    return () => {
      clearRoom();
    };
  }, [chatRoomId, initialMessages, setRoom, clearRoom]);

  /**
   * 텍스트 메시지 전송
   */
  const sendTextMessage = useCallback(
    (text: string) => {
      if (!text.trim()) {
        console.warn("[useChatMessages] 빈 메시지는 전송할 수 없습니다.");
        return;
      }

      sendMessage({
        chatRoomId,
        messageType: "TEXT",
        senderId: userId,
        nickname,
        text,
      });
      // sendMessage({
      //   chatRoomId: 57,
      //   messageType: "TEXT",
      //   senderId: 13,
      //   nickname: "델리온",
      //   text: "dddd",
      // });
    },
    [chatRoomId, nickname, sendMessage, userId]
  );

  /**
   * 이미지 메시지 전송
   */
  const sendImageMessage = useCallback(
    (imageUrl: string) => {
      if (!imageUrl) {
        console.warn("[useChatMessages] 이미지 URL이 필요합니다.");
        return;
      }

      sendMessage({
        chatRoomId,
        messageType: "IMAGE",
        senderId: userId,
        nickname,
        imageUrl,
      });
    },
    [chatRoomId, userId, nickname, sendMessage]
  );

  return {
    // 메시지 목록
    messages,

    // 메시지 전송
    sendTextMessage,
    sendImageMessage,

    // 연결 상태
    status,
    isConnected,
  };
}
