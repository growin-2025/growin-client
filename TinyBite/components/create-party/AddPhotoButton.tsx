import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

const CAMERA_ICON = require("@/assets/images/camera-24-gray.png");

const AddPhotoButton = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image style={styles.image} source={CAMERA_ICON} />
      <Text style={[styles.text, textStyles.body16_SB135]}>추가</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    borderRadius: 16,
    backgroundColor: colors.white,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    width: 24,
    height: 24,
  },
  text: {
    color: colors.gray[2],
  },
});

export default AddPhotoButton;
