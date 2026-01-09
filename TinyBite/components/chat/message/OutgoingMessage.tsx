import { colors } from "@/styles/colors";
import { StyleSheet, Text, View } from "react-native";
import { MessageTime } from "./MessageTime";

interface OutgoingMessageProps {
  message: string;
  time: string;
}

export function OutgoingMessage({ message, time }: OutgoingMessageProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.bubble}>
        <Text style={styles.text}>{message}</Text>
      </View>
      <MessageTime time={time} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 2 },
  wrapper: {
    gap: 4,
    flexDirection: "row-reverse",
    alignItems: "flex-end",
    alignSelf: "flex-end",
  },
  bubble: {
    backgroundColor: colors.main,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderTopRightRadius: 2,
  },
  text: {
    maxWidth: 295,
    color: colors.white,
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 19.5,
  },
});
