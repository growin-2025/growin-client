import { useCreatingPartyStore } from "@/stores/creatingPartyStore";
import { useEditPartyStore } from "@/stores/editPartyStore";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useShallow } from "zustand/shallow";

const X_MARK_ICON = require("@/assets/images/x-mark-14-gray.png");

interface PhotoItemProps {
  id: number;
  imageUri: string;
}

const PhotoItem = ({ id, imageUri }: PhotoItemProps) => {
  const { mode } = useLocalSearchParams<{
    mode?: string;
  }>();
  const isEditingMode = mode === "edit";

  const {
    deletePhoto: createDeletePhoto,
    representativePhoto: createRepresentativePhoto,
    setRepresentativePhoto: createSetRepresentativePhoto,
  } = useCreatingPartyStore(
    useShallow((state) => ({
      deletePhoto: state.deletePhoto,
      representativePhoto: state.representativePhoto,
      setRepresentativePhoto: state.setRepresentativePhoto,
    }))
  );

  const {
    deletePhoto: editDeletePhoto,
    representativePhoto: editRepresentativePhoto,
    setRepresentativePhoto: editSetRepresentativePhoto,
  } = useEditPartyStore(
    useShallow((state) => ({
      deletePhoto: state.deletePhoto,
      representativePhoto: state.representativePhoto,
      setRepresentativePhoto: state.setRepresentativePhoto,
    }))
  );

  const onClickDeletePhoto = () => {
    if (isEditingMode) {
      editDeletePhoto(id);
    } else {
      createDeletePhoto(id);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={() => {
        if (isEditingMode) {
          editSetRepresentativePhoto(id);
        } else {
          createSetRepresentativePhoto(id);
        }
      }}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: imageUri }}
          resizeMode="cover"
        />

        {id ===
          (isEditingMode
            ? editRepresentativePhoto
            : createRepresentativePhoto) && (
          <View style={styles.textContainer}>
            <Text style={[styles.text, textStyles.body12_M135]}>대표</Text>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.xButton} onPress={onClickDeletePhoto}>
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
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
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
