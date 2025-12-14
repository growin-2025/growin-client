import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyPageScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.headerWrapper}>
        <Text style={[textStyles.title24_SB135]}>내정보</Text>
      </View>
      <View style={styles.contentWrapper}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
  },
  headerWrapper: {
    backgroundColor: colors.main,
    height: 58,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
