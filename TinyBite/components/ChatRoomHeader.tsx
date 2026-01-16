import OneOnOneChatStatusTag from "@/components/chat/OneOnOneChatStatusTag";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import {
  GroupChatDetailSchema,
  GroupChatStatusType,
  OneToOneChatDetailSchema,
  OneToOneChatStatusType,
} from "@/types/chat.types";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PartyStatusTag from "./chat/PartyStatusTag";

const CHEVRON_LEFT_ICON = require("@/assets/images/chevron/chevron-left-36-gray.png");
const MEMBER_COUNT = require("@/assets/images/chat/member-count.png");

interface ChatRoomHeaderProps {
  roomDetail: OneToOneChatDetailSchema | GroupChatDetailSchema;
}

const ChatRoomHeader = ({ roomDetail }: ChatRoomHeaderProps) => {
  // const data = roomDetail.roomType === 'ONE_TO_ONE' ? roomDetail as OneToOneChatDetailSchema : roomDetail as GroupChatDetailSchema;

  return (
    <SafeAreaView style={styles.safeAreaView} edges={["top"]}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image style={styles.imageChevron} source={CHEVRON_LEFT_ICON} />
        </TouchableOpacity>

        {roomDetail.roomType === "ONE_TO_ONE" ? (
          <View style={styles.headerContent}>
            <View style={styles.infoWrapper}>
              <Text
                style={[styles.userName, textStyles.title20_B135]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {roomDetail.targetName}
              </Text>
              <OneOnOneChatStatusTag
                status={
                  `${roomDetail.participantStatus}` as OneToOneChatStatusType
                }
              />
            </View>
            <Text style={[styles.subTitle, textStyles.body15_SB135]}>
              {roomDetail.partyTitle}
            </Text>
          </View>
        ) : (
          <View style={styles.headerContent}>
            <View style={styles.infoWrapper}>
              <Text
                style={[styles.userName, textStyles.title20_B135]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {roomDetail.partyTitle}
              </Text>
            </View>
            <View style={styles.infoWrapper}>
              <PartyStatusTag
                status={`${roomDetail.status}` as GroupChatStatusType}
              />
              <View style={styles.members}>
                <Image style={styles.imageUser} source={MEMBER_COUNT} />
                <Text style={[styles.userCount, textStyles.body15_SB135]}>
                  {roomDetail.currentParticipantCnt}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: colors.white,
  },
  container: {
    flexDirection: "row",
    gap: 4,
  },

  imageChevron: {
    width: 36,
    height: 36,
  },

  headerContent: {
    flex: 1,
    gap: 2,
  },

  infoWrapper: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-end",
  },
  userName: {
    flexShrink: 1,
    color: colors.black,
  },
  subTitle: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    color: colors.main,
  },

  members: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageUser: {
    width: 20,
    height: 20,
  },
  userCount: {
    color: colors.gray[1],
  },
});

export default ChatRoomHeader;
