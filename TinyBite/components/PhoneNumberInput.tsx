import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const MAX_LENGTH = 11; // 010 1234 5678

/**
 * 사용자 입력 (하이픈 미포함)을 하이픈이 포함된 형식으로 변환합니다.
 * 예: "01012345678" -> "010-1234-5678"
 * @param rawValue 숫자만 포함된 문자열 (최대 11자리)
 * @returns 하이픈이 포함된 형식의 문자열
 */
const formatPhoneNumber = (rawValue: string): string => {
  const numbers = rawValue.replace(/[^0-9]/g, "");
  let formattedNumber = "";

  if (numbers.length > 3) {
    // 4자리 이상일 때: "010-"
    formattedNumber += numbers.substring(0, 3) + "-";
  } else {
    return numbers;
  }

  if (numbers.length > 7) {
    // 8자리 이상일 때: "010-1234-"
    formattedNumber += numbers.substring(3, 7) + "-";
    formattedNumber += numbers.substring(7, MAX_LENGTH);
  } else {
    // 4자리 ~ 7자리일 때: "010-1234" 등
    formattedNumber += numbers.substring(3);
  }

  return formattedNumber;
};

interface PhoneNumberInputProps {
  initialValue?: string;
  onChangeText: (phoneNumber: string) => void;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  initialValue = "",
  onChangeText,
}) => {
  // 실제 TextInput에 표시되는 값 (하이픈 포함)
  const [displayValue, setDisplayValue] = useState(
    formatPhoneNumber(initialValue)
  );
  const label = "휴대폰 번호";

  /**
   * TextInput의 값이 변경될 때 호출되는 핸들러
   * @param text 사용자가 입력한 새로운 텍스트
   */
  const handleTextChange = useCallback(
    (text: string) => {
      // 1. 숫자만 추출하고 최대 길이(11)로 자릅니다.
      const rawNumber = text.replace(/[^0-9]/g, "").substring(0, MAX_LENGTH);

      // 2. 하이픈이 포함된 형식으로 변환합니다.
      const formatted = formatPhoneNumber(rawNumber);

      // 3. 화면에 표시되는 값을 업데이트합니다.
      setDisplayValue(formatted);

      // 4. 숫자만 추출한 값을 부모 컴포넌트로 전달합니다.
      onChangeText(rawNumber);
    },
    [onChangeText]
  );

  return (
    <View style={styles.container}>
      {/* 레이블 텍스트 */}
      <Text style={[styles.label, textStyles.body16_SB135]}>{label}</Text>

      {/* 입력 영역 */}
      <TextInput
        style={[styles.input, textStyles.title18_SB135]}
        onChangeText={handleTextChange}
        value={displayValue}
        placeholder="010 - 1234 - 5678"
        placeholderTextColor={colors.gray[1]}
        keyboardType="numeric"
        maxLength={13} // 하이픈 포함
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    padding: 12,
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
  label: {
    color: colors.gray[1],
  },
  input: {
    color: "#000",
    padding: 0,
    alignSelf: "stretch",
  },
});

export default PhoneNumberInput;
