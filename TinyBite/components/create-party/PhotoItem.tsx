import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const X_MARK_ICON = require("@/assets/images/x-mark-14-gray.png");

interface PhotoItemProps {
  id: string;
  url: string;
  representativePhoto: string;
  setRepresentativePhoto: (number: string) => void;
}

const PhotoItem = ({
  id,
  url,
  representativePhoto,
  setRepresentativePhoto,
}: PhotoItemProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={() => setRepresentativePhoto(id)}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: url }} resizeMode="cover" />

        {id === representativePhoto && (
          <View style={styles.textContainer}>
            <Text style={[styles.text, textStyles.body12_M135]}>대표</Text>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.xButton}>
        <Image style={styles.xIcon} source={X_MARK_ICON} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "flex-end",
    width: 64,
    height: 64,
  },
  imageContainer: {
    position: "relative",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: 60,
    height: 60,
  },
  textContainer: {
    position: "absolute",
    bottom: 4,
    right: 4,
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 100,
    backgroundColor: colors.main,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    elevation: 4,
  },
  text: { color: "#fff" },

  xButton: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 16,
    height: 16,
    padding: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: colors.gray[4],
  },
  xIcon: {
    width: 14,
    height: 14,
  },
});

export default PhotoItem;
