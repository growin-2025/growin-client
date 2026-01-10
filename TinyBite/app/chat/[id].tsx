import ChatMessageComponent from "@/components/chat/message/ChatMessage";
import ChatRoomLayout from "@/components/layout/ChatRoomLayout";
import { mockChatGroup } from "@/mocks/mockChatGroup";
import { mockChatOneToOne } from "@/mocks/mockChatOneToOne";
import { ChatMessage, ChatType } from "@/types/chat";
import { useLocalSearchParams } from "expo-router";
import { FlatList } from "react-native";

const MY_USER_ID = 1;

export default function ChatRoomScreen() {
  const {
    id,
    type, // "oneOnOne" | "party"
    // name
  } = useLocalSearchParams<{
    id: string;
    type: ChatType;
    name?: string;
  }>();

  // const isPartyChat = type === "party";
  const isPartyChat = true;
  // const isPartyChat = false;

  const chatMessages: ChatMessage[] = isPartyChat
    ? mockChatGroup
    : mockChatOneToOne;

  return (
    <ChatRoomLayout>
      <FlatList
        data={chatMessages}
        inverted
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-end",
          gap: 8,
          paddingVertical: 8,
        }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatMessageComponent message={item} myUserId={MY_USER_ID} />
        )}
      />
    </ChatRoomLayout>
  );
}
