import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface ProfileEditHeaderProps {
  onBack: () => void;
  onSave: () => void;
  canSave: boolean;
  isLoading: boolean;
}

const ProfileEditHeader = ({
  onBack,
  onSave,
  canSave,
  isLoading,
}: ProfileEditHeaderProps) => {
  return (
    <View style={styles.headerWrapper}>
      <Pressable onPress={onBack}>
        <Image
          source={require("@/assets/images/chevron/chevron-left-44.png")}
          style={styles.backIcon}
        />
      </Pressable>
      <Text style={[styles.headerTitle, textStyles.title20_B135]}>
        프로필 수정
      </Text>
      <Pressable onPress={onSave} disabled={!canSave || isLoading}>
        <Text
          style={[
            styles.saveButton,
            canSave ? styles.saveButtonActive : styles.saveButtonInactive,
            textStyles.body16_SB135,
          ]}
        >
          완료
        </Text>
      </Pressable>
    </View>
  );
};

export default ProfileEditHeader;

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    height: 36,
  },
  backIcon: {
    width: 36,
    height: 36,
  },
  headerTitle: {
    color: colors.black,
  },
  saveButton: {
    color: colors.gray[1],
  },
  saveButtonActive: {
    color: colors.main,
  },
  saveButtonInactive: {
    color: colors.gray[1],
  },
});
