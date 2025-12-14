import LocationSearchResult from "@/components/LocationSearchResult";
import PaginationIndecatorHeader from "@/components/PaginationIndecatorHeader";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegionScreen() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [verified, setVerified] = useState(false);

  const handleTextChange = useCallback((text: string) => {
    setText(text);
    setVerified(true);
  }, []);

  const handleFindLocationClick = () => {
    console.log("위치 찾기 버튼 클릭");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.inner}>
        {/* 헤더 */}
        <View style={{ marginBottom: 24 }}>
          <PaginationIndecatorHeader page={3} />
        </View>

        {/* 동네 설정 */}
        <View style={{ marginBottom: 10 }}>
          <Text
            style={[styles.title, textStyles.title24_SB135]}
          >{`내 동네를 설정하고 \n근처 이웃과 딱 필요한 만큼 나눠요!`}</Text>

          <View style={styles.inputContainer}>
            <Image
              source={require("@/assets/images/location.png")}
              style={{ width: 24, height: 24, aspectRatio: 1 / 1 }}
            />
            <TextInput
              style={[styles.input, textStyles.title18_SB135]}
              onChangeText={handleTextChange}
              value={text}
              placeholder="동명(읍,면)으로 검색 (ex.역삼동)"
              placeholderTextColor={colors.gray[1]}
              keyboardType="default"
              maxLength={8}
            />
          </View>

          <TouchableOpacity
            style={styles.findBtn}
            onPress={handleFindLocationClick}
          >
            <Image
              source={require("@/assets/images/location-tracking.png")}
              style={{ width: 24, height: 24, aspectRatio: 1 / 1 }}
            />
            <Text style={[styles.findText, textStyles.body15_SB135]}>
              현재 위치로 주소 찾기
            </Text>
          </TouchableOpacity>
        </View>

        <LocationSearchResult />

        {/* 다음 버튼 */}
        <TouchableOpacity
          style={[styles.nextBtn, !verified && styles.disabled]}
          disabled={!verified}
          onPress={() => router.replace("/(auth)/signup/complete")}
        >
          <Text style={[styles.nextText, textStyles.title18_SB135]}>다음</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  inner: { flex: 1 },

  title: {
    marginBottom: 28,
    color: colors.main,
  },

  inputContainer: {
    flexDirection: "row",
    gap: 4,
    padding: 12,
    marginBottom: 12,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 0,
    // 그림자 효과 (iOS)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // 그림자 효과 (Android)
    elevation: 3,
  },
  input: {
    flex: 1,
    alignSelf: "stretch",
    color: "#000",
    padding: 0,
    margin: 0,
  },
  findBtn: {
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    borderRadius: 16,
    backgroundColor: colors.main,
  },
  findText: {
    color: colors.white,
  },

  nextBtn: {
    backgroundColor: colors.main,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 16,
  },
  nextText: {
    color: colors.white,
  },
  disabled: { opacity: 0.3 },
});
