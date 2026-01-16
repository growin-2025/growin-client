import MainCard from "@/components/main/MainCard";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { PartyItem } from "@/types/party.types";
import { FlatList, StyleSheet, Text, View } from "react-native";

interface SearchResultListProps {
  searchResults: PartyItem[];
  isLoading: boolean;
  onItemPress: (item: PartyItem) => void;
  onEndReached?: () => void;
  isFetchingNextPage?: boolean;
}

const SearchResultList = ({
  searchResults,
  isLoading,
  onItemPress,
  onEndReached,
  isFetchingNextPage,
}: SearchResultListProps) => {
  const renderSearchResult = ({ item }: { item: PartyItem }) => (
    <MainCard
      item={item}
      onPress={() => onItemPress(item)}
      containerStyle={styles.searchCard}
    />
  );

  const ItemSeparator = () => <View style={styles.divider} />;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={[styles.loadingText, textStyles.title18_SB135]}>
          검색 중...
        </Text>
      </View>
    );
  }

  if (searchResults.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyText, textStyles.title18_SB135]}>
          검색 결과가 없습니다.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={searchResults}
      renderItem={renderSearchResult}
      keyExtractor={(item) => item.partyId.toString()}
      ItemSeparatorComponent={ItemSeparator}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetchingNextPage ? (
          <View style={styles.footerContainer}>
            <Text style={[styles.footerText, textStyles.body16_M135]}>
              더 불러오는 중...
            </Text>
          </View>
        ) : null
      }
    />
  );
};

export default SearchResultList;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
  loadingText: {
    color: colors.gray[1],
  },
  listContent: {
    flexGrow: 1,
    backgroundColor: colors.background,
    paddingBottom: 60,
  },
  searchCard: {
    width: "100%",
    borderRadius: 0,
    paddingHorizontal: 30,
    boxShadow: undefined,
  },
  divider: {
    width: "90%",
    height: 1,
    backgroundColor: colors.gray[4],
    alignSelf: "center",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    color: colors.gray[1],
  },
  footerContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  footerText: {
    color: colors.gray[2],
  },
});
