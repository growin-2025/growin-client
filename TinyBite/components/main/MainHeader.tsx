import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { Image, StyleSheet, Text, View } from "react-native";

const PRIMARY_COLOR = colors.main;

const MainHeader = () => (
  <View style={styles.container}>
    <View style={styles.textBlock}>
      <View style={styles.locationRow}>
        <View style={styles.mainLogoWrapper}>
          <Image
            source={require("@/assets/images/main/mainlogo.png")}
            style={styles.mainLogo}
            resizeMode="contain"
          />
        </View>
        <Text style={[styles.location, textStyles.title20_B135]}>역삼동</Text>
      </View>
      <Text style={[styles.greetingLine1, textStyles.title20_B135]}>
        가짜대학생
        <Text style={[styles.greetingLine2, textStyles.title18_SB135]}>
          님,{"\n"}오늘은 무엇을 나눌까요 ?
        </Text>
      </Text>
    </View>
    <View style={styles.characterWrapper}>
      <Image
        source={require("@/assets/images/main/character.png")}
        style={styles.character}
        resizeMode="contain"
      />
    </View>
  </View>
);

export default MainHeader;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 179,
    backgroundColor: PRIMARY_COLOR,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    position: "relative",
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 22,
    overflow: "hidden",
    marginBottom: 0,
  },
  textBlock: {
    flex: 1,
    gap: 26.5,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  location: {
    color: colors.white,
  },
  mainLogo: {
    width: 24,
    height: 28,
  },
  mainLogoWrapper: {
    width: 23.99945,
    height: 27.99909,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  greetingLine1: {
    color: colors.white,
  },
  greetingLine2: {
    color: colors.white,
  },
  characterWrapper: {
    position: "absolute",
    right: 25.03,
    bottom: -6,
  },
  character: {
    width: 162.59781,
    height: 167.88554,
  },
});
