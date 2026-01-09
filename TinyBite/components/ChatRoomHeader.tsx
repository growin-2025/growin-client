import OneOnOneChatStatusTag from "@/components/chat/OneOnOneChatStatusTag";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import {
  ChatType,
  OneOnOneChatStatusType,
  PartyStatusType,
} from "@/types/chat";
import { router, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PartyStatusTag from "./chat/PartyStatusTag";

const CHEVRON_LEFT_ICON = require("@/assets/images/chevron/chevron-left-36-gray.png");
const MEMBER_COUNT = require("@/assets/images/chat/member-count.png");

const ChatRoomHeader = () => {
  const {
    id,
    type, // "oneOnOne" | "party"
    // name
  } = useLocalSearchParams<{
    id: string;
    type: ChatType;
    name?: string;
  }>();

  return (
    <SafeAreaView style={styles.safeAreaView} edges={["top"]}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image style={styles.imageChevron} source={CHEVRON_LEFT_ICON} />
        </TouchableOpacity>

        {type === "oneOnOne" ? (
          <View style={styles.headerContent}>
            <View style={styles.infoWrapper}>
              <Text
                style={[styles.userName, textStyles.title20_B135]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                츄비
              </Text>
              <OneOnOneChatStatusTag
                status={"승인 요청" as OneOnOneChatStatusType}
              />
            </View>
            <Text style={[styles.subTitle, textStyles.body15_SB135]}>
              후문에서 엽떡 나누실 분 구해요
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
                후문 엽떡 나누실 분 ㅃㄹ
              </Text>
            </View>
            <View style={styles.infoWrapper}>
              <PartyStatusTag status={"모집 중" as PartyStatusType} />
              <View style={styles.members}>
                <Image style={styles.imageUser} source={MEMBER_COUNT} />
                <Text style={[styles.userCount, textStyles.body15_SB135]}>
                  3
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
