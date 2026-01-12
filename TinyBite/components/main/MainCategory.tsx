import { usePartyStore } from "@/stores/partyStore";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { PartyCategory } from "@/types/party.types";
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

const MainCategory = () => {
  const partyType = usePartyStore((state) => state.partyType);
  const setPartyType = usePartyStore((state) => state.setPartyType);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {items.map(({ label, value, icon }) => (
        <TouchableOpacity
          activeOpacity={0.8}
          key={value}
          style={[
            styles.chip,

            partyType === value ? styles.chipActive : styles.chipInactive,
          ]}
          onPress={() => setPartyType(value)}
        >
          {icon ? (
            <Image
              source={icon}
              style={styles.iconImage}
              resizeMode="contain"
            />
          ) : null}
          <Text
            style={[
              styles.text,
              textStyles.body16_SB135,
              partyType === value ? styles.textActive : styles.textInactive,
            ]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

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
    boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
  },
  chipActive: {
    backgroundColor: ACTIVE_BG,
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
  },
  chipInactive: {
    backgroundColor: INACTIVE_BG,
    borderColor: "transparent", // 투명 보더로 크기 유지
    borderWidth: 1, // 활성 상태와 동일한 보더 두께
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
