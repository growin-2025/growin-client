import { colors } from "@/styles/colors";
import { TextMessage } from "@/types/chat.types";
import { StyleSheet, Text, View } from "react-native";
import { formatTime } from "./ChatMessage";
import { MessageOwner } from "./MessageOwner";
import { MessageTime } from "./MessageTime";

interface IncomingMessageProps {
  message: TextMessage;
}

export function IncomingMessage({ message }: IncomingMessageProps) {
  const time = formatTime(message.createdAt);

  return (
    <View style={styles.container}>
      <MessageOwner nickname={message.nickname} />
      <View style={styles.wrapper}>
        <View style={styles.bubble}>
          <Text style={styles.text}>{message.text}</Text>
        </View>
        <MessageTime time={time} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 2 },
  wrapper: {
    gap: 4,
    flexDirection: "row",
    alignItems: "flex-end",
    alignSelf: "flex-start",
  },
  bubble: {
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderTopLeftRadius: 2,
  },
  text: {
    maxWidth: 295,
    color: colors.black,
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 19.5,
  },
});
