import { useCreatingPartyStore } from "@/stores/creatingPartyStore";
import { useEditPartyStore } from "@/stores/editPartyStore";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import { Alert, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useShallow } from "zustand/shallow";

const CAMERA_ICON = require("@/assets/images/camera-24-gray.png");

const AddPhotoButton = () => {
  const { mode } = useLocalSearchParams<{
    mode?: string;
  }>();
  const isEditingMode = mode === "edit";

  const { addPhoto: createAddPhoto, photos: createPhotos } =
    useCreatingPartyStore(
      useShallow((state) => ({
        addPhoto: state.addPhoto,
        photos: state.photos,
      }))
    );
  const { addPhoto: editAddPhoto, photos: editPhotos } = useEditPartyStore(
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
        "권한이 필요해요",
        "사진을 선택하려면 기기의 사진 접근 권한을 허용해 주세요."
      );
      return;
    }

    if (isEditingMode ? editPhotos.length >= 5 : createPhotos.length >= 5)
      return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];

      const manipulatedImage = await ImageManipulator.manipulateAsync(
        asset.uri,
        [{ resize: { width: 1024 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );

      if (isEditingMode) {
        editAddPhoto(
          manipulatedImage.uri,
          asset.mimeType || "image/jpeg",
          asset.fileName || "photo"
        );
      } else {
        createAddPhoto(
          manipulatedImage.uri,
          asset.mimeType || "image/jpeg",
          asset.fileName || "photo"
        );
      }
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
