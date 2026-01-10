import { colors } from "@/styles/colors";
import { StyleSheet, Text } from "react-native";

interface MessageOwnerProps {
  nickname: string;
}

export function MessageOwner({ nickname }: MessageOwnerProps) {
  return <Text style={styles.text}>{nickname}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: colors.gray[1],
    fontSize: 10,
    fontWeight: "600",
    lineHeight: 15,
  },
});
