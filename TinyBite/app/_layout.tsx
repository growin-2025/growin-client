import { toastConfig } from "@/lib/toast/toastConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";
import Toast from "react-native-toast-message";

const queryClient = new QueryClient();

// 알림 핸들러 설정 - 앱이 포그라운드에 있을 때 알림 표시
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <KeyboardProvider preload={false}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="party-detail/[id]" />
        </Stack>
        <Toast config={toastConfig} />
      </KeyboardProvider>
    </QueryClientProvider>
  );
}
