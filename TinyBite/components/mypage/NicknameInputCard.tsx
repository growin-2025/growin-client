import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface NicknameInputCardProps {
  value: string;
  onChangeText: (text: string) => void;
  maxLength: number;
  displayMaxLength: number;
}

const NicknameInputCard = ({
  value,
  onChangeText,
  maxLength,
  displayMaxLength,
}: NicknameInputCardProps) => {
  return (
    <View style={styles.nicknameInputWrapper}>
      <Text style={[styles.nicknameLabel, textStyles.body16_SB135]}>
        닉네임
      </Text>
      <View style={{ alignSelf: "stretch" }}>
        <TextInput
          style={[styles.nicknameInput, textStyles.title18_SB135]}
          onChangeText={onChangeText}
          value={value}
          placeholder="수정할 닉네임을 입력하세요"
          keyboardType="default"
          maxLength={maxLength}
        />
      </View>
      <Text style={[styles.charCount, textStyles.body12_M135]}>
        ({Math.min(value.length, displayMaxLength)}/{displayMaxLength})
      </Text>
    </View>
  );
};

export default NicknameInputCard;

const styles = StyleSheet.create({
  nicknameInputWrapper: {
    width: "100%",
    gap: 8,
    padding: 12,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 0,
    // 그림자 효과 (iOS)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // 그림자 효과 (Android)
    elevation: 3,
  },
  nicknameLabel: {
    color: colors.gray[1],
  },
  nicknameInput: {
    alignSelf: "stretch",
    color: colors.black,
    padding: 0,
    margin: 0,
    textAlignVertical: "center",
  },
  charCount: {
    color: colors.gray[1],
    alignSelf: "flex-end",
  },
});
