import { getUserMe } from "@/api/userApi";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchScreen() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // 유저 정보 조회
  const { data: userMe } = useQuery({
    queryKey: ["getUserMe"],
    queryFn: getUserMe,
  });

  const location = userMe?.location || "역삼동";

  const handleClearSearch = () => {
    setSearchText("");
  };

  const handleDeleteAll = () => {
    setRecentSearches([]);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style="dark" />
      {/* 헤더 */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Image
            source={require("@/assets/images/chevron/chevron-left-36-gray.png")}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </Pressable>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={`${location} 근처에서 검색`}
            placeholderTextColor={colors.gray[1]}
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <Pressable onPress={handleClearSearch} style={styles.clearButton}>
              <Image
                source={require("@/assets/images/delete-icon-24.png")}
                style={styles.clearIcon}
                resizeMode="contain"
              />
            </Pressable>
          )}
        </View>
      </View>

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
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, textStyles.title18_SB135]}>
              최근 검색 내역이 없습니다.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 8,
  },
  backIcon: {
    width: 36,
    height: 36,
    tintColor: colors.gray[1],
  },
  searchInputContainer: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
  },
  searchInput: {
    backgroundColor: colors.gray[4],
    borderRadius: 16,
    padding: 12,
    paddingRight: 40,
    ...textStyles.body16_M135,
  },
  clearButton: {
    position: "absolute",
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 100,
    backgroundColor: colors.gray[3],
    justifyContent: "center",
    alignItems: "center",
  },
  clearIcon: {
    width: 16,
    height: 16,
    tintColor: colors.white,
  },
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
  emptyContainer: {
    alignItems: "center",
  },
  emptyText: {
    color: colors.gray[1],
  },
});
