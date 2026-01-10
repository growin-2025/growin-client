import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const LOCATION = require("@/assets/images/chat/location-18-gray.png");
const ACCEPT_JOIN = require("@/assets/images/chat/accept-join.png");

interface ChatJoinRequestCardProps {
  avatarUrl: string;
  nickname: string;
  location: string;
  message: string;
  onApprove: () => void;
  onReject: () => void;
}

export const ChatJoinRequestCard = ({
  avatarUrl,
  nickname,
  location,
  message,
  onApprove,
  onReject,
}: ChatJoinRequestCardProps) => {
  return (
    <View style={styles.container}>
      {/* 상단 프로필 영역 */}
      <View style={styles.header}>
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.nickname} numberOfLines={1} ellipsizeMode="tail">
            {nickname}
          </Text>
          <View style={styles.locationWrapper}>
            <Image style={styles.iconLocation} source={LOCATION} />
            <Text style={styles.location}>{location}</Text>
          </View>
        </View>
      </View>

      {/* 메시지 */}
      <View style={styles.messageBox}>
        <Text style={[styles.messageText, textStyles.body15_SB135]}>
          {message}
        </Text>
      </View>

      {/* 버튼 영역 */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.rejectButton} onPress={onReject}>
          <Text style={[styles.rejectText, textStyles.body13_SB135]}>
            거절하기
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.approveButton} onPress={onApprove}>
          <Image style={styles.iconAccept} source={ACCEPT_JOIN} />
          <Text style={[styles.approveText, textStyles.body13_SB135]}>
            수락하기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 12,
    gap: 12,
    backgroundColor: colors.white,
    marginTop: 12,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.25)",
  },
  nickname: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
  },
  locationWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconLocation: {
    width: 18,
    height: 18,
  },
  location: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },

  messageBox: {
    backgroundColor: colors.sub,
    borderRadius: 12,
    borderTopLeftRadius: 2,
    padding: 12,
  },
  messageText: {
    color: colors.main,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 8,
  },
  rejectButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: colors.gray[4],
    justifyContent: "center",
    alignItems: "center",
  },
  rejectText: {
    color: colors.gray[1],
  },
  approveButton: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: colors.main,
    justifyContent: "center",
    alignItems: "center",
  },
  iconAccept: {
    width: 24,
    height: 16,
  },
  approveText: {
    color: colors.white,
  },
});
