import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { PartyItem } from "@/types/party";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

interface MainCardProps {
  item: PartyItem;
  onPress?: () => void;
  containerStyle?: ViewStyle;
}

const MainCard = ({ item, onPress, containerStyle }: MainCardProps) => {
  // item이 없으면 렌더링하지 않음
  if (!item) {
    return null;
  }

  // 가격 포맷팅 (예: 5000 -> "5,000원")
  const formattedPrice = `${item.pricePerPerson.toLocaleString()}원`;

  return (
    <Pressable onPress={onPress} style={[styles.card, containerStyle]}>
      <View style={styles.thumbnailContainer}>
        <Image
          source={{ uri: item.thumbnailImage }}
          style={styles.thumbnail}
          resizeMode="cover"
          blurRadius={item.isClosed ? 5 : 0}
        />
        {item.isClosed && <View style={styles.overlay} />}
      </View>
      <View style={styles.cardBody}>
        <View>
          <Text
            style={[styles.title, textStyles.body16_B150]}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <Text style={[styles.price, textStyles.body15_SB135]}>
            {formattedPrice}
          </Text>
        </View>
        <View style={styles.footerRow}>
          <View style={[styles.badge, item.isClosed && styles.badgeClosed]}>
            <Text
              style={[
                styles.badgeText,
                item.isClosed && styles.badgeTextClosed,
                textStyles.body13_SB135,
              ]}
            >
              {item.isClosed ? "마감" : item.participantStatus}
            </Text>
          </View>
          <Text style={[styles.meta, textStyles.body13_SB135]}>
            {item.distance} | {item.timeAgo}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default MainCard;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 122,
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    /* shadow */
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 4,
  },
  thumbnailContainer: {
    width: 90,
    height: 90,
    borderRadius: 16,
    position: "relative",
  },
  thumbnail: {
    width: 90,
    height: 90,
    borderRadius: 16,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 16,
  },
  cardBody: {
    flex: 1,
    height: "100%",
    justifyContent: "space-between",
  },
  title: {
    color: "#000000",
  },
  price: {
    marginTop: 4,
    color: "#000000",
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  badge: {
    backgroundColor: colors.main,
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeClosed: {
    backgroundColor: colors.gray[2],
  },
  badgeText: {
    color: colors.white,
  },
  badgeTextClosed: {
    color: colors.white,
  },
  meta: {
    color: colors.gray[1],
  },
});
