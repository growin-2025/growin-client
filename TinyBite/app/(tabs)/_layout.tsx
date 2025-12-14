import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { Tabs } from "expo-router";
import { Image } from "react-native";

const PRIMARY_COLOR = colors.main;
const INACTIVE_COLOR = colors.gray[2];

export default function TabsLayout() {
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
          height: 92,
          paddingTop: 12,
          paddingBottom: 12,
          backgroundColor: colors.white,
          borderTopWidth: 0,
          shadowColor: "rgba(0,0,0,0.25)",
          shadowOpacity: 0.25,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 8,
          // Android elevation for shadow
          elevation: 4,
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
                marginTop: -4,
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
                marginTop: -4,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
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
                marginTop: -4,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
