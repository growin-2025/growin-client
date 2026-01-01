import { toastConfig } from "@/lib/toast/toastConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="party-detail/[id]" />
      </Stack>
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
}
