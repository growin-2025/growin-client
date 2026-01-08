import { getActiveParties, getHostingParties } from "@/api/partyApi";
import MainCard from "@/components/main/MainCard";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { PartyItem } from "@/types/party";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

type TabType = "active" | "hosting";

/**
 * 마이페이지 파티 리스트 컴포넌트
 * - 참여 중인 파티 / 내가 만든 파티 탭 전환
 * - 각 탭에 맞는 파티 리스트 표시
 */
const MyPartyList = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("active");

  // 참여중인 파티 리스트 조회
  const { data: activeParties = [], isLoading: isLoadingActive } = useQuery<
    PartyItem[]
  >({
    queryKey: ["getActiveParties"],
    queryFn: getActiveParties,
  });

  // 호스팅 중인 파티 리스트 조회
  const { data: hostingParties = [], isLoading: isLoadingHosting } = useQuery<
    PartyItem[]
  >({
    queryKey: ["getHostingParties"],
    queryFn: getHostingParties,
    enabled: activeTab === "hosting",
  });

  const isLoading = activeTab === "active" ? isLoadingActive : isLoadingHosting;
  const parties = activeTab === "active" ? activeParties : hostingParties;
  const emptyText =
    activeTab === "active"
      ? "참여 중인 파티가 없습니다."
      : "내가 만든 파티가 없습니다.";

  return (
    <View style={styles.container}>
      {/* 탭 바 */}
      <View style={styles.tabBarContainer}>
        <View style={styles.grayUnderline} />
        <View style={styles.tabBar}>
          <Pressable
            style={({ pressed }) => [
              styles.tab,
              { opacity: pressed ? 0.6 : 1 },
            ]}
            onPress={() => setActiveTab("active")}
          >
            <Text
              style={[
                textStyles.body16_SB135,
                {
                  color: activeTab === "active" ? colors.main : colors.gray[2],
                },
              ]}
            >
              참여 중인 파티
            </Text>
            {activeTab === "active" && <View style={styles.indicator} />}
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.tab,
              { opacity: pressed ? 0.6 : 1 },
            ]}
            onPress={() => setActiveTab("hosting")}
          >
            <Text
              style={[
                textStyles.body16_SB135,
                {
                  color: activeTab === "hosting" ? colors.main : colors.gray[2],
                },
              ]}
            >
              내가 만든 파티
            </Text>
            {activeTab === "hosting" && <View style={styles.indicator} />}
          </Pressable>
        </View>
      </View>

      {/* 콘텐츠 */}
      {isLoading ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, textStyles.body16_SB135]}>
            로딩 중...
          </Text>
        </View>
      ) : parties.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, textStyles.body16_SB135]}>
            {emptyText}
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.contentWrapper}>
          {parties.map((item) => (
            <MainCard
              key={item.partyId}
              item={item}
              containerStyle={styles.mypageCard}
              onPress={() =>
                router.push({
                  pathname: "/party-detail/[id]" as any,
                  params: { id: item.partyId.toString() },
                })
              }
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default MyPartyList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarContainer: {
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    position: "relative",
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 12,
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: colors.main,
    borderRadius: 2,
    zIndex: 2,
  },
  grayUnderline: {
    position: "absolute",
    bottom: 0,
    left: 20,
    right: 20,
    height: 4,
    backgroundColor: colors.gray[4],
    borderRadius: 2,
    zIndex: 0,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mypageCard: {
    borderRadius: 0,
    paddingHorizontal: 30,
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[4],
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 40,
    alignItems: "center",
  },
  emptyText: {
    color: colors.gray[1],
  },
});
