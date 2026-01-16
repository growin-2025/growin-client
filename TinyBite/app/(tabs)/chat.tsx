import ChatCard from "@/components/chat/ChatCard";
import {
  useGetGroupRoomListQuery,
  useGetOnetoOneRoomListQuery,
} from "@/hooks/queries/useChatRoom";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import {
  FilterTab,
  GroupChatCardSchema,
  OneToOneChatCardSchema,
} from "@/types/chat.types";
import { useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 필터 탭 목록
const filters: FilterTab[] = ["전체", "참여중인 파티", "1:1 채팅"];

/**
 * 채팅 아이템 렌더링 함수
 */
const renderChatItem = ({
  item,
}: {
  item: OneToOneChatCardSchema | GroupChatCardSchema;
}) => {
  return <ChatCard item={item} />;
};

/**
 * 아이템 구분선 컴포넌트 (80% 너비)
 */
const ItemSeparator = () => <View style={styles.separator} />;

/**
 * 채팅 화면 컴포넌트
 * - 헤더: 메인 로고 + "채팅" 텍스트
 * - 필터 탭: 전체, 참여중인 파티, 1:1 채팅
 * - 채팅 리스트: 사용자별 채팅 아이템 표시
 */
export default function ChatScreen() {
  const [selectedFilter, setSelectedFilter] = useState<FilterTab>("전체");

  const groupQuery = useGetGroupRoomListQuery();
  const oneToOneQuery = useGetOnetoOneRoomListQuery();

  useFocusEffect(
    useCallback(() => {
      groupQuery.refetch();
      oneToOneQuery.refetch();
    }, [])
  );

  const mergedData = useMemo(() => {
    return [...(groupQuery.data ?? []), ...(oneToOneQuery.data ?? [])];
  }, [groupQuery.data, oneToOneQuery.data]);

  /**
   * 필터에 맞는 데이터 필터링
   */
  const filteredData: (OneToOneChatCardSchema | GroupChatCardSchema)[] =
    mergedData.filter((item) => {
      if (selectedFilter === "전체") return true;
      if (selectedFilter === "참여중인 파티") return item.roomType === "GROUP";
      if (selectedFilter === "1:1 채팅") return item.roomType === "ONE_TO_ONE";
    });

  return (
    <View style={styles.container}>
      {/* 상단 SafeArea (메인 색상 배경) */}
      <SafeAreaView style={styles.safeAreaTop} edges={["top"]}>
        {/* 헤더: 메인 로고 + "채팅" 텍스트 */}
        <View style={styles.headerContent}>
          <Image
            source={require("@/assets/images/main/mainlogo.png")}
            style={{
              width: 32,
              height: 32,
              paddingTop: 1.97,
              paddingLeft: 2,
              paddingRight: 2.77,
              paddingBottom: 2.8,
              resizeMode: "contain",
            }}
          />
          <Text style={[styles.headerTitle, textStyles.title20_B135]}>
            채팅
          </Text>
        </View>
      </SafeAreaView>
      {/* 필터 탭: 전체, 참여중인 파티, 1:1 채팅 */}
      <View style={styles.filterContainer}>
        <View style={styles.filterTabWrapper}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterTab,
                selectedFilter === filter && styles.filterTabActive,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  textStyles.body16_SB135,
                  selectedFilter === filter && styles.filterTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* 채팅 리스트 */}
      {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.chatRoomId.toString()}
          ItemSeparatorComponent={ItemSeparator}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Image
            source={require("@/assets/images/chat/no-chat.png")}
            style={styles.emptyIcon}
            resizeMode="contain"
          />
          <Text style={[styles.emptyText, textStyles.title18_SB135]}>
            아직 참여한 파티가 없어요.
          </Text>
          <Text style={[styles.emptyText, textStyles.title18_SB135]}>
            파티를 찾아 이웃과 나눠보세요!
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // 메인 컨테이너
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // 상단 SafeArea 배경색 (메인 색상)
  safeAreaTop: {
    backgroundColor: colors.main,
  },
  // 헤더 컨텐츠
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 12,
    backgroundColor: colors.main,
  },
  // 메인 로고 스타일
  mainLogo: {
    width: 32,
    height: 32,
    padding: 0.22857,
  },
  // 헤더 타이틀
  headerTitle: {
    color: colors.white,
  },
  // 필터 컨테이너
  filterContainer: {
    paddingTop: 14,
    paddingBottom: 12,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
  },
  // 필터 탭 래퍼
  filterTabWrapper: {
    flexDirection: "row",
    marginHorizontal: 20,
    gap: 16,
  },
  // 필터 탭 (기본 상태)
  filterTab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    backgroundColor: colors.gray[4],
    borderWidth: 1,
    borderColor: "transparent", // 크기 일치를 위한 투명 테두리
  },
  // 필터 탭 (선택된 상태)
  filterTabActive: {
    backgroundColor: colors.sub,
    borderWidth: 1,
    borderColor: colors.main,
  },
  // 필터 텍스트 (기본 상태)
  filterText: {
    color: colors.gray[2],
  },
  // 필터 텍스트 (선택된 상태)
  filterTextActive: {
    color: colors.main,
  },
  // 채팅 리스트 컨텐츠
  listContent: {
    backgroundColor: colors.white,
  },
  // 아이템 구분선 (80% 너비)
  separator: {
    height: 1,
    backgroundColor: colors.gray[4],
    marginHorizontal: 20,
  },
  // 빈 상태 컨테이너
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
  // 빈 상태 아이콘
  emptyIcon: {
    width: 100,
    height: 100,
    marginBottom: 12,
  },
  // 빈 상태 텍스트
  emptyText: {
    color: colors.gray[1],
    textAlign: "center",
  },
});
