import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const LocationSearchResult = () => {
  const mockResultData = [
    { id: 0, text: "경기도 용인시 처인구 역삼동" },
    { id: 1, text: "서울 강남구 역삼동" },
    { id: 2, text: "서울특별시 강남구 테헤란로 123" },
    { id: 3, text: "서울특별시 종로구 사직로3길 23" },
    { id: 4, text: "서울특별시 서초구 반포대로 23길 6" },
    { id: 5, text: "서울특별시 성동구 아차산로7길 15-1" },
    { id: 6, text: "서울특별시 영등포구 여의나루로 5" },
    { id: 7, text: "서울특별시 강서구 양천로57길 9-19 " },
    { id: 8, text: "서울특별시 중구 명동8나길" },
    { id: 9, text: "서울특별시 용산구 서초2동 1308-25 하나 아파트 9층 912호" },
    { id: 11, text: "서울특별시 마포구 월드컵로 250" },
    { id: 12, text: "서울특별시 송파구 올림픽로 426" },
    { id: 13, text: "서울특별시 강남구 테헤란로 123" },
    { id: 14, text: "서울특별시 종로구 사직로3길 23" },
    { id: 15, text: "서울특별시 강서구 양천로57길 9-19" },
    { id: 16, text: "서울특별시 송파구 올림픽로 43길 10" },
    { id: 17, text: "서울특별시 마포구 월드컵북로 400" },
    { id: 22, text: "서울특별시 관악구 봉천동 123-45" },
  ];

  return (
    <View style={styles.container}>
      <Text
        style={[styles.title, textStyles.body15_SB135]}
      >{`'역삼동' 검색 결과`}</Text>

      <FlatList
        data={mockResultData}
        renderItem={({ item }) => <ResultItem text={item.text} />}
        keyExtractor={(item) => item.id.toString()}
        style={styles.flatList}
        contentContainerStyle={styles.resultContainer}
      />
    </View>
  );
};

interface ResultItemProps {
  text: string;
}

const ResultItem = ({ text }: ResultItemProps) => {
  return (
    <TouchableOpacity>
      <Text style={[styles.resultText, textStyles.body16_M135]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingVertical: 12 },
  title: {
    alignSelf: "stretch",
    color: colors.gray[1],
    marginBottom: 24,
  },

  flatList: {
    flex: 1,
  },
  resultContainer: {
    gap: 12,
    alignSelf: "stretch",
  },
  resultText: {
    alignSelf: "stretch",
    color: colors.black,
  },
});

export default LocationSearchResult;
