import { colors } from "@/styles/colors";
import { StyleSheet, Text } from "react-native";

interface MessageTimeProps {
  time: string; // "14:32" 같은 가공된 문자열
}

export function MessageTime({ time }: MessageTimeProps) {
  return <Text style={styles.text}>{time}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: colors.gray[1],
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 15,
  },
});
