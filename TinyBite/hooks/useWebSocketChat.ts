import {
  ConnectionStatus,
  websocketClient,
} from "@/lib/websocket/websocketClient";
import { ChatMessageSchema } from "@/types/chat.types";
import { StompSubscription } from "@stomp/stompjs";
import { useCallback, useEffect, useRef } from "react";

/**
 * 메시지 전송 파라미터
 */
interface SendMessageParams {
  chatRoomId: number;
  messageType: "TEXT" | "IMAGE";
  senderId: number;
  nickname: string;
  text?: string;
  imageUrl?: string;
}

/**
 * useWebSocketChat 훅 옵션
 */
interface UseWebSocketChatOptions {
  chatRoomId: number;
  onMessage: (message: ChatMessageSchema) => void;
  onStatusChange?: (status: ConnectionStatus) => void;
}

/**
 * 채팅 WebSocket 훅
 * - 특정 채팅방 구독
 * - 메시지 전송
 * - 연결 상태 관리
 *
 * @example
 * const { sendMessage, status, isConnected } = useWebSocketChat({
 *   chatRoomId: 123,
 *   onMessage: (msg) => console.log('새 메시지:', msg),
 * });
 */
export function useWebSocketChat({
  chatRoomId,
  onMessage,
  onStatusChange,
}: UseWebSocketChatOptions) {
  const subscriptionRef = useRef<StompSubscription | null>(null);
  const statusRef = useRef<ConnectionStatus>("disconnected");

  /**
   * 채팅방 구독
   */
  const subscribeToRoom = useCallback(() => {
    // 이미 구독 중이면 리턴
    if (subscriptionRef.current) {
      console.log(
        `[useWebSocketChat] 이미 채팅방 ${chatRoomId}를 구독 중입니다.`
      );
      return;
    }

    // 연결되지 않았으면 대기
    if (!websocketClient.isConnected()) {
      console.log("[useWebSocketChat] 연결 대기 중...");
      return;
    }

    const destination = `/subscribe/chat/room/${chatRoomId}`;

    subscriptionRef.current = websocketClient.subscribe(
      destination,
      (message) => {
        try {
          const receivedMessage: ChatMessageSchema = JSON.parse(message.body);
          console.log("[useWebSocketChat] 메시지 수신:", receivedMessage);
          onMessage(receivedMessage);
        } catch (error) {
          console.error("[useWebSocketChat] 메시지 파싱 에러:", error);
        }
      }
    );

    console.log(`[useWebSocketChat] 채팅방 ${chatRoomId} 구독 완료`);
  }, [chatRoomId, onMessage]);

  /**
   * 채팅방 구독 해제
   */
  const unsubscribeFromRoom = useCallback(() => {
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
      subscriptionRef.current = null;
      console.log(`[useWebSocketChat] 채팅방 ${chatRoomId} 구독 해제`);
    }
  }, [chatRoomId]);

  /**
   * 메시지 전송
   */
  const sendMessage = useCallback((params: SendMessageParams) => {
    if (!websocketClient.isConnected()) {
      console.error(
        "[useWebSocketChat] 연결되지 않아 메시지를 보낼 수 없습니다."
      );
      return;
    }

    const destination = "/publish/send";
    const body = JSON.stringify(params);

    websocketClient.publish(destination, body);
    console.log("[useWebSocketChat] 메시지 전송:", params);
  }, []);

  /**
   * 연결 상태 변경 감지
   */
  useEffect(() => {
    const unsubscribe = websocketClient.onStatusChange((status) => {
      statusRef.current = status;
      onStatusChange?.(status);

      // 연결 성공 시 자동 구독
      if (status === "connected") {
        subscribeToRoom();
      }
      // 연결 끊김 시 구독 해제
      else if (status === "disconnected") {
        unsubscribeFromRoom();
      }
    });

    return unsubscribe;
  }, [subscribeToRoom, unsubscribeFromRoom, onStatusChange]);

  /**
   * chatRoomId 변경 시 재구독
   */
  useEffect(() => {
    // 기존 구독 해제
    unsubscribeFromRoom();

    // 연결되어 있으면 새 채팅방 구독
    if (websocketClient.isConnected()) {
      subscribeToRoom();
    }

    // cleanup: 컴포넌트 언마운트 시 구독 해제
    return () => {
      unsubscribeFromRoom();
    };
  }, [chatRoomId, subscribeToRoom, unsubscribeFromRoom]);

  return {
    sendMessage,
    status: statusRef.current,
    isConnected: websocketClient.isConnected(),
  };
}
