import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import {
  ChatItemType,
  OneOnOneChatStatusType,
  PartyStatusType,
} from "@/types/chat";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ChatCardImage from "./ChatCardImage";
import OneOnOneChatStatusTag from "./OneOnOneChatStatusTag";
import PartyStatusTag from "./PartyStatusTag";

interface ChatItemProps {
  item: ChatItemType;
}

/**
 * 통합 채팅 아이템 컴포넌트
 * - 1:1 채팅: 겹쳐진 프로필 이미지, 사용자 이름, 파티 제목
 * - 파티 채팅: 네모 형식 파티 이미지, 파티 제목, 인원수
 * - 공통: 마지막 메시지, 시간, 상태 태그, 읽지 않은 메시지 수 배지
 */
const ChatItem = ({ item }: ChatItemProps) => {
  const router = useRouter();

  // mock data : 채팅방 룸 번호, type
  const roomID = 1;
  const roomType = "oneOnOne"; // "oneOnOne" | "party"

  // 채팅 타입 확인 (1:1 채팅인지 파티 채팅인지)
  const isOneOnOne = item.chatType === "oneOnOne";

  const handleChatPress = () => {
    router.navigate({
      pathname: "/chat/[id]",
      params: {
        id: roomID,
        type: roomType,
        // name: room.name
      },
    });
  };

  return (
    <TouchableOpacity style={styles.chatItem} onPress={handleChatPress}>
      {/* 프로필 이미지 영역 */}
      <View style={styles.profileContainer}>
        <ChatCardImage item={item} />
      </View>

      {/* 채팅 컨텐츠 영역 */}
      <View style={styles.chatContent}>
        {/* 헤더: 이름/파티 제목 + 시간 */}
        <View style={styles.chatHeader}>
          <Text
            style={[styles.userName, textStyles.body16_SB135]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {/* 1:1 채팅은 사용자 이름, 파티 채팅은 파티 제목 표시 */}
            {isOneOnOne ? item.name : item.partyTitle}
          </Text>
          <Text style={[styles.timestamp, textStyles.body12_M135]}>
            {item.timestamp}
          </Text>
        </View>

        {/* 마지막 메시지 + 읽지 않은 메시지 수 배지 */}
        <View style={styles.lastMessageContainer}>
          <Text
            style={[styles.lastMessage, textStyles.body12_M135]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.lastMessage}
          </Text>
          {/* 뱃지 컨테이너: 고정폭 영역으로 뱃지 위치 안정화 */}
          <View style={styles.badgeContainer}>
            {item.unreadCount && item.unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={[styles.unreadText, textStyles.body12_M135]}>
                  {item.unreadCount > 10 ? "10+" : item.unreadCount}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* 태그 영역: 상태 태그 + 파티 제목(1:1) / 인원수(파티) */}
        <View style={styles.tagsContainer}>
          {/* 상태 태그: chatType에 따라 적절한 태그 컴포넌트 사용 */}
          {item.status &&
            (isOneOnOne ? (
              // 1:1 채팅 상태 태그 (승인 대기, 승인 거절, 승인 완료, 승인 요청, 파티 종료)
              <OneOnOneChatStatusTag
                status={item.status as OneOnOneChatStatusType}
              />
            ) : (
              // 파티 채팅 상태 태그 (모집 중, 진행 중, 파티 종료)
              <PartyStatusTag status={item.status as PartyStatusType} />
            ))}
          {/* 1:1 채팅일 때 파티 제목 표시 */}
          {isOneOnOne && item.partyTitle && (
            <Text
              style={[styles.partyTitle, textStyles.body13_SB135]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.partyTitle}
            </Text>
          )}
          {/* 파티 채팅일 때 인원수 표시 */}
          {!isOneOnOne && item.memberCount !== undefined && (
            <View style={styles.memberCountContainer}>
              <Image
                source={require("@/assets/images/chat/member-count.png")}
                style={styles.memberIcon}
                resizeMode="contain"
              />
              <Text style={[styles.memberCount, textStyles.body13_SB135]}>
                {item.memberCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;

const styles = StyleSheet.create({
  // 채팅 아이템 컨테이너
  chatItem: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginHorizontal: 20,
  },
  // 프로필 이미지 컨테이너
  profileContainer: {
    marginRight: 16,
  },
  // 채팅 컨텐츠 영역
  chatContent: {
    flex: 1,
  },
  // 채팅 헤더 (이름 + 시간)
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  // 사용자 이름 / 파티 제목
  userName: {
    color: colors.black,
    maxWidth: "80%",
  },
  // 타임스탬프
  timestamp: {
    color: colors.gray[2],
  },
  // 마지막 메시지 컨테이너
  lastMessageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 4,
    paddingBottom: 6,
    gap: 8,
  },
  // 마지막 메시지
  lastMessage: {
    color: colors.gray[1],
    flex: 1,
  },
  // 뱃지 컨테이너 (고정폭 영역)
  badgeContainer: {
    height: 22,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  // 태그 컨테이너 (상태 태그 + 파티 제목/인원수)
  tagsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  // 파티 제목 (1:1 채팅용)
  partyTitle: {
    color: colors.main,
    maxWidth: "75%",
  },
  // 인원수 컨테이너 (파티 채팅용)
  memberCountContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  // 인원수 아이콘
  memberIcon: {
    padding: 0.57143,
    width: 16,
    height: 16,
  },
  // 인원수 텍스트
  memberCount: {
    color: colors.gray[1],
    textAlign: "center",
  },
  // 읽지 않은 메시지 수 배지
  unreadBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 100,
    backgroundColor: colors.main,
    justifyContent: "center",
    alignItems: "center",
  },
  // 읽지 않은 메시지 수 텍스트
  unreadText: {
    color: colors.white,
    fontSize: 11,
  },
});
