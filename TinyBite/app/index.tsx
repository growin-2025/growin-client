import { useUserQuery } from "@/hooks/queries/useUser";
import { useAuthStore } from "@/stores/authStore";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

export default function Index() {
  const [loaded, error] = useFonts({
    "Pretendard-Black": require("@/assets/fonts/Pretendard-Black.otf"),
    "Pretendard-Bold": require("@/assets/fonts/Pretendard-Bold.otf"),
    "Pretendard-ExtraBold": require("@/assets/fonts/Pretendard-ExtraBold.otf"),
    "Pretendard-ExtraLight": require("@/assets/fonts/Pretendard-ExtraLight.otf"),
    "Pretendard-Light": require("@/assets/fonts/Pretendard-Light.otf"),
    "Pretendard-Medium": require("@/assets/fonts/Pretendard-Medium.otf"),
    "Pretendard-Regular": require("@/assets/fonts/Pretendard-Regular.otf"),
    "Pretendard-SemiBold": require("@/assets/fonts/Pretendard-SemiBold.otf"),
    "Pretendard-Thin": require("@/assets/fonts/Pretendard-Thin.otf"),
  });

  const [tokenChecked, setTokenChecked] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  const { setUser } = useAuthStore();

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useUserQuery({
    enabled: tokenChecked && hasToken,
  });

  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync("accessToken");
      setHasToken(!!token);
      setTokenChecked(true);
    };

    checkToken();
  }, []);

  useEffect(() => {
    const handleAuthFlow = async () => {
      // 1. 아직 준비 안 됨
      if (!loaded || error || !tokenChecked) return;

      // 2. 토큰 없음 → 로그인
      if (!hasToken) {
        router.replace("/(auth)/login/login");
        return;
      }

      // 3. 토큰은 있는데 유저 로딩 중 → 대기
      if (isUserLoading) {
        return;
      }

      // 4. 유저 조회 실패 → 로그인으로
      if (isUserError) {
        await SecureStore.deleteItemAsync("accessToken");
        await SecureStore.deleteItemAsync("refreshToken");
        router.replace("/(auth)/login/login");
        return;
      }

      // 5. 유저 있음 → 저장 후 메인
      if (user) {
        setUser(user);
        router.replace("/(tabs)");
      }
    };

    handleAuthFlow();
  }, [
    loaded,
    error,
    tokenChecked,
    hasToken,
    isUserLoading,
    isUserError,
    user,
    setUser,
  ]);

  return null;
}
