import { usecreatingPartyStore } from "@/stores/creatingPartyStore";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { StyleSheet, Text, View } from "react-native";
import { useShallow } from "zustand/shallow";

interface SubTitleProps {
  subTitle: string;
  caption?: string;
  isPic?: boolean;
}

const SubTitle = ({ subTitle, caption, isPic }: SubTitleProps) => {
  const { photos } = usecreatingPartyStore(
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
            ({photos.length}/5)
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
