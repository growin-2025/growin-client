import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface PartyDetailCTAProps {
  isClosed?: boolean;
  isParticipating?: boolean;
  pricePerPerson?: number;
  onPress?: () => void;
}

const PartyDetailCTA = ({
  isClosed,
  isParticipating,
  pricePerPerson,
  onPress,
}: PartyDetailCTAProps) => {
  const getButtonText = () => {
    if (isClosed) {
      return "마감된 파티예요";
    }
    if (isParticipating) {
      return "채팅방으로 이동";
    }
    if (pricePerPerson != null) {
      return `${pricePerPerson.toLocaleString()}원으로 참여하기`;
    }
    return "로딩 중...";
  };

  return (
    <SafeAreaView style={styles.ctaContainer} edges={["bottom"]}>
      <TouchableOpacity
        style={[styles.cta, isClosed && styles.ctaDisabled]}
        disabled={isClosed}
        onPress={onPress}
      >
        <Text
          style={[
            styles.ctaText,
            isClosed && styles.ctaDisabledText,
            textStyles.title18_SB135,
          ]}
        >
          {getButtonText()}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PartyDetailCTA;

const styles = StyleSheet.create({
  ctaContainer: {
    paddingTop: 12,
    paddingBottom: 18,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
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
  ctaDisabled: {
    backgroundColor: colors.gray[2],
  },
  ctaDisabledText: {
    color: colors.white,
  },
});
