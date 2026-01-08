import { searchParties } from "@/api/partyApi";
import { getUserMe } from "@/api/userApi";
import MainCategory from "@/components/main/MainCategory";
import RecentSearchList from "@/components/search/RecentSearchList";
import SearchBar from "@/components/search/SearchBar";
import SearchResultList from "@/components/search/SearchResultList";
import { usePartyStore } from "@/stores/partyStore";
import { colors } from "@/styles/colors";
import { PartyItem } from "@/types/party";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchScreen() {
  const router = useRouter();
  const partyType = usePartyStore((state) => state.partyType);
  const setPartyType = usePartyStore((state) => state.setPartyType);
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // 유저 정보 조회 (검색 화면에서만 필요할 때 호출)
  const { data: userMe } = useQuery({
    queryKey: ["getUserMe"],
    queryFn: getUserMe,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // 검색 결과 조회 (useQuery 사용)
  const {
    data: searchResponse,
    isLoading: isSearching,
    error: searchError,
  } = useQuery({
    queryKey: ["search", searchQuery, partyType],
    queryFn: () =>
      searchParties({
        q: searchQuery,
        category: partyType,
        page: 0,
        size: 20,
      }),
    enabled: !!searchQuery && searchQuery.trim().length > 0,
  });

  const searchResults = searchResponse?.data.parties || [];
  const hasNext = searchResponse?.data.hasNext || false;

  const location = userMe?.location || "역삼동";

  const handleClearSearch = () => {
    setSearchText("");
    setSearchQuery("");
  };

  const handleRecentSearchClick = (keyword: string) => {
    setSearchText(keyword);
    setSearchQuery(keyword);
    setPartyType("ALL"); // 검색 시 카테고리를 전체로 초기화
  };

  const handleSubmitSearch = () => {
    if (searchText.trim()) {
      setSearchQuery(searchText.trim());
      setPartyType("ALL"); // 검색 시 카테고리를 전체로 초기화
    }
  };

  const handleItemPress = (item: PartyItem) => {
    router.push({
      pathname: "/party-detail/[id]" as any,
      params: { id: item.partyId.toString() },
    });
  };

  // 검색어가 없을 때만 최근 검색 화면 표시
  const showRecentSearches = !searchQuery;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style="dark" />
      {/* 검색바 */}
      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSubmitSearch}
        onClear={handleClearSearch}
        placeholder={`${location} 근처에서 검색`}
      />

      {/* 카테고리 필터 (검색 실행 후 표시) */}
      {!showRecentSearches && (
        <View style={styles.categoryWrapper}>
          <MainCategory />
        </View>
      )}

      {showRecentSearches ? (
        <RecentSearchList onItemClick={handleRecentSearchClick} />
      ) : (
        <SearchResultList
          searchResults={searchResults}
          isLoading={isSearching}
          onItemPress={handleItemPress}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  categoryWrapper: {
    marginTop: 12,
    marginBottom: 12,
  },
});
