import { postSmsSend } from "@/api/authApi";
import PaginationIndecatorHeader from "@/components/PaginationIndecatorHeader";
import PhoneNumberInput from "@/components/PhoneNumberInput";
import { SignupTerms } from "@/constants/terms";
import { termTypes, useSignupStore } from "@/stores/signupStore";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { ApiError } from "@/types/api";
import { getErrorMessage } from "@/utils/getErrorMessage ";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShallow } from "zustand/shallow";

const CHECKBOX_ON_IMAGE = require("@/assets/images/checkbox/checkbox-on.png");
const CHECKBOX_OFF_IMAGE = require("@/assets/images/checkbox/checkbox-off.png");

export default function TermsScreen() {
  const router = useRouter();

  const {
    phoneNumber,
    terms,
    isAllEssentialChecked,
    isNextButtonEnabled,
    toggleTerm,
    checkAllEssentialsOnly,
  } = useSignupStore(
    useShallow((state) => ({
      phoneNumber: state.phoneNumber,
      terms: state.terms,
      isAllEssentialChecked: state.getIsCheckedAllEssentialsOnly(),
      isNextButtonEnabled: state.getIsNextButtonEnabled(),
      toggleTerm: state.toggleTerm,
      checkAllEssentialsOnly: state.checkAllEssentialsOnly,
    }))
  );

  const smsSendMutation = useMutation({
    mutationFn: postSmsSend,
    onSuccess: (data) => {
      console.log("성공 처리 >>", data);
      router.push("/signup/verify");
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

  const onClickNextButton = async () => {
    if (phoneNumber) {
      await smsSendMutation.mutateAsync({
        phone: phoneNumber,
      });
    }
  };

  // 전체 동의 항목을 렌더링하는 컴포넌트
  const AllCheckItem = () => {
    return (
      <View>
        <TouchableOpacity
          style={styles.checkRow}
          onPress={checkAllEssentialsOnly}
        >
          {/* 이미지 체크박스 */}
          <Image
            source={
              isAllEssentialChecked ? CHECKBOX_ON_IMAGE : CHECKBOX_OFF_IMAGE
            }
            style={styles.allCheckBoxImage}
          />
          <Text style={[styles.allCheckText, textStyles.title20_SB135]}>
            약관 전체 동의
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // 체크 항목을 렌더링하는 컴포넌트
  const CheckItem = ({
    checkKey,
    required,
    content,
  }: {
    checkKey: termTypes;
    required: boolean;
    content: string;
  }) => {
    return (
      <View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          onPress={() => toggleTerm(checkKey)}
        >
          <View style={styles.checkRow}>
            <Image
              source={terms[checkKey] ? CHECKBOX_ON_IMAGE : CHECKBOX_OFF_IMAGE}
              style={styles.checkBoxImage}
            />
            <Text style={[styles.checkText, textStyles.body16_M135]}>
              <Text>{required ? "(필수)" : "(선택)"}</Text> {content}
            </Text>
          </View>
          <Image
            source={require("@/assets/images/chevron/chevron-right-24.png")}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.inner}>
        {/* 헤더 */}
        <View style={{ marginBottom: 24 }}>
          <PaginationIndecatorHeader page={0} />
        </View>

        {/* 전화번호 입력 */}
        <Text
          style={[styles.title, textStyles.title24_SB135]}
        >{`전화번호를 \n입력해 주세요.`}</Text>
        <View style={{ marginBottom: 60 }}>
          <PhoneNumberInput />
        </View>

        {/* 약관 전체 동의 */}
        <View style={{ marginBottom: 20 }}>
          <AllCheckItem />
        </View>

        {/* 개별 약관 동의 */}
        <View style={{ gap: 12 }}>
          {SignupTerms.map((term) => (
            <CheckItem
              key={term.checkKey}
              checkKey={term.checkKey as termTypes}
              required={term.required}
              content={term.content}
            />
          ))}
        </View>

        {/* 다음 버튼 */}
        <TouchableOpacity
          style={[styles.nextBtn, !isNextButtonEnabled && styles.disabled]}
          disabled={!isNextButtonEnabled}
          onPress={onClickNextButton}
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

  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  allCheckBoxImage: {
    width: 28,
    height: 28,
  },
  checkBoxImage: {
    width: 20,
    height: 20,
  },

  allCheckText: {
    color: colors.black,
  },
  checkText: {
    color: colors.gray[1],
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
