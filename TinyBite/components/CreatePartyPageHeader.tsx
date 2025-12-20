import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CreatePartyPageHeaderProps {
  title: string;
  mBottom?: number;
}

const CreatePartyPageHeader = ({
  title,
  mBottom,
}: CreatePartyPageHeaderProps) => {
  return (
    <SafeAreaView
      style={[styles.safeAreaView, { marginBottom: mBottom }]}
      edges={["top"]}
    >
      <StatusBar style="dark" />

      <View style={styles.container}>
        <Pressable onPress={() => router.back()}>
          <Image
            style={styles.image}
            source={require("@/assets/images/chevron/chevron-left-36-gray.png")}
          />
        </Pressable>

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
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowRadius: 4,
    elevation: 4,
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
