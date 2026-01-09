import ChatRoomLayout from "@/components/layout/ChatRoomLayout";
import { colors } from "@/styles/colors";
import { useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet, Text } from "react-native";

export default function PartyCreateScreen() {
  const {
    id,
    // type,
    // name
  } = useLocalSearchParams<{
    id: string;
    type?: string;
    name?: string;
  }>();

  return (
    <ChatRoomLayout>
      <FlatList
        data={["item", "item2", "item3", "item4"]}
        inverted // ← 메시지가 아래에서 위로 쌓임
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => <Text>item</Text>}
        keyExtractor={(item) => item}
      />
    </ChatRoomLayout>
  );
}

const styles = StyleSheet.create({
  safeAreaBottom: {
    backgroundColor: colors.white,
  },
});
