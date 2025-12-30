import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { PartyCategory } from "@/types/party";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const PRIMARY_COLOR = colors.main;
const ACTIVE_BG = colors.sub;
const INACTIVE_BG = colors.white;
const GRAY_TEXT = colors.gray[1];

interface MainCategoryProps {
  selectedCategory: PartyCategory;
  onCategoryChange: (category: PartyCategory) => void;
}

const items: { label: string; value: PartyCategory; icon: any }[] = [
  { label: "전체", value: "ALL", icon: null },
  {
    label: "배달",
    value: "DELIVERY",
    icon: require("@/assets/images/main/category/delivery.png"),
  },
  {
    label: "장보기",
    value: "GROCERY",
    icon: require("@/assets/images/main/category/grocery.png"),
  },
  {
    label: "생필품",
    value: "HOUSEHOLD",
    icon: require("@/assets/images/main/category/essentials.png"),
  },
];

const MainCategory = ({
  selectedCategory,
  onCategoryChange,
}: MainCategoryProps) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.container}
  >
    {items.map(({ label, value, icon }) => (
      <TouchableOpacity
        key={value}
        style={[
          styles.chip,
          selectedCategory === value ? styles.chipActive : styles.chipInactive,
        ]}
        onPress={() => onCategoryChange(value)}
      >
        {icon ? (
          <Image source={icon} style={styles.iconImage} resizeMode="contain" />
        ) : null}
        <Text
          style={[
            styles.text,
            textStyles.body16_SB135,
            selectedCategory === value
              ? styles.textActive
              : styles.textInactive,
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

export default MainCategory;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 5,
    marginTop: 5,
    gap: 12,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    height: 36,
    borderRadius: 100,
    gap: 6,
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
