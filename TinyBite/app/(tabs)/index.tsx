import MainCard from "@/components/main/MainCard";
import MainCategory from "@/components/main/MainCategory";
import MainHeader from "@/components/main/MainHeader";
import { colors } from "@/styles/colors";
import { useRouter } from "expo-router";

import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <MainHeader />
        <MainCategory />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.main,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    marginTop: 18,
    backgroundColor: colors.background,
  },
  listWrapper: {
    marginTop: 4,
    alignItems: "center",
  },
  cardWrapper: {
    gap: 16,
    marginBottom: 16,
  },
});
