import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const PRIMARY_COLOR = colors.main;
const ACTIVE_BG = colors.sub;
const INACTIVE_BG = colors.white;
const GRAY_TEXT = colors.gray[1];

const items = [
  { label: "전체", icon: null, active: true },
  {
    label: "배달",
    icon: require("@/assets/images/main/category/delivery.png"),
    active: false,
  },
  {
    label: "장보기",
    icon: require("@/assets/images/main/category/grocery.png"),
    active: false,
  },
  {
    label: "생필품",
    icon: require("@/assets/images/main/category/essentials.png"),
    active: false,
  },
];

const MainCategory = () => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.container}
  >
    {items.map(({ label, icon, active }) => (
      <View
        key={label}
        style={[styles.chip, active ? styles.chipActive : styles.chipInactive]}
      >
        {icon ? (
          <Image source={icon} style={styles.iconImage} resizeMode="contain" />
        ) : null}
        <Text
          style={[
            styles.text,
            textStyles.body16_SB135,
            active ? styles.textActive : styles.textInactive,
          ]}
        >
          {label}
        </Text>
      </View>
    ))}
  </ScrollView>
);

export default MainCategory;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 18,
    marginBottom: 32,
    gap: 12,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 11,
    height: 36,
    borderRadius: 100,
    gap: 8,
    // shadow
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 0 },
    elevation: 2,
  },
  chipActive: {
    backgroundColor: ACTIVE_BG,
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
  },
  chipInactive: {
    backgroundColor: INACTIVE_BG,
  },
  text: {
    textAlign: "center",
  },
  textActive: {
    color: PRIMARY_COLOR,
  },
  textInactive: {
    color: GRAY_TEXT,
  },
  iconImage: {
    width: 24,
    height: 24,
  },
});
