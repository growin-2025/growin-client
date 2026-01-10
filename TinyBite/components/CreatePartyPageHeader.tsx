import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CHEVRON_LEFT_ICON = require("@/assets/images/chevron/chevron-left-36-gray.png");

interface CreatePartyPageHeaderProps {
  title: string;
}

const CreatePartyPageHeader = ({ title }: CreatePartyPageHeaderProps) => {
  return (
    <SafeAreaView style={styles.safeAreaView} edges={["top"]}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image style={styles.image} source={CHEVRON_LEFT_ICON} />
        </TouchableOpacity>

        <Text style={[styles.text, textStyles.title20_B135]}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: "#fff",
    boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 36,
  },
  image: {
    width: 36,
    height: 36,
  },
  text: {
    flex: 1,
    color: colors.black,
    textAlign: "center",
  },
});

export default CreatePartyPageHeader;
