import MainCardDetailHost from "@/components/main/main-card-detail/MainCardDetailHost";
import MainCardDetailHostNote from "@/components/main/main-card-detail/MainCardDetailHostNote";
import MainCardDetailInfo from "@/components/main/main-card-detail/MainCardDetailInfo";
import MainCardDetailPill from "@/components/main/main-card-detail/MainCardDetailPill";
import MainCardDetailProductLink from "@/components/main/main-card-detail/MainCardDetailProductLink";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MainCardDetailScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 상단 이미지 */}
      <Image
        style={styles.heroImage}
        source={require("@/assets/images/mainlist/food1.jpg")}
        resizeMode="cover"
      />

      {/* 컨텐츠 */}
      <View style={{ flex: 1 }}>
        {/* 내용 */}
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
          <View style={styles.inner}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Image
                source={require("@/assets/images/mainlist/detail/back-button.png")}
                style={styles.backButtonImage}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <ScrollView style={styles.contentContainer} bounces={false}>
              <View style={[styles.content]}>
                <Text style={[styles.title, textStyles.title20_B135]}>
                  후문 엽떡 나누실 분 ㅃㄹ
                </Text>

                <View style={styles.pillsRow}>
                  <MainCardDetailPill type="delivery" />
                  <MainCardDetailPill type="time" label="10분전" />
                </View>

                <MainCardDetailHost
                  //url="https://www.google.com"
                  avatar={require("@/assets/images/mainlist/detail/default-host-profile.png")}
                  name="엽떡조아"
                  location="서울시 강남구 역삼동"
                />

                <View style={styles.divider} />

                <MainCardDetailInfo
                  items={[
                    {
                      type: "location",
                      title: "역삼 래미안 앞",
                      meta: "내 위치에서 150M",
                    },
                    {
                      type: "group",
                      title: "2/4명 모집 중",
                      meta: "2명 남았어요!",
                    },
                    {
                      type: "money",
                      title: "1인당 5,000원",
                      meta: "총 20,000원",
                    },
                  ]}
                />

                <MainCardDetailProductLink
                  productTitle="코스트코 베이글 & 크림치즈"
                  productUrl="https://www.costco.co.kr/"
                />

                <MainCardDetailHostNote body="배달 팁 나누실 분 구해요! 엽떡 매운맛 시킬 예정입니다. 쿨피스는 제가 쏠게요." />
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>

        {/* 참여하기 버튼 */}
        <SafeAreaView style={styles.ctaContainer} edges={["bottom"]}>
          <TouchableOpacity style={styles.cta}>
            <Text style={[styles.ctaText, textStyles.title18_SB135]}>
              5,000원으로 참여하기
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative" },

  heroImage: {
    position: "absolute",
    backgroundColor: "#000000",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: 300,
  },

  safeArea: {
    flex: 1,
  },
  inner: {
    flex: 1,
    position: "relative",
  },

  backButton: {
    position: "absolute",
    padding: 2,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 3,
  },
  backButtonImage: {
    width: 40,
    height: 40,
  },

  contentContainer: {
    flex: 1,
    zIndex: 2,
  },
  content: {
    marginTop: 220,
    width: "100%",
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 28,
  },
  title: {
    color: "#000000",
    marginBottom: 8,
  },
  pillsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  divider: {
    alignSelf: "stretch",
    width: "100%",
    height: 4,
    backgroundColor: colors.gray[4],
    marginBottom: 16,
  },

  ctaContainer: {
    paddingTop: 12,
    paddingBottom: 18,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  cta: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: colors.main,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaText: {
    color: colors.white,
  },
});
