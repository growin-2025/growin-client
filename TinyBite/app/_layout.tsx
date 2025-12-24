import { toastConfig } from "@/lib/toast/toastConfig";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="main-card-detail" />
      </Stack>
      <Toast config={toastConfig} />
    </>
  );
}
