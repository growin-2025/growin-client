import { colors } from "@/styles/colors";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function Index() {
  const [show, setShow] = useState(true);
  const opacity = useSharedValue(1);

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
      let innerTimeout: NodeJS.Timeout | number | undefined;
      const t = setTimeout(() => {
        opacity.value = withTiming(0, {
          duration: 600,
          easing: Easing.out(Easing.cubic),
        });

        innerTimeout = setTimeout(() => {
          setShow(false);
          router.replace("./(auth)/login/login");
        }, 600);
      }, 3000);

      return () => {
        clearTimeout(t);
        if (innerTimeout !== undefined) {
          clearTimeout(innerTimeout);
        }
      };
    }
  }, [loaded, error, opacity]);

  const aStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (!show) return null;

  return (
    <Animated.View style={[styles.container, aStyle]}>
      <Image
        source={require("@/assets/images/splash.png")}
        style={styles.image}
        resizeMode="contain"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
  },
});
