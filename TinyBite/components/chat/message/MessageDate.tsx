import { colors } from "@/styles/colors";
import { DateMessage } from "@/types/chat.types";
import { StyleSheet, Text } from "react-native";

interface MessageDateProps {
  message: DateMessage;
}

export function MessageDate({ message }: MessageDateProps) {
  return <Text style={styles.text}>{message.createdAt}</Text>;
}

const styles = StyleSheet.create({
  text: {
    alignSelf: "center",
    color: colors.gray[1],
    fontSize: 10,
    fontWeight: "600",
    lineHeight: 15,
  },
});
