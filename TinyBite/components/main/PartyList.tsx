import MainCard from "@/components/main/MainCard";
import { PartyItem, PartyListResponse } from "@/types/party";
import { FlatList, StyleSheet, View } from "react-native";

interface PartyListProps {
  data: PartyListResponse | undefined;
  onCardPress?: (partyId: number) => void;
}

/**
 * 파티 리스트 컴포넌트
 * - 활성 파티를 먼저 표시하고, 그 다음 종료된 파티를 표시
 */
const PartyList = ({ data, onCardPress }: PartyListProps) => {
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

  return (
    <FlatList
      data={allParties}
      renderItem={renderItem}
      keyExtractor={(item) => item.partyId.toString()}
      ItemSeparatorComponent={ItemSeparator}
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
    paddingBottom: 100, // 플로팅 버튼 공간 확보
  },
  cardItem: {
    width: "100%",
  },
  separator: {
    height: 16,
  },
});
