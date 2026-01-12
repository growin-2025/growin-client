import { useUserQuery } from "@/hooks/queries/useUser";
import { useAuthStore } from "@/stores/authStore";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { Tabs } from "expo-router";
import { useEffect } from "react";
import { Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PRIMARY_COLOR = colors.main;
const INACTIVE_COLOR = colors.gray[2];

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const { setUser } = useAuthStore();

  const { data: user } = useUserQuery({
    enabled: true,
  });

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: PRIMARY_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
        tabBarLabelStyle: {
          textAlign: "center",
          marginTop: 4,
          ...textStyles.body13_SB135,
        },
        tabBarStyle: {
          height: 74 + insets.bottom,
          paddingTop: 12,
          backgroundColor: colors.white,
          shadowColor: "#000000",
          shadowOpacity: 0.25,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 4,
          boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("@/assets/images/gnb/home-selected.png")
                  : require("@/assets/images/gnb/home.png")
              }
              style={{
                width: 28,
                height: 28,
                resizeMode: "contain",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "채팅",
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("@/assets/images/gnb/chat-selected.png")
                  : require("@/assets/images/gnb/chat.png")
              }
              style={{
                width: 28,
                height: 28,
                resizeMode: "contain",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="mypage"
        options={{
          title: "내정보",
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("@/assets/images/gnb/profile-selected.png")
                  : require("@/assets/images/gnb/profile.png")
              }
              style={{
                width: 28,
                height: 28,
                resizeMode: "contain",
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
