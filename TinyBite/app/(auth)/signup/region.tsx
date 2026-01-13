import { getLocationName, postSignupGoogle } from "@/api/authApi";
import { PlaceItem } from "@/app/search/location";
import PaginationIndecatorHeader from "@/components/PaginationIndecatorHeader";
import { useUserCoords } from "@/hooks/useUserCoords";
import { useAuthStore } from "@/stores/authStore";
import { TermCode, useSignupStore } from "@/stores/signupStore";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { ApiError } from "@/types/api.types";
import { SignupRespone } from "@/types/auth.types";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  FlatList,
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

const KAKAO_REST_API_KEY = process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY;
const LOCATION_ICON = require("@/assets/images/location.png");

export default function RegionScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlaceItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<PlaceItem | null>(null);

  const { loading, refresh } = useUserCoords();

  const {
    phoneNumber,
    terms,
    nickname,
    locationName,
    setLocationName,
    resetSignupStore,
  } = useSignupStore(
    useShallow((state) => ({
      phoneNumber: state.phoneNumber,
      terms: state.terms,
      nickname: state.nickname,
      locationName: state.locationName,
      setLocationName: state.setLocationName,
      resetSignupStore: state.resetSignupStore,
    }))
  );

  const { login } = useAuthStore(
    useShallow((state) => ({
      login: state.login,
    }))
  );

  useEffect(() => {
    if (!query) return setResults([]);

    const timeout = setTimeout(() => {
      fetchKakaoPlaces(query);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const fetchKakaoPlaces = async (text: string) => {
    try {
      const url =
        `https://dapi.kakao.com/v2/local/search/keyword.json?` +
        `query=${encodeURIComponent(text)}`;

      const res = await fetch(url, {
        headers: {
          Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
        },
      });

      const json = await res.json();
      setResults(json.documents || []);
    } catch (error) {
      console.error("Kakao place search error:", error);
    }
  };

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
    onSuccess: (data: SignupRespone) => {
      resetSignupStore();
      login({ signup: true, authResponse: data });
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

  const onPressPlace = (item: PlaceItem) => {
    setSelectedItem(item);
    setLocation({
      place: item.place_name,
      latitude: parseFloat(item.y),
      longitude: parseFloat(item.x),
    });
  };

  const handleClickNextButton = async () => {
    const checkedTerms = (Object.keys(terms) as TermCode[]).filter(
      (term) => terms[term]
    );

    const googleIdToken = await SecureStore.getItemAsync("googleIdToken");

    if (googleIdToken) {
      SignupMutation.mutate({
        idToken: googleIdToken,
        phone: phoneNumber,
        nickname: nickname,
        location: locationName,
        platform: Platform.OS.toUpperCase() as "ANDROID" | "IOS",
        agreedTerms: checkedTerms,
      });
    } else {
      alert("googleIdToken이 필요합니다. 로그아웃 후 다시 로그인해주세요.");
    }
  };

  return (
    <>
      <StatusBar style="dark" />

      <View style={styles.container}>
        {/* 헤더 */}
        <SafeAreaView style={{ marginBottom: 24 }} edges={["top"]}>
          <PaginationIndecatorHeader page={3} />
        </SafeAreaView>

        {/* 동네 설정 */}
        <View style={{ paddingVertical: 12, gap: 12, flex: 1 }}>
          <Text style={[styles.title, textStyles.title24_SB135]}>
            {`내 동네를 설정하고 \n근처 이웃과 딱 필요한 만큼 나눠요!`}
          </Text>

          <View style={styles.inputContainer}>
            <Image
              source={LOCATION_ICON}
              style={{ width: 24, height: 24, aspectRatio: 1 / 1 }}
            />
            <TextInput
              style={[styles.inputText, textStyles.title18_SB135]}
              value={query}
              placeholder="동명(읍,면)으로 검색 (ex.역삼동)"
              placeholderTextColor={colors.gray[1]}
              onChangeText={setQuery}
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

          {query.length > 0 && results.length > 0 && (
            <Text style={[styles.resultTitle, textStyles.body15_SB135]}>
              ‘{query}’ 검색 결과
            </Text>
          )}

          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 12 }}
            renderItem={({ item }) => {
              const isSelected = item.id === selectedItem?.id;

              return (
                <TouchableOpacity onPress={() => onPressPlace(item)}>
                  <Text
                    style={[
                      textStyles.body16_M135,
                      isSelected
                        ? [styles.selectedItemText, textStyles.body16_SB135]
                        : styles.itemText,
                    ]}
                  >
                    {item.place_name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* 다음 버튼 */}
        <SafeAreaView edges={["bottom"]}>
          <TouchableOpacity
            style={[styles.nextBtn, !location && styles.disabled]}
            disabled={!location}
            onPress={handleClickNextButton}
          >
            <Text style={[styles.nextText, textStyles.title18_SB135]}>
              다음
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },

  title: {
    marginBottom: 14,
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
    boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
  },
  findBtn: {
    flexDirection: "row",
    paddingVertical: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    borderRadius: 16,
    backgroundColor: colors.main,
  },
  findText: {
    color: colors.white,
  },
  searchBox: {
    flexDirection: "row",
    padding: 12,
    gap: 4,
    alignItems: "flex-end",
    borderRadius: 16,
    backgroundColor: colors.white,
    boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
  },

  inputText: {
    flex: 1,
    padding: 0,
    color: colors.black,
  },
  resultTitle: {
    marginBottom: 12,
    color: colors.gray[1],
  },
  itemText: {
    color: colors.black,
  },
  selectedItemText: {
    color: colors.main,
  },

  nextBtn: {
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
