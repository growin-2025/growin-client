import { getCheckNickname } from "@/api/authApi";
import PaginationIndecatorHeader from "@/components/PaginationIndecatorHeader";
import { useSignupStore } from "@/stores/signupStore";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { ApiError } from "@/types/api";
import { getErrorMessage } from "@/utils/getErrorMessage ";
import { validateAndFilterNickname } from "@/utils/validateAndFilterText";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useShallow } from "zustand/shallow";

export default function NicknameScreen() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [verified, setVerified] = useState(false);

  const { setNickname } = useSignupStore(
    useShallow((state) => ({
      setNickname: state.setNickname,
    }))
  );

  const CheckNicknameMutation = useMutation({
    mutationFn: getCheckNickname,
    onSuccess: (data) => {
      setNickname(text);
      router.push("/signup/region");
    },
    onError: (error: AxiosError<ApiError>) => {
      if (error.response?.data) {
        if (error.response.data.code === "DUPLICATED_NICKNAME") {
          Toast.show({
            type: "basicToast",
            props: { text: "올바른 URL 형식으로 입력해주세요." },
            position: "bottom",
            bottomOffset: 98,
            visibilityTime: 2000,
          });
          return;
        }
        const message = getErrorMessage(error.response.data);
        alert(message);
        console.error(message);
      } else {
        console.error("네트워크 연결을 확인해주세요.");
      }
    },
  });

  const handleTextChange = useCallback(
    (text: string) => {
      const validatedText = validateAndFilterNickname(text);
      setText(validatedText);

      if (validatedText.length >= 2) {
        setVerified(true);
      } else {
        setVerified(false);
      }
    },
    [setText]
  );

  const handleClickNextButton = () => {
    CheckNicknameMutation.mutate(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.inner}>
        {/* 헤더 */}
        <View style={{ marginBottom: 24 }}>
          <PaginationIndecatorHeader page={2} />
        </View>

        {/* 닉네임 입력 */}
        <Text
          style={[styles.title, textStyles.title24_SB135]}
        >{`사용하실 닉네임을 \n입력해 주세요.`}</Text>
        <View style={styles.inputContainer}>
          <Text style={[styles.label, textStyles.body16_SB135]}>닉네임</Text>
          <View style={{ alignSelf: "stretch" }}>
            <TextInput
              style={[styles.input, textStyles.title18_SB135]}
              onChangeText={handleTextChange}
              value={text}
              placeholder="닉네임 (2~12자)"
              keyboardType="default"
              maxLength={12}
            />
            <Text style={[styles.count, textStyles.body12_M135]}>
              ({text.length}/12)
            </Text>
          </View>
        </View>

        {/* 다음 버튼 */}
        <TouchableOpacity
          style={[styles.nextBtn, !verified && styles.disabled]}
          disabled={!verified}
          onPress={handleClickNextButton}
        >
          <Text style={[styles.nextText, textStyles.title18_SB135]}>다음</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  inner: { flex: 1, position: "relative" },

  title: {
    marginBottom: 28,
    color: colors.main,
  },

  inputContainer: {
    gap: 8,
    padding: 12,
    marginBottom: 8,
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
  label: {
    color: colors.gray[1],
  },
  input: {
    alignSelf: "stretch",
    color: "#000",
    padding: 0,
    margin: 0,
  },
  count: {
    color: colors.gray[2],
    textAlign: "right",
  },

  row: {
    flexDirection: "row",
  },
  status: {
    color: colors.red[1],
  },

  nextBtn: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.main,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 16,
  },
  nextText: {
    color: colors.white,
  },
  disabled: { opacity: 0.3 },
});
