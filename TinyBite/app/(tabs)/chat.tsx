import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { StyleSheet, Text, View } from "react-native";

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, textStyles.title24_SB135]}>채팅</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 8,
  },
});
