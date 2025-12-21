import { usecreatingPartyStore } from "@/stores/creatingPartyStore";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import * as ImagePicker from "expo-image-picker";
import { Alert, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useShallow } from "zustand/shallow";

const CAMERA_ICON = require("@/assets/images/camera-24-gray.png");

const AddPhotoButton = () => {
  const { addPhoto, photos } = usecreatingPartyStore(
    useShallow((state) => ({
      addPhoto: state.addPhoto,
      photos: state.photos,
    }))
  );

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required."
      );
      return;
    }

    if (photos.length >= 5) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      addPhoto(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={pickImage}>
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
