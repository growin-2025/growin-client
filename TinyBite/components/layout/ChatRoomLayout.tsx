import ChatInputBox from "@/components/chat/ChatInputBox";
import ChatRoomHeader from "@/components/ChatRoomHeader";
import { useGetOnetoOneRoomDetailQuery } from "@/hooks/queries/useChatRoom";
import { colors } from "@/styles/colors";
import { RoomType } from "@/types/chat.types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ReactNode, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatBottomPanel from "../chat/ChatBottomPanel";
import ChatRoomStatusHandler from "../chat/ChatRoomStatusHandler";

interface ChatRoomLayoutProps {
  children: ReactNode;
  onSendText: (message: string) => void;
  onSendImage: (message: string) => void;
}

const ChatRoomLayout = ({
  children,
  onSendText,
  onSendImage,
}: ChatRoomLayoutProps) => {
  const { id: chatRoomId, roomType } = useLocalSearchParams<{
    id: string;
    roomType: RoomType;
  }>();
  const router = useRouter();
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  // 1:1 채팅방 디테일 정보 관리
  const {
    data: oneToOneData,
    isLoading: oneToOneIsLoading,
    isError: oneToOneIsError,
  } = useGetOnetoOneRoomDetailQuery(parseInt(chatRoomId), {
    enabled: roomType === "ONE_TO_ONE",
  });

  // 통합된 데이터 사용
  // const roomDetailData = roomType === 'ONE_TO_ONE' ? oneToOneData : groupData;
  // const roomDetailIsLoading = oneToOneIsLoading || groupIsLoading;
  // const roomDetailIsError = oneToOneIsError || groupIsError;
  const roomDetailData = roomType === "ONE_TO_ONE" ? oneToOneData : null;
  const roomDetailIsLoading = oneToOneIsLoading || null;
  const roomDetailIsError = oneToOneIsError || null;

  const togglePanel = () => {
    setIsPanelVisible((prev) => !prev);
  };

  if (roomDetailIsLoading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (roomDetailIsError) {
    Alert.alert(
      "오류",
      "채팅방 정보를 불러올 수 없습니다.",
      [
        {
          text: "확인",
          onPress: () => router.back(),
        },
      ],
      { cancelable: false }
    );
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!roomDetailData) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <ChatRoomHeader roomDetail={roomDetailData} />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="padding"
          keyboardVerticalOffset={0}
        >
          <View style={{ flex: 1, paddingHorizontal: 20 }}>
            <ChatRoomStatusHandler
              roomType={roomType}
              chatDetail={roomDetailData}
            />

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
              onSend={onSendText}
            />
            <ChatBottomPanel
              isVisible={isPanelVisible}
              setIsPanelVisible={setIsPanelVisible}
              onSend={onSendImage}
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
    boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
  },
  safeAreaBottom: {
    backgroundColor: colors.white,
  },
});

export default ChatRoomLayout;
