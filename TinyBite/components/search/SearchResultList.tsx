import MainCard from "@/components/main/MainCard";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { PartyItem } from "@/types/party";
import { FlatList, StyleSheet, Text, View } from "react-native";

interface SearchResultListProps {
  searchResults: PartyItem[];
  isLoading: boolean;
  onItemPress: (item: PartyItem) => void;
}

const SearchResultList = ({
  searchResults,
  isLoading,
  onItemPress,
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
});
