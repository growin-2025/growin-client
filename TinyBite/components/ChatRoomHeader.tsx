import OneOnOneChatStatusTag from "@/components/chat/OneOnOneChatStatusTag";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import {
  OneToOneChatDetailSchema,
  OneToOneChatStatusType,
  PartyStatusType,
  RoomType,
} from "@/types/chat.types";
import { router, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PartyStatusTag from "./chat/PartyStatusTag";

const CHEVRON_LEFT_ICON = require("@/assets/images/chevron/chevron-left-36-gray.png");
const MEMBER_COUNT = require("@/assets/images/chat/member-count.png");

interface ChatRoomHeaderProps {
  roomDetail: OneToOneChatDetailSchema;
}

const ChatRoomHeader = ({ roomDetail }: ChatRoomHeaderProps) => {
  const { roomType } = useLocalSearchParams<{
    roomType: RoomType;
  }>();

  return (
    <SafeAreaView style={styles.safeAreaView} edges={["top"]}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image style={styles.imageChevron} source={CHEVRON_LEFT_ICON} />
        </TouchableOpacity>

        {roomType === "ONE_TO_ONE" ? (
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
                .임시 파티 제목.
              </Text>
            </View>
            <View style={styles.infoWrapper}>
              <PartyStatusTag
                status={"모집 중" as PartyStatusType} /* // 임시 상태 */
              />
              <View style={styles.members}>
                <Image style={styles.imageUser} source={MEMBER_COUNT} />
                <Text style={[styles.userCount, textStyles.body15_SB135]}>
                  .임시 명수.
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
