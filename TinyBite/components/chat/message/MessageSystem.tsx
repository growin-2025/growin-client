import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { StyleSheet, Text } from "react-native";

interface MessageSystemProps {
  system: string;
}

export function MessageSystem({ system }: MessageSystemProps) {
  return <Text style={[styles.text, textStyles.body12_M135]}>{system}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: colors.white,
    borderRadius: 100,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "rgba(34, 34, 34, 0.30)",
    alignSelf: "center",
  },
});
