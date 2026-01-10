import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { Image, StyleSheet, Text, View } from "react-native";

interface PartyDetailProductLinkProps {
  productTitle?: string | null;
  productUrl: string;
  thumbnailImage?: string | null;
}

const PartyDetailProductLink = ({
  productTitle,
  productUrl,
  thumbnailImage,
}: PartyDetailProductLinkProps) => {
  return (
    <View style={styles.linkSection}>
      <View style={styles.linkHeader}>
        <Image
          source={require("@/assets/images/mainlist/detail/host-link.png")}
          style={styles.linkIcon}
          resizeMode="contain"
        />
        <Text style={[styles.linkLabel, textStyles.body13_SB135]}>
          구매 예정 상품
        </Text>
      </View>
      <View style={styles.linkContent}>
        {thumbnailImage && (
          <Image
            source={{ uri: thumbnailImage }}
            style={styles.linkPhoto}
            resizeMode="cover"
          />
        )}
        <View style={styles.linkTexts}>
          {productTitle?.trim() && (
            <Text style={[styles.linkTitle, textStyles.body13_SB150]}>
              {productTitle}
            </Text>
          )}
          <Text style={[styles.linkUrl, textStyles.body13_M135]}>
            {productUrl}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PartyDetailProductLink;

const styles = StyleSheet.create({
  linkSection: {
    marginTop: 16,
    alignSelf: "center",
    width: "100%",
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
  },
  linkHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  linkContent: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  linkIcon: {
    width: 20,
    height: 20,
    tintColor: colors.gray[2],
  },
  linkLabel: {
    color: colors.gray[1],
  },
  linkPhoto: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  linkTexts: {
    flex: 1,
    gap: 2,
    justifyContent: "center",
  },
  linkTitle: {
    color: colors.black,
  },
  linkUrl: {
    color: colors.black,
  },
});
