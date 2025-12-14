import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const MainCard = ({ onPress }: { onPress?: () => void }) => (
  <Pressable onPress={onPress} style={styles.card}>
    <Image
      source={require("@/assets/images/mainlist/food1.jpg")}
      style={styles.thumbnail}
    />
    <View style={styles.cardBody}>
      <View>
        <Text style={[styles.title, textStyles.body16_B150]}>
          후문 엽떡 나누실 분 ㅃㄹ
        </Text>
        <Text style={[styles.price, textStyles.body15_SB135]}>5,000원</Text>
      </View>
      <View style={styles.footerRow}>
        <View style={styles.badge}>
          <Text style={[styles.badgeText, textStyles.body13_SB135]}>1/4명</Text>
        </View>
        <Text style={[styles.meta, textStyles.body13_SB135]}>
          10KM 이내 | 10분 전
        </Text>
      </View>
    </View>
  </Pressable>
);

export default MainCard;

const styles = StyleSheet.create({
  card: {
    width: 362,
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
  thumbnail: {
    width: 90,
    height: 90,
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
    marginTop: 6,
    color: "#000000",
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  badge: {
    backgroundColor: colors.main,
    padding: 0.5,
    width: 51,
    height: 26,
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: colors.white,
  },
  meta: {
    color: colors.gray[1],
  },
});
