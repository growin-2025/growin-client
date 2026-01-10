import ConfirmModal from "@/components/ConfirmModal";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const GROUP_ICON = require("@/assets/images/chat/group-icon.png");
const FIRESORKS_ICON = require("@/assets/images/chat/fireworks.png");

export const ChatRecruitmentCloseCard = () => {
  const [showModal, setShowModal] = useState(false);

  const handleNavigateToChatRoom = () => {
    console.log("파티 채팅방 가기");
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
            모집 중 (3/3명)
          </Text>
        </View>

        {/* 하단 버튼 영역 */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowModal(true)}
        >
          <Text style={[styles.buttonText, textStyles.body16_B150]}>
            모집을 마감하고 정산하기
          </Text>
        </TouchableOpacity>
      </View>

      <ConfirmModal
        visible={showModal}
        icon={FIRESORKS_ICON}
        title="파티원 모집 완료!"
        message={`이제 주문을 진행해주세요.\n정산은 채팅으로 자유롭게 진행하세요.`}
        onClose={() => setShowModal(false)}
        singleButtonText="채팅으로 정산하러가기"
        onSingleButtonPress={handleNavigateToChatRoom}
        singleButtonColor={colors.main}
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
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
