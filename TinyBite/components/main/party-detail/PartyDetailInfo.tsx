import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { PartyDetail } from "@/types/party.types";
import { Image, StyleSheet, Text, View } from "react-native";

type InfoType = "location" | "group" | "money";

interface InfoItem {
  type: InfoType;
  title: string;
  meta: string;
}

interface PartyDetailInfoProps {
  partyDetail?: Pick<
    PartyDetail,
    | "pickupLocation"
    | "distance"
    | "currentParticipants"
    | "maxParticipants"
    | "remainingSlots"
    | "pricePerPerson"
    | "totalPrice"
  >;
}

const getIconByType = (type: InfoType) => {
  switch (type) {
    case "location":
      return require("@/assets/images/mainlist/detail/location-icon2.png");
    case "group":
      return require("@/assets/images/mainlist/detail/group-icon.png");
    case "money":
      return require("@/assets/images/mainlist/detail/money-icon.png");
    default:
      return require("@/assets/images/mainlist/detail/location-icon2.png");
  }
};

const PartyDetailInfo = ({ partyDetail }: PartyDetailInfoProps) => {
  // 정보 아이템 생성
  const items: InfoItem[] = [
    {
      type: "location",
      title: partyDetail?.pickupLocation.place || "로딩 중...",
      meta: partyDetail?.distance
        ? `내 위치에서 ${partyDetail.distance}`
        : "여기에서 픽업해요!",
    },
    {
      type: "group",
      title:
        partyDetail?.currentParticipants !== undefined &&
        partyDetail?.maxParticipants !== undefined
          ? `${partyDetail.currentParticipants}/${partyDetail.maxParticipants}명 모집 중`
          : "로딩 중...",
      meta:
        partyDetail?.remainingSlots !== undefined
          ? partyDetail.remainingSlots > 0
            ? `${partyDetail.remainingSlots}명 남았어요!`
            : "모집 완료"
          : "로딩 중...",
    },
    {
      type: "money",
      title: partyDetail?.pricePerPerson
        ? `1인당 ${partyDetail.pricePerPerson.toLocaleString()}원`
        : "로딩 중...",
      meta: partyDetail?.totalPrice
        ? `총 ${partyDetail.totalPrice.toLocaleString()}원`
        : "로딩 중...",
    },
  ];

  return (
    <>
      <View style={styles.infoRowWrapper}>
        {items.map((item, index) => (
          <View key={index} style={styles.infoRow}>
            <View style={styles.infoIconWrap}>
              <Image
                source={getIconByType(item.type)}
                style={styles.infoIcon}
                resizeMode="contain"
              />
            </View>
            <View style={styles.infoBlock}>
              <Text style={[styles.infoTitle, textStyles.body16_SB135]}>
                {item.title}
              </Text>
              <Text style={[styles.infoMeta, textStyles.body12_M135]}>
                {item.meta}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );
};

export default PartyDetailInfo;

const styles = StyleSheet.create({
  infoRowWrapper: {
    gap: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoBlock: {
    flex: 1,
  },
  infoTitle: {
    color: "#000000",
  },
  infoIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.sub,
    paddingHorizontal: 3,
    paddingVertical: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  infoIcon: {
    width: 32,
    height: 32,
  },
  infoMeta: {
    color: colors.gray[1],
  },
});
