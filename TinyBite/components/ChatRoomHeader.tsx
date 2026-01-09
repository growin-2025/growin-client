import OneOnOneChatStatusTag from "@/components/chat/OneOnOneChatStatusTag";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { OneOnOneChatStatusType } from "@/types/chat";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CHEVRON_LEFT_ICON = require("@/assets/images/chevron/chevron-left-36-gray.png");

const ChatRoomHeader = () => {
  return (
    <SafeAreaView style={styles.safeAreaView} edges={["top"]}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image style={styles.image} source={CHEVRON_LEFT_ICON} />
        </TouchableOpacity>

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

  image: {
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
});

export default ChatRoomHeader;
