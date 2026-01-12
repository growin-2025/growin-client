import { useProfileImage } from "@/hooks/useProfileImage";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ProfileImageBottomSheetProps {
  visible: boolean;
  hasProfileImage: boolean;
  onClose: () => void;
}

/**
 * 프로필 이미지 변경 바텀시트 컴포넌트
 * - 카메라, 갤러리에서 이미지 선택
 * - 프로필 이미지 삭제
 */
const ProfileImageBottomSheet = ({
  visible,
  hasProfileImage,
  onClose,
}: ProfileImageBottomSheetProps) => {
  // 프로필 이미지 관련 로직을 커스텀 훅으로 분리
  const { handleImagePicker, handleDeleteImage, isPending } = useProfileImage({
    onSuccess: onClose,
    onError: onClose,
  });

  if (!visible) return null;

  return (
    <>
      {/* 배경 오버레이 */}
      <TouchableOpacity
        style={styles.bottomSheetOverlay}
        activeOpacity={1}
        onPress={isPending ? undefined : onClose}
        disabled={isPending}
      />
      {/* 바텀시트 */}
      <SafeAreaView style={styles.bottomSheet} edges={["bottom"]}>
        {/* 드래그 핸들 */}
        <View style={styles.bottomSheetHandle} />
        {/* 메뉴 옵션 */}
        <TouchableOpacity
          style={styles.bottomSheetOption}
          onPress={isPending ? undefined : () => handleImagePicker("camera")}
          disabled={isPending}
        >
          <Text
            style={[
              styles.bottomSheetOptionText,
              textStyles.title20_SB135,
              isPending && styles.bottomSheetOptionTextDisabled,
            ]}
          >
            카메라
          </Text>
          <View style={styles.bottomSheetDivider} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomSheetOption}
          onPress={isPending ? undefined : () => handleImagePicker("gallery")}
          disabled={isPending}
        >
          <Text
            style={[
              styles.bottomSheetOptionText,
              textStyles.title20_SB135,
              isPending && styles.bottomSheetOptionTextDisabled,
            ]}
          >
            갤러리
          </Text>
          {hasProfileImage && <View style={styles.bottomSheetDivider} />}
        </TouchableOpacity>
        {hasProfileImage && (
          <TouchableOpacity
            style={styles.bottomSheetOption}
            onPress={isPending ? undefined : handleDeleteImage}
            disabled={isPending}
          >
            <Text
              style={[
                styles.bottomSheetOptionText,
                styles.bottomSheetOptionTextDanger,
                textStyles.title20_SB135,
                isPending && styles.bottomSheetOptionTextDisabled,
              ]}
            >
              이미지 삭제
            </Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </>
  );
};

export default ProfileImageBottomSheet;

const styles = StyleSheet.create({
  // 바텀시트 오버레이
  bottomSheetOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 100,
  },
  // 바텀시트
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 8,
    paddingBottom: 30,
    zIndex: 101,
  },
  // 드래그 핸들
  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#CCCCCC",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 24,
  },
  // 바텀시트 옵션
  bottomSheetOption: {
    alignItems: "center",
  },
  // 구분선
  bottomSheetDivider: {
    width: "80%",
    height: 1,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: colors.gray[4],
  },
  bottomSheetOptionText: {
    color: colors.black,
  },
  bottomSheetOptionTextDanger: {
    color: colors.red[1],
  },
  bottomSheetOptionTextDisabled: {
    opacity: 0.5,
  },
});
