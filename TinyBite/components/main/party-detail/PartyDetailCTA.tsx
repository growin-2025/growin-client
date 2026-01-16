import { useRequestJoinParty } from "@/hooks/mutations/useParty";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

interface PartyDetailCTAProps {
  detailPartyId: number;
  isClosed?: boolean;
  isParticipating?: boolean;
  groupChatRoomId?: number;
  currentParticipants?: number;
  maxParticipants?: number;
}

const PartyDetailCTA = ({
  detailPartyId,
  isClosed,
  isParticipating,
  groupChatRoomId,
  currentParticipants,
  maxParticipants,
}: PartyDetailCTAProps) => {
  const { mutate } = useRequestJoinParty();

  // 모집 완료 여부 확인
  const isCompleted =
    currentParticipants !== undefined &&
    maxParticipants !== undefined &&
    currentParticipants >= maxParticipants;

  const getButtonText = () => {
    if (isClosed) {
      return "마감된 파티예요";
    }
    if (isParticipating) {
      return "채팅방으로 이동";
    }
    return "채팅으로 참여하기";
  };

  const handleGoToChatPress = () => {
    // 모집 완료된 파티인 경우 토스트 표시
    if (isCompleted && !isParticipating) {
      Toast.show({
        type: "basicToast",
        props: { text: "모집 완료된 파티입니다." },
        position: "bottom",
        bottomOffset: 133,
        visibilityTime: 2000,
      });
      return;
    }

    //groupChatRoomId가 있으면 그룹 채팅방으로 이동
    if (groupChatRoomId) {
      router.push({
        pathname: "/(app)/chat/[id]",
        params: {
          id: groupChatRoomId.toString(),
          roomType: "GROUP",
        },
      });
    } else {
      // 참여 요청
      mutate(detailPartyId);
    }
  };

  return (
    <SafeAreaView style={styles.ctaContainer} edges={["bottom"]}>
      <TouchableOpacity
        style={[styles.cta, isClosed && styles.ctaDisabled]}
        disabled={isClosed}
        onPress={handleGoToChatPress}
      >
        <Text
          style={[
            styles.ctaText,
            isClosed && styles.ctaDisabledText,
            textStyles.title18_SB135,
          ]}
        >
          {getButtonText()}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PartyDetailCTA;

const styles = StyleSheet.create({
  ctaContainer: {
    paddingTop: 12,
    paddingBottom: 18,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
  },
  cta: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: colors.main,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaText: {
    color: colors.white,
  },
  ctaDisabled: {
    backgroundColor: colors.gray[2],
  },
  ctaDisabledText: {
    color: colors.white,
  },
});
