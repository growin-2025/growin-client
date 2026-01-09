import ChatInputBox from "@/components/chat/ChatInputBox";
import ChatRoomHeader from "@/components/ChatRoomHeader";
import { colors } from "@/styles/colors";
import { StatusBar } from "expo-status-bar";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChatJoinRequestCard } from "../chat/host/ChatJoinRequestCard";

interface ChatRoomLayoutProps {
  children: ReactNode;
}

const ChatRoomLayout = ({ children }: ChatRoomLayoutProps) => {
  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <ChatRoomHeader />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="padding"
          keyboardVerticalOffset={0}
        >
          <View style={{ flex: 1, paddingHorizontal: 20 }}>
            {/* 1:1 파티장 - 수락, 거절 */}
            <ChatJoinRequestCard
              avatarUrl="https://picsum.photos/50/50"
              nickname="츄비"
              location="역삼동"
              message="파티에 참여하고 싶어요!"
              onApprove={() => console.log("승인")}
              onReject={() => console.log("거절")}
            />

            <View style={{ flex: 1 }}>{children}</View>
          </View>
          <ChatInputBox />
        </KeyboardAvoidingView>
      </View>
      <SafeAreaView style={styles.safeAreaBottom} edges={["bottom"]} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sub,
  },
  safeAreaBottom: {
    backgroundColor: colors.white,
  },
});

export default ChatRoomLayout;
