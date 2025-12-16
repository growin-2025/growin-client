import MainCard from "@/components/main/MainCard";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyPageScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style="dark" />
      {/* Header */}
      <View style={styles.headerWrapper}>
        <View style={styles.headerContent}>
          <Image
            source={require("@/assets/images/main/mainlogo.png")}
            style={{
              width: 32,
              height: 32,
              paddingTop: 1.97,
              paddingLeft: 2,
              paddingRight: 2.77,
              paddingBottom: 2.8,
              resizeMode: "contain",
            }}
          />
          <Text style={[styles.headerTitle, textStyles.title20_B135]}>
            내 정보
          </Text>
        </View>
        <Pressable onPress={() => router.push("../(mypage)/setting")}>
          <Image
            source={require("@/assets/images/mypage/setting.png")}
            style={{
              width: 28,
              height: 28,
              padding: 1.16667,
            }}
          />
        </Pressable>
      </View>

      {/* Profile */}
      <View style={styles.profileWrapper}>
        <View style={styles.profileCard}>
          <Image
            source={require("@/assets/images/mainlist/detail/default-host-profile.png")}
            style={styles.avatar}
            resizeMode="contain"
          />
          <Text style={[styles.userName, textStyles.title18_SB135]}>
            가짜대학생
          </Text>
          <Pressable
            style={styles.editButton}
            onPress={() => router.push("../(mypage)/edit")}
          >
            <Image
              source={require("@/assets/images/mypage/edit.png")}
              style={{
                width: 20,
                height: 20,
                padding: 0.83333,
                resizeMode: "contain",
              }}
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.sectionWrapper}>
        <Text style={[styles.sectionTitle, textStyles.body16_B150]}>
          참여 중인 파티
        </Text>
      </View>
      {/* Content */}
      <ScrollView style={styles.contentWrapper}>
        {/* Participating Parties Section */}
        <MainCard containerStyle={styles.mypageCard} />
        <MainCard containerStyle={styles.mypageCard} />
        <MainCard containerStyle={styles.mypageCard} />
        <MainCard containerStyle={styles.mypageCard} />
        <MainCard containerStyle={styles.mypageCard} />
        <MainCard containerStyle={styles.mypageCard} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    height: 58,
    gap: 8,
  },
  headerTitle: {
    color: colors.white,
  },
  profileWrapper: {
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  profileCard: {
    backgroundColor: colors.sub,
    marginTop: 12,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 60,
    height: 60,
  },
  userName: {
    flex: 1,
    color: colors.black,
  },
  editButton: {
    width: 24,
    height: 24,
    borderRadius: 16,
    backgroundColor: colors.white,
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionWrapper: {
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  sectionTitle: {
    color: colors.black,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  mypageCard: {
    borderRadius: 0,
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[4],
  },
});
