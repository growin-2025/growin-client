import ConfirmModal from "@/components/ConfirmModal";
import { useSettlePartyMutation } from "@/hooks/mutations/useChat";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const GROUP_ICON = require("@/assets/images/chat/group-icon.png");
const BRAND_ICON = require("@/assets/images/chat/brand-logo-50.png");

interface ChatPartyClosureCardProps {
  partyId: number;
  groupChatRoomId: number;
}

const ChatPartyClosureCard = ({
  partyId,
  groupChatRoomId,
}: ChatPartyClosureCardProps) => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);

  const settleMutation = useSettlePartyMutation(partyId, groupChatRoomId);

  const handleCloseChatRoom = async () => {
    await settleMutation.mutateAsync();
    if (settleMutation.isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ["useGetGroupRoomDetailQuery", groupChatRoomId],
      });
    }
  };

  return (
    <>
      <View style={styles.container}>
        {/* 상단 수락 완료 영역 */}
        <View style={styles.headerSection}>
          <View style={styles.iconWrapper}>
            <Image source={GROUP_ICON} style={styles.personIcon} />
          </View>
          <Text style={[styles.headerText, textStyles.body16_SB135]}>
            모집 완료
          </Text>
        </View>

        {/* 하단 버튼 영역 */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowModal(true)}
        >
          <Text style={[styles.buttonText, textStyles.body16_B150]}>
            파티 종료
          </Text>
        </TouchableOpacity>
      </View>

      <ConfirmModal
        visible={showModal}
        icon={BRAND_ICON}
        title="파티를 종료할까요?"
        message={`수령이 완료되었다면 파티를 종료해 주세요!\n종료 후에도 채팅은 계속 이어갈 수 있습니다.`}
        onClose={() => setShowModal(false)}
        cancelText="취소"
        cancelButtonColor={colors.gray[4]}
        confirmText="종료하기"
        cancelTextColor={colors.gray[1]}
        confirmButtonColor={colors.main}
        onConfirm={handleCloseChatRoom}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    padding: 12,
    borderRadius: 16,
    gap: 10,
    backgroundColor: colors.white,
    boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
  },

  headerSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    backgroundColor: colors.sub,
  },
  personIcon: {
    width: 34,
    height: 25,
  },
  headerText: {
    color: colors.black,
  },

  button: {
    backgroundColor: colors.main,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: colors.white,
  },
});

export default ChatPartyClosureCard;
