import ChatInputBox from "@/components/chat/ChatInputBox";
import ChatRoomHeader from "@/components/ChatRoomHeader";
import { colors } from "@/styles/colors";
import { StatusBar } from "expo-status-bar";
import { ReactNode, useState } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatBottomPanel from "../chat/ChatBottomPanel";
import { ChatJoinRequestCard } from "../chat/host/ChatJoinRequestCard";

interface ChatRoomLayoutProps {
  children: ReactNode;
}

const ChatRoomLayout = ({ children }: ChatRoomLayoutProps) => {
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  const togglePanel = () => {
    setIsPanelVisible((prev) => !prev);
  };

  const handleGalleryPress = () => {
    console.log("갤러리 열기");
    setIsPanelVisible(false);
    // TODO: 갤러리 열기 로직
  };

  const handleCameraPress = () => {
    console.log("카메라 열기");
    setIsPanelVisible(false);
    // TODO: 카메라 열기 로직
  };

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

            {/* 1:1 참여자 - 대기 */}
            {/* <ChatJoinPendingCard /> */}

            {/* 1:1 참여자 - 수락됨 */}
            {/* <ChatJoinAcceptedCard /> */}

            {/* group 파티장 - 정산하기 */}
            {/* <ChatRecruitmentCloseCard /> */}

            {/* group 파티장 - 모집 완료 */}
            {/* <ChatPartyClosureCard /> */}

            {/* group 참여자 - 진행상황 */}
            {/* <ChatPartyProgressCard
              status="진행 중"
              currentMembers={1}
              maxMembers={3}
            /> */}

            <View style={{ flex: 1 }}>{children}</View>
          </View>
          <View style={styles.bottomContainer}>
            <ChatInputBox
              onPlusPress={togglePanel}
              isPanelVisible={isPanelVisible}
            />
            <ChatBottomPanel
              isVisible={isPanelVisible}
              onGalleryPress={handleGalleryPress}
              onCameraPress={handleCameraPress}
            />
          </View>
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
  bottomContainer: {
    gap: 24,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
  },
  safeAreaBottom: {
    backgroundColor: colors.white,
  },
});

export default ChatRoomLayout;
