import MainCard from "@/components/main/MainCard";
import MainCategory from "@/components/main/MainCategory";
import MainHeader from "@/components/main/MainHeader";
import { colors } from "@/styles/colors";
import { useRouter } from "expo-router";

import { ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <MainHeader />
      <View style={styles.categoryWrapper}>
        <MainCategory />
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.listWrapper}
      >
        <View style={styles.cardWrapper}>
          <MainCard onPress={() => router.push("/main-card-detail")} />
          <MainCard />
          <MainCard />
          <MainCard />
          <MainCard />
          <MainCard />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    backgroundColor: colors.background,
  },
  listWrapper: {
    alignItems: "center",
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  cardWrapper: {
    gap: 16,
    marginBottom: 16,
  },
  categoryWrapper: {
    marginTop: 15, //카테고리 마진 5 뺀 15
    marginBottom: 10, //UI 가림 떄문에 리스트에 마진 5+ 카테고리 마진 5 합친 값 뺀 10
  },
});
