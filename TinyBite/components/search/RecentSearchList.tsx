import {
  deleteAllSearchLog,
  deleteSearchLog,
  getSearchLog,
} from "@/api/partyApi";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface RecentSearchListProps {
  onItemClick: (keyword: string) => void;
}

const RecentSearchList = ({ onItemClick }: RecentSearchListProps) => {
  const queryClient = useQueryClient();

  // 최근 검색 로그 조회
  const { data: recentSearchesData } = useQuery({
    queryKey: ["getSearchLog"],
    queryFn: getSearchLog,
  });

  // recentSearches가 항상 배열이 되도록 보장
  const recentSearches = Array.isArray(recentSearchesData)
    ? recentSearchesData
    : [];

  // 전체 삭제 mutation
  const deleteAllMutation = useMutation({
    mutationFn: deleteAllSearchLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getSearchLog"] });
    },
    onError: (error) => {
      console.error("모든 최근 검색 로그 삭제 실패:", error);
    },
  });

  // 개별 삭제 mutation
  const deleteItemMutation = useMutation({
    mutationFn: deleteSearchLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getSearchLog"] });
    },
    onError: (error) => {
      console.error("개별 검색 로그 삭제 실패:", error);
    },
  });

  const handleDeleteAll = () => {
    deleteAllMutation.mutate();
  };

  const handleDeleteItem = (keyword: string) => {
    deleteItemMutation.mutate(keyword);
  };
  return (
    <>
      {/* 최근 검색 헤더 */}
      <View style={styles.recentHeader}>
        <Text style={[styles.recentTitle, textStyles.body16_SB135]}>
          최근 검색
        </Text>
        <Pressable onPress={handleDeleteAll}>
          <Text style={[styles.deleteAllText, textStyles.body15_SB135]}>
            전체 삭제
          </Text>
        </Pressable>
      </View>

      {/* 최근 검색 리스트 */}
      <ScrollView style={styles.content}>
        <View style={styles.recentSection}>
          {!recentSearches || recentSearches.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, textStyles.title18_SB135]}>
                최근 검색 내역이 없습니다.
              </Text>
            </View>
          ) : (
            <View style={styles.recentList}>
              {recentSearches.map((search, index) => (
                <Pressable
                  key={index}
                  style={styles.recentItem}
                  onPress={() => onItemClick(search)}
                >
                  <Image
                    source={require("@/assets/images/search/recent-search.png")}
                    style={styles.clockIcon}
                    resizeMode="contain"
                  />
                  <Text style={[styles.recentItemText, textStyles.body16_M135]}>
                    {search}
                  </Text>
                  <Pressable
                    onPress={() => handleDeleteItem(search)}
                    style={styles.deleteButton}
                  >
                    <Image
                      source={require("@/assets/images/delete-icon-24.png")}
                      style={styles.deleteIcon}
                      resizeMode="contain"
                    />
                  </Pressable>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default RecentSearchList;

const styles = StyleSheet.create({
  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 16,
  },
  content: {
    flex: 1,
  },
  recentSection: {
    paddingHorizontal: 20,
  },
  recentTitle: {
    color: colors.gray[1],
  },
  deleteAllText: {
    color: colors.gray[2],
  },
  recentList: {
    gap: 16,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  clockIcon: {
    width: 24,
    height: 24,
  },
  recentItemText: {
    flex: 1,
    color: colors.black,
  },
  deleteButton: {
    padding: 4,
  },
  deleteIcon: {
    width: 24,
    height: 24,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  emptyText: {
    color: colors.gray[1],
  },
});
