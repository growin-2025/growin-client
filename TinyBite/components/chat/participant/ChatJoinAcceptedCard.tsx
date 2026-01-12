import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const GROUP_ICON = require("@/assets/images/chat/group-icon.png");

export const ChatJoinAcceptedCard = () => {
  const handleNavigateToChatRoom = () => {
    console.log("파티 채팅방 가기");
  };

  return (
    <View style={styles.container}>
      {/* 상단 수락 완료 영역 */}
      <View style={styles.headerSection}>
        <View style={styles.iconWrapper}>
          <Image source={GROUP_ICON} style={styles.personIcon} />
        </View>
        <Text style={[styles.headerText, textStyles.body16_SB135]}>
          파티장 수락 완료
        </Text>
      </View>

      {/* 하단 버튼 영역 */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleNavigateToChatRoom}
      >
        <Text style={[styles.buttonText, textStyles.body16_B150]}>
          파티 채팅방 가기
        </Text>
      </TouchableOpacity>
    </View>
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
