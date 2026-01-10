import { postCheckSms, postSendSms } from "@/api/authApi";
import PaginationIndecatorHeader from "@/components/PaginationIndecatorHeader";
import { useSignupStore } from "@/stores/signupStore";
import { useTimerStore } from "@/stores/timerStore";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { ApiError } from "@/types/api";
import { formatSeconds } from "@/utils/formatSeconds";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShallow } from "zustand/shallow";

const CHECKBOX_ON_IMAGE = require("@/assets/images/verify-number/verify-number-on.png");
const CHECKBOX_OFF_IMAGE = require("@/assets/images/verify-number/verify-number-off.png");

export default function VerifyScreen() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [verified, setVerified] = useState(false);

  const { status, startTimer, timeLeft, resetTimer } = useTimerStore();
  const { phoneNumber } = useSignupStore(
    useShallow((state) => ({
      phoneNumber: state.phoneNumber,
    }))
  );

  const smsResendMutation = useMutation({
    mutationFn: postSendSms,
    onSuccess: (data) => {
      startTimer(180);
    },
    onError: (error: AxiosError<ApiError>) => {
      if (error.response?.data) {
        const message = getErrorMessage(error.response.data);
        console.error(message);
      } else {
        console.error("네트워크 연결을 확인해주세요.");
      }
    },
  });

  const smsCheckMutation = useMutation({
    mutationFn: postCheckSms,
    onSuccess: (data) => {
      setVerified(true);
    },
    onError: (error: AxiosError<ApiError>) => {
      setVerified(false);
      if (error.response?.data) {
        const message = getErrorMessage(error.response.data);
        alert(message);
        console.error(message);
      } else {
        console.error("네트워크 연결을 확인해주세요.");
      }
    },
  });

  const handleResendSms = () => {
    setCode("");
    smsResendMutation.mutate({
      phone: phoneNumber,
    });
  };

  useEffect(() => {
    if (status === "done") {
      alert("인증 시간이 만료되었어요.");
    }
  }, [status]);

  const handleCodeChange = useCallback(
    (text: string) => {
      const rawNumber = text.replace(/[^0-9]/g, "");
      setCode(rawNumber);

      if (rawNumber.length === 6) {
        console.log("6자리 입력 완료된 값:", rawNumber);
        smsCheckMutation.mutate({
          phone: phoneNumber,
          authCode: rawNumber,
        });
      } else {
        setVerified(false);
      }
    },
    [phoneNumber, smsCheckMutation]
  );

  const handleClickNextButton = async () => {
    resetTimer();
    router.push("/signup/nickname");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.inner}>
        {/* 헤더 */}
        <View style={{ marginBottom: 24 }}>
          <PaginationIndecatorHeader page={1} />
        </View>

        {/* 인증 번호 입력 */}
        <Text
          style={[styles.title, textStyles.title24_SB135]}
        >{`인증 번호를 \n입력해 주세요.`}</Text>
        <View style={styles.verifyContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              value={code}
              onChangeText={handleCodeChange}
              placeholder="00000"
              placeholderTextColor={colors.gray[1]}
              keyboardType="numeric"
              style={[styles.input, textStyles.title18_SB135]}
              maxLength={6}
              autoFocus={true}
            />
            <Image
              source={verified ? CHECKBOX_ON_IMAGE : CHECKBOX_OFF_IMAGE}
              style={styles.inputCheckbox}
            />
          </View>
          <TouchableOpacity onPress={handleResendSms}>
            <View style={styles.resend}>
              <Text style={[styles.resendText, textStyles.title18_SB135]}>
                재발송
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.timerContainer}>
          <Text style={[styles.timer, textStyles.body15_SB135]}>
            남은 시간 {formatSeconds(timeLeft)}
          </Text>
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
  verifyContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 8,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 4,
    padding: 12,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 0,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
  },
  input: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  inputCheckbox: {
    width: 28,
    height: 28,
    aspectRatio: 1 / 1,
  },
  resend: {
    flex: 1,
    backgroundColor: colors.sub,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  resendText: {
    color: colors.main,
  },

  timerContainer: {
    flexDirection: "row",
  },
  timer: { color: colors.gray[1] },

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
