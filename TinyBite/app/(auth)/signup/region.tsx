import { getLocationName, postSignupGoogle } from "@/api/authApi";
import PaginationIndecatorHeader from "@/components/PaginationIndecatorHeader";
import { useUserCoords } from "@/hooks/useUserCoords";
import { TermCode, useSignupStore } from "@/stores/signupStore";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { ApiError } from "@/types/api";
import { getErrorMessage } from "@/utils/getErrorMessage ";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShallow } from "zustand/shallow";

export default function RegionScreen() {
  const router = useRouter();
  const { loading, refresh } = useUserCoords();

  const {
    googleIdToken,
    phoneNumber,
    terms,
    nickname,
    locationName,
    setLocationName,
    resetSignupStore,
  } = useSignupStore(
    useShallow((state) => ({
      googleIdToken: state.googleIdToken,
      phoneNumber: state.phoneNumber,
      terms: state.terms,
      nickname: state.nickname,
      locationName: state.locationName,
      setLocationName: state.setLocationName,
      resetSignupStore: state.resetSignupStore,
    }))
  );

  const GetLocationNameMutation = useMutation({
    mutationFn: getLocationName,
    onSuccess: (data) => {},
    onError: (error: AxiosError<ApiError>) => {
      if (error.response?.data) {
        const message = getErrorMessage(error.response.data);
        alert(message);
        console.error(message);
      } else {
        console.error("네트워크 연결을 확인해주세요.");
      }
    },
  });

  const SignupMutation = useMutation({
    mutationFn: postSignupGoogle,
    onSuccess: (data) => {
      console.log("postSignupGoogle >>", data);
      resetSignupStore();
      router.replace("/(auth)/signup/complete");
    },
    onError: (error: AxiosError<ApiError>) => {
      if (error.response?.data) {
        const message = getErrorMessage(error.response.data);
        alert(message);
        console.error(message);
      } else {
        console.error("네트워크 연결을 확인해주세요.");
      }
    },
  });

  // const handleTextChange = useCallback((text: string) => {
  //   setText(text);
  //   setVerified(true);
  // }, []);

  const handleClickFindLocation = async () => {
    const latestCoords = await refresh();
    console.log("latestCoords >>", latestCoords);

    if (latestCoords) {
      const data = await GetLocationNameMutation.mutateAsync({
        latitude: latestCoords.latitude.toString(),
        longitude: latestCoords.longitude.toString(),
      });
      console.log("data >>", data);
      setLocationName(data);
    }
  };

  const handleClickNextButton = async () => {
    const checkedTerms = (Object.keys(terms) as TermCode[]).filter(
      (term) => terms[term]
    );

    SignupMutation.mutate({
      idToken: googleIdToken,
      phone: phoneNumber,
      nickname: nickname,
      location: locationName,
      platform: Platform.OS.toUpperCase() as "ANDROID" | "IOS",
      agreedTerms: checkedTerms,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.inner}>
        {/* 헤더 */}
        <View style={{ marginBottom: 24 }}>
          <PaginationIndecatorHeader page={3} />
        </View>

        {/* 동네 설정 */}
        <View style={{ marginBottom: 10 }}>
          <Text
            style={[styles.title, textStyles.title24_SB135]}
          >{`내 동네를 설정하고 \n근처 이웃과 딱 필요한 만큼 나눠요!`}</Text>

          <View style={styles.inputContainer}>
            <Image
              source={require("@/assets/images/location.png")}
              style={{ width: 24, height: 24, aspectRatio: 1 / 1 }}
            />
            <TextInput
              style={[styles.input, textStyles.title18_SB135]}
              // onChangeText={handleTextChange}
              value={locationName}
              placeholder="동명(읍,면)으로 검색 (ex.역삼동)"
              placeholderTextColor={colors.gray[1]}
              keyboardType="default"
              editable={false}
            />
          </View>

          <TouchableOpacity
            style={styles.findBtn}
            onPress={handleClickFindLocation}
            disabled={loading}
          >
            <Image
              source={require("@/assets/images/location-tracking.png")}
              style={{ width: 24, height: 24, aspectRatio: 1 / 1 }}
            />
            <Text style={[styles.findText, textStyles.body15_SB135]}>
              {loading ? "위치 확인 중..." : "현재 위치로 주소 찾기"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* <LocationSearchResult /> */}

        {/* 다음 버튼 */}
        <TouchableOpacity
          style={[styles.nextBtn, !locationName && styles.disabled]}
          disabled={!locationName}
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
    flexDirection: "row",
    gap: 4,
    padding: 12,
    marginBottom: 12,
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
  input: {
    flex: 1,
    alignSelf: "stretch",
    color: "#000",
    padding: 0,
    margin: 0,
  },
  findBtn: {
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    borderRadius: 16,
    backgroundColor: colors.main,
  },
  findText: {
    color: colors.white,
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
