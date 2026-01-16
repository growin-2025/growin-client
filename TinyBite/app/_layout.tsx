import { toastConfig } from "@/lib/toast/toastConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";
import Toast from "react-native-toast-message";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <KeyboardProvider preload={false}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(app)/(tabs)" />
          <Stack.Screen name="(app)/party-detail/[id]" />
          <Stack.Screen name="(app)/party/create/[type]" />
          <Stack.Screen name="(app)/party/edit/[type]" />
          <Stack.Screen name="(app)/chat/[id]" />
          <Stack.Screen name="(app)/search/location/index" />
          <Stack.Screen name="(app)/search/search" />
        </Stack>
        <Toast config={toastConfig} />
      </KeyboardProvider>
    </QueryClientProvider>
  );
}
