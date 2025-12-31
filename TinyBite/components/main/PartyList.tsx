import MainCard from "@/components/main/MainCard";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { PartyItem, PartyListResponse } from "@/types/party";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

interface PartyListProps {
  data: PartyListResponse | undefined;
  isLoading?: boolean;
  onCardPress?: (partyId: number) => void;
}

/**
 * 파티 리스트 컴포넌트
 * - 활성 파티를 먼저 표시하고, 그 다음 종료된 파티를 표시
 */
const PartyList = ({ data, isLoading, onCardPress }: PartyListProps) => {
  const activeParties = data?.activeParties || [];
  const closedParties = data?.closedParties || [];

  // 활성 파티와 종료된 파티를 합쳐서 하나의 배열로 만들기
  const allParties: PartyItem[] = [...activeParties, ...closedParties];

  const renderItem = ({ item }: { item: PartyItem }) => (
    <MainCard
      item={item}
      onPress={() => onCardPress?.(item.partyId)}
      containerStyle={styles.cardItem}
    />
  );

  const ItemSeparator = () => <View style={styles.separator} />;

  const ListEmptyComponent = () => {
    // 로딩 중일 때는 빈 상태를 표시하지 않음
    if (isLoading) {
      return null;
    }

    return (
      <View style={styles.emptyContainer}>
        <Image
          source={require("@/assets/images/main/notice-100.png")}
          style={styles.emptyIcon}
          resizeMode="contain"
        />
        <Text style={[styles.emptyText, textStyles.title18_SB135]}>
          아직 우리 동네에 파티가 없어요.
        </Text>
        <Text style={[styles.emptyText, textStyles.title18_SB135]}>
          첫 파티를 열어보세요!
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      data={allParties}
      renderItem={renderItem}
      keyExtractor={(item) => item.partyId.toString()}
      ItemSeparatorComponent={ItemSeparator}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default PartyList;

const styles = StyleSheet.create({
  listContent: {
    alignItems: "center",
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 70, // 플로팅 버튼 공간 확보
    flexGrow: 1, // 빈 상태일 때 전체 화면 사용
  },
  cardItem: {
    width: "100%",
  },
  separator: {
    height: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyIcon: {
    width: 100,
    height: 100,
    marginBottom: 12,
  },
  emptyText: {
    color: colors.gray[1],
    textAlign: "center",
  },
});
