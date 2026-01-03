import { useCreatingPartyStore } from "@/stores/creatingPartyStore";
import { useEditPartyStore } from "@/stores/editPartyStore";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useShallow } from "zustand/shallow";

interface SubTitleProps {
  subTitle: string;
  caption?: string;
  isPic?: boolean;
}

const SubTitle = ({ subTitle, caption, isPic }: SubTitleProps) => {
  const { mode } = useLocalSearchParams<{
    mode?: string;
  }>();
  const isEditingMode = mode === "edit";

  const { photos: createPhotos } = useCreatingPartyStore(
    useShallow((state) => ({
      photos: state.photos,
    }))
  );

  const { photos: editPhotos } = useEditPartyStore(
    useShallow((state) => ({
      photos: state.photos,
    }))
  );

  return (
    <View style={styles.container}>
      <View style={styles.subTitleContainer}>
        <Text style={[styles.subTitleText, textStyles.title18_SB135]}>
          {subTitle}
        </Text>

        {isPic ? (
          <Text style={[styles.picCaptionText, textStyles.body16_B150]}>
            ({isEditingMode ? editPhotos.length : createPhotos.length}/5)
          </Text>
        ) : (
          <Text style={[styles.captionText, textStyles.body16_SB135]}>
            {caption}
          </Text>
        )}
      </View>

      {isPic && (
        <Text style={[styles.picDescription, textStyles.body12_M135]}>
          사진을 눌러 대표 이미지를 설정하세요.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  subTitleText: {
    color: colors.black,
  },
  picCaptionText: {
    color: colors.main,
  },
  captionText: {
    color: colors.gray[1],
  },
  picDescription: {
    color: colors.gray[1],
  },
});

export default SubTitle;
