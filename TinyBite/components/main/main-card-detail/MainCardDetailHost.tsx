import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { Image, StyleSheet, Text, View } from "react-native";

interface MainCardDetailHostProps {
  avatar: any;
  //url: string;
  name: string;
  location: string;
}

const MainCardDetailHost = ({
  avatar,
  name,
  location,
}: MainCardDetailHostProps) => {
  return (
    <View style={styles.rowBetween}>
      <View style={styles.hostRow}>
        <Image
          //source={{ uri: url }}
          source={require("@/assets/images/mainlist/detail/default-host-profile.png")}
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
    </View>
  );
};

export default MainCardDetailHost;

const styles = StyleSheet.create({
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  hostRow: {
    flexDirection: "row",
    gap: 9,
  },
  hostAvatarImage: {
    width: 40,
    height: 40,
  },
  hostName: {
    color: "#000000",
  },
  hostMetaRow: {
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  hostMetaIcon: {
    padding: 1,
    width: 18,
    height: 18,
  },
  hostMeta: {
    color: colors.gray[1],
  },
});
