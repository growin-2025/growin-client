import { colors } from "@/styles/colors";
import { StyleSheet, Text } from "react-native";

interface MessageDateProps {
  date: string; // 2025.11.22
}

export function MessageDate({ date }: MessageDateProps) {
  return <Text style={styles.text}>{date}</Text>;
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
