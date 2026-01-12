import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { PartyCategory } from "@/types/party.types";
import { Image, StyleSheet, Text, View } from "react-native";

type PillType = PartyCategory | "time";

interface PartyDetailPillProps {
  type: PillType;
  label?: string; // time 타입일 때만 사용
}

const getIconByType = (type: PillType) => {
  switch (type) {
    case "DELIVERY":
      return require("@/assets/images/main/category/delivery.png");
    case "GROCERY":
      return require("@/assets/images/main/category/grocery.png");
    case "HOUSEHOLD":
      return require("@/assets/images/main/category/essentials.png");
    case "time":
      return null;
    default:
      return null;
  }
};

const getLabelByType = (type: PillType): string => {
  switch (type) {
    case "DELIVERY":
      return "배달";
    case "GROCERY":
      return "장보기";
    case "HOUSEHOLD":
      return "생필품";
    case "time":
      return ""; // label prop 사용
    default:
      return "";
  }
};

const PartyDetailPill = ({ type, label }: PartyDetailPillProps) => {
  const icon = getIconByType(type);
  const displayLabel = type === "time" ? label : getLabelByType(type);

  return (
    <View style={styles.pill}>
      {icon && (
        <Image source={icon} style={styles.pillIcon} resizeMode="contain" />
      )}
      <Text style={[styles.pillText, textStyles.body12_M135]}>
        {displayLabel}
      </Text>
    </View>
  );
};

export default PartyDetailPill;

const styles = StyleSheet.create({
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: "#F1F1F1",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 100,
  },
  pillText: {
    color: colors.gray[1],
  },
  pillIcon: {
    width: 24,
    height: 24,
  },
});
