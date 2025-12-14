import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { Image, StyleSheet, Text, View } from "react-native";

type InfoType = "location" | "group" | "money";

interface InfoItem {
  type: InfoType;
  title: string;
  meta: string;
}

interface MainCardDetailInfoProps {
  items: InfoItem[];
}

const getIconByType = (type: InfoType) => {
  switch (type) {
    case "location":
      return require("@/assets/images/mainlist/detail/location-icon2.png");
    case "group":
      return require("@/assets/images/mainlist/detail/group-icon.png");
    case "money":
      return require("@/assets/images/mainlist/detail/money-icon.png");
    default:
      return require("@/assets/images/mainlist/detail/location-icon2.png");
  }
};

const MainCardDetailInfo = ({ items }: MainCardDetailInfoProps) => {
  return (
    <>
      <View style={styles.infoRowWrapper}>
        {items.map((item, index) => (
          <View key={index} style={styles.infoRow}>
            <View style={styles.infoIconWrap}>
              <Image
                source={getIconByType(item.type)}
                style={styles.infoIcon}
                resizeMode="contain"
              />
            </View>
            <View style={styles.infoBlock}>
              <Text style={[styles.infoTitle, textStyles.body16_SB135]}>
                {item.title}
              </Text>
              <Text style={[styles.infoMeta, textStyles.body12_M135]}>
                {item.meta}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );
};

export default MainCardDetailInfo;

const styles = StyleSheet.create({
  infoRowWrapper: {
    gap: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoBlock: {
    flex: 1,
  },
  infoTitle: {
    color: "#000000",
  },
  infoIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.sub,
    paddingHorizontal: 3,
    paddingVertical: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  infoIcon: {
    width: 32,
    height: 32,
  },
  infoMeta: {
    color: colors.gray[1],
  },
});
