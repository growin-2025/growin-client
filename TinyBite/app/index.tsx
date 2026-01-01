import { useFonts } from "expo-font";
import { router } from "expo-router";
import { useEffect } from "react";

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

  useEffect(() => {
    if (loaded && !error) {
      router.replace("./(auth)/login/login");
    }
  }, [loaded, error]);

  return null;
}
