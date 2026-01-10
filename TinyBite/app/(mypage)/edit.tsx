import { checkNickname, getUserMe, updateNickname } from "@/api/userApi";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { ApiError } from "@/types/api";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function EditProfileScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const maxLength = 13; // 13자까지 입력 가능
  const displayMaxLength = 12; // 표시는 12자로
  const minLength = 2;

  // 현재 사용자 정보 조회
  const { data: userMe } = useQuery({
    queryKey: ["getUserMe"],
    queryFn: getUserMe,
  });

  // 닉네임 상태 관리
  const [nickname, setNickname] = useState("");

  // 사용자 정보가 로드되면 닉네임 초기화
  useEffect(() => {
    if (userMe?.name) {
      setNickname(userMe.name);
    }
  }, [userMe]);

  // 닉네임 수정 mutation
  const updateNicknameMutation = useMutation({
    mutationFn: updateNickname,
    onSuccess: () => {
      // 사용자 정보 쿼리 무효화하여 최신 데이터 가져오기
      queryClient.invalidateQueries({ queryKey: ["getUserMe"] });
      Toast.show({
        type: "basicToast",
        props: { text: "닉네임이 수정되었습니다." },
        position: "bottom",
        bottomOffset: 98,
        visibilityTime: 2000,
      });
      router.back();
    },
    onError: (error: AxiosError<ApiError>) => {
      if (error.response?.data) {
        const message = getErrorMessage(error.response.data);
        Toast.show({
          type: "error",
          text1: message,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "네트워크 연결을 확인해주세요.",
        });
      }
    },
  });

  // 닉네임 입력 핸들러 (검증 및 필터링)
  // - 한글, 영문, 숫자만 허용
  // - 특수문자/띄어쓰기/이모지 자동 제거
  // - 최대 13자까지 입력 가능, 표시는 12자로
  const handleNicknameChange = useCallback(
    (text: string) => {
      // 13자 입력 시 토스트 표시
      if (text.length === maxLength) {
        Toast.show({
          type: "basicToast",
          props: { text: "닉네임은 최대 12자까지 가능해요." },
          position: "bottom",
          bottomOffset: 98,
          visibilityTime: 2000,
        });
      }
      // 한글, 영문, 숫자만 허용하고 최대 13자까지 입력 가능
      const filtered = text.replace(/[^ㄱ-힣a-zA-Z0-9]/g, "");
      const validatedText = filtered.substring(0, maxLength);
      setNickname(validatedText);
    },
    [maxLength]
  );

  // 닉네임 중복 체크 mutation
  const checkNicknameMutation = useMutation({
    mutationFn: checkNickname,
    onSuccess: () => {
      // 중복 체크 성공 시 닉네임 수정
      updateNicknameMutation.mutate(nickname.trim());
    },
    onError: (error: AxiosError<ApiError>) => {
      if (error.response?.data) {
        if (error.response.data.code === "DUPLICATED_NICKNAME") {
          Toast.show({
            type: "basicToast",
            props: { text: "이미 사용 중인 닉네임이에요." },
            position: "bottom",
            bottomOffset: 98,
            visibilityTime: 2000,
          });
          return;
        }
        const message = getErrorMessage(error.response.data);
        Toast.show({
          type: "error",
          text1: message,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "네트워크 연결을 확인해주세요.",
        });
      }
    },
  });

  // 유효성 검사
  const isValid =
    nickname.length >= minLength &&
    nickname.length <= displayMaxLength &&
    nickname.trim() !== "";
  const hasChanged = nickname !== userMe?.name;
  const canSave = isValid && hasChanged;

  // 완료 버튼 핸들러
  const handleSave = () => {
    if (
      !canSave ||
      updateNicknameMutation.isPending ||
      checkNicknameMutation.isPending
    ) {
      return;
    }
    // 닉네임 중복 체크 후 수정
    checkNicknameMutation.mutate(nickname.trim());
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style="dark" />
      {/* Header */}
      <View style={styles.headerWrapper}>
        <Pressable onPress={() => router.back()}>
          <Image
            source={require("@/assets/images/chevron/chevron-left-44.png")}
            style={styles.backIcon}
          />
        </Pressable>
        <Text style={[styles.headerTitle, textStyles.title20_B135]}>
          프로필 수정
        </Text>
        <Pressable
          onPress={handleSave}
          disabled={
            !canSave ||
            updateNicknameMutation.isPending ||
            checkNicknameMutation.isPending
          }
        >
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

      {/* Content */}
      <View style={styles.contentWrapper}>
        {/* Profile Picture */}
        <View style={styles.profileImageWrapper}>
          <Image
            source={require("@/assets/images/mainlist/detail/default-host-profile.png")}
            style={styles.profileImage}
            resizeMode="cover"
          />
          <Pressable style={styles.cameraButton}>
            <Image
              source={require("@/assets/images/mypage/camera.png")}
              style={{
                width: 24,
                height: 24,
                resizeMode: "contain",
              }}
            />
          </Pressable>
        </View>

        <View style={styles.nicknameInputWrapper}>
          <Text style={[styles.nicknameLabel, textStyles.body16_SB135]}>
            닉네임
          </Text>
          <View style={{ alignSelf: "stretch" }}>
            <TextInput
              style={[styles.nicknameInput, textStyles.title18_SB135]}
              onChangeText={handleNicknameChange}
              value={nickname}
              placeholder="수정할 닉네임을 입력하세요"
              keyboardType="default"
              maxLength={maxLength}
            />
          </View>
          <Text style={[styles.charCount, textStyles.body12_M135]}>
            ({Math.min(nickname.length, displayMaxLength)}/{displayMaxLength})
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
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
  contentWrapper: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: colors.background,
    alignItems: "center",
  },
  profileImageWrapper: {
    position: "relative",
    marginBottom: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.25)",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
  },
  nicknameInputWrapper: {
    width: "100%",
    gap: 8,
    padding: 12,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 0,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
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
