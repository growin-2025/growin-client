import { getPrevMessage } from "@/api/chatApi";
import ChatMessageComponent from "@/components/chat/message/ChatMessage";
import ChatRoomLayout from "@/components/layout/ChatRoomLayout";
import { useChatMessages } from "@/hooks/useChatMessages";
import { websocketClient } from "@/lib/websocket/websocketClient";
import { useAuthStore } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { FlatList } from "react-native";

export default function ChatRoomScreen() {
  const { id: chatRoomId } = useLocalSearchParams<{
    id: string;
  }>();

  const user = useAuthStore((state) => state.user);
  const userId = user?.userId;
  const nickname = user?.nickname;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["chatMessages", chatRoomId],
    queryFn: () =>
      getPrevMessage({ chatRoomId: parseInt(chatRoomId), page: 0, size: 100 }),
    staleTime: 0, // 항상 최신 데이터 요청
  });

  // WebSocket 연결 (앱 전체에서 한 번만 연결)
  useEffect(() => {
    const setupWebSocket = async () => {
      const accessToken = await SecureStore.getItemAsync("accessToken");
      if (!accessToken) {
        throw new Error("No access token");
      }
      websocketClient.connect(accessToken);
    };

    setupWebSocket();

    return () => {
      websocketClient.disconnect();
    };
  }, []);

  // 채팅 메시지 관리
  const { messages, sendTextMessage, sendImageMessage, status, isConnected } =
    useChatMessages({
      chatRoomId: chatRoomId ? parseInt(chatRoomId) : 0,
      initialMessages: data?.messages,
      userId: userId || 0,
      nickname: nickname || "",
    });

  return (
    <ChatRoomLayout onSendText={sendTextMessage} onSendImage={sendImageMessage}>
      <FlatList
        data={messages}
        inverted
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-end",
          gap: 8,
          paddingVertical: 8,
        }}
        keyExtractor={(item) => item.messageId.toString()}
        renderItem={({ item }) => <ChatMessageComponent message={item} />}
      />
    </ChatRoomLayout>
  );
}
