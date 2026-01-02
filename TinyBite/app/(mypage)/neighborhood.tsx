import { getUserMe, updateLocation } from "@/api/userApi";
import { useUserCoords } from "@/hooks/useUserCoords";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { ApiError } from "@/types/api";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function NeighborhoodSettingScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { refresh } = useUserCoords();

  // 현재 사용자 정보 조회
  const { data: userMe, refetch: refetchUserMe } = useQuery({
    queryKey: ["getUserMe"],
    queryFn: getUserMe,
  });

  // 위치 업데이트 mutation
  const updateLocationMutation = useMutation({
    mutationFn: updateLocation,
    onSuccess: async () => {
      // 서버에서 좌표를 주소로 변환하는데 시간이 걸릴 수 있으므로 약간의 딜레이 후 refetch
      setTimeout(async () => {
        await queryClient.invalidateQueries({ queryKey: ["getUserMe"] });
        const { data: updatedUserMe } = await refetchUserMe();
        console.log("업데이트 전 location:", userMe?.location);
        console.log("업데이트 후 location:", updatedUserMe?.location);
        Toast.show({
          type: "basicToast",
          props: { text: "동네 설정이 완료되었습니다." },
          position: "bottom",
          bottomOffset: 98,
          visibilityTime: 2000,
        });
      }, 500); // 0.5초 딜레이
    },
    onError: (error: AxiosError<ApiError>) => {
      if (error.response?.data) {
        const message = getErrorMessage(error.response.data);
        Toast.show({
          type: "basicToast",
          props: { text: message },
          position: "bottom",
          bottomOffset: 98,
          visibilityTime: 2000,
        });
      } else {
        Toast.show({
          type: "basicToast",
          props: { text: "네트워크 연결을 확인해주세요." },
          position: "bottom",
          bottomOffset: 98,
          visibilityTime: 2000,
        });
      }
    },
  });

  const handleFindLocation = async () => {
    try {
      // 1. 현재 위치 가져오기
      const coords = await refresh();
      console.log("가져온 좌표:", coords);
      if (!coords) {
        Toast.show({
          type: "basicToast",
          props: { text: "위치 정보를 가져올 수 없습니다." },
          position: "bottom",
          bottomOffset: 98,
          visibilityTime: 2000,
        });
        return;
      }

      const latitude = coords.latitude.toString();
      const longitude = coords.longitude.toString();
      console.log("전송할 좌표:", { latitude, longitude });

      // 2. 좌표로 위치 업데이트
      await updateLocationMutation.mutateAsync({
        latitude,
        longitude,
      });
    } catch (error) {
      console.error("handleFindLocation 에러:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
          내 동네 설정
        </Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.contentWrapper}>
        {/* 주소 입력/표시 필드 */}
        <View style={styles.addressField}>
          <Image
            source={require("@/assets/images/location.png")}
            style={styles.locationIcon}
            resizeMode="contain"
          />
          <Text style={[styles.addressText, textStyles.title18_SB135]}>
            {userMe?.location || "로딩 중..."}
          </Text>
        </View>

        {/* 현재 위치로 주소 찾기 버튼 */}
        <Pressable
          style={[
            styles.findLocationButton,
            updateLocationMutation.isPending &&
              styles.findLocationButtonDisabled,
          ]}
          onPress={handleFindLocation}
          disabled={updateLocationMutation.isPending}
        >
          <Image
            source={require("@/assets/images/location-tracking.png")}
            style={styles.targetIcon}
            resizeMode="contain"
          />
          <Text style={[styles.findLocationText, textStyles.body16_SB135]}>
            {updateLocationMutation.isPending
              ? "처리 중..."
              : "현재 위치로 주소 찾기"}
          </Text>
        </Pressable>
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
    padding: 1,
  },
  headerTitle: {
    color: colors.black,
  },
  placeholder: {
    width: 36,
    height: 36,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
  addressField: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    gap: 4,
    // 그림자 효과 (elevation = 4.dp, spotColor/ambientColor = Color(0x40000000))
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  locationIcon: {
    width: 24,
    height: 24,
    padding: 1,
  },
  addressText: {
    flex: 1,
    color: colors.black,
  },
  findLocationButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.main,
    borderRadius: 16,
    padding: 10,
    gap: 4,
  },
  targetIcon: {
    width: 24,
    height: 24,
    padding: 1,
    tintColor: colors.white,
  },
  findLocationText: {
    color: colors.white,
  },
  findLocationButtonDisabled: {
    opacity: 0.6,
  },
});
