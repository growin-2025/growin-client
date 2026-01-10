import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { getProfileSource } from "@/utils/image";
import { Image, StyleSheet, Text, View } from "react-native";

interface PartyDetailHostProps {
  profileImage?: string;
  name: string;
  location: string;
}

const PartyDetailHost = ({
  profileImage,
  name,
  location,
}: PartyDetailHostProps) => {
  return (
    <View style={styles.rowBetween}>
      <Image
        source={getProfileSource(profileImage)}
        style={styles.hostAvatarImage}
        resizeMode="cover"
      />
      <View>
        <Text style={[styles.hostName, textStyles.body15_SB135]}>{name}</Text>
        <View style={styles.hostMetaRow}>
          <Image
            source={require("@/assets/images/mainlist/detail/location-icon.png")}
            style={styles.hostMetaIcon}
            resizeMode="contain"
          />
          <Text style={[styles.hostMeta, textStyles.body13_SB135]}>
            {location}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PartyDetailHost;

const styles = StyleSheet.create({
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 9,
  },
  hostAvatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  hostName: {
    color: colors.black,
  },
  hostMetaRow: {
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  hostMetaIcon: {
    width: 18,
    height: 18,
  },
  hostMeta: {
    color: colors.gray[1],
  },
});
