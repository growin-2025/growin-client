import { colors } from "@/styles/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GalleryPreviewScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    uri: string;
    fileName: string;
    mimeType: string;
  }>();

  const handleCancel = () => {
    router.back();
  };

  const handleConfirm = () => {
    if (!params.uri) return;

    // Photo 타입에 맞게 객체 생성
    const photoData = {
      id: Date.now(),
      imageUri: params.uri,
      mimeType: params.mimeType || "image/jpeg",
      fileName: params.fileName || `photo_${Date.now()}.jpg`,
    };

    console.log("갤러리에서 선택한 사진 데이터:", photoData);

    // TODO: 채팅 화면으로 데이터 전달
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* 상단 헤더 */}
      <SafeAreaView style={styles.header} edges={["top"]}>
        <Pressable onPress={handleCancel} hitSlop={8}>
          <Text style={styles.closeIcon}>✕</Text>
        </Pressable>
        <Text style={styles.headerTitle}>사진 선택</Text>
        <View style={{ width: 24 }} />
      </SafeAreaView>

      {/* 이미지 미리보기 */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: params.uri }} style={styles.image} />
      </View>

      {/* 하단 버튼 */}
      <SafeAreaView style={styles.footer} edges={["bottom"]}>
        <Pressable style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>취소</Text>
        </Pressable>

        <Pressable style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>선택</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "#000000",
  },
  closeIcon: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "300",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#fff",
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "#000000",
  },
  image: {
    flex: 1,
    resizeMode: "contain",
  },
  footer: {
    flexDirection: "row",
    backgroundColor: "#000000",
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 12,
    gap: 8,
  },
  cancelButton: {
    flex: 1,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  confirmButton: {
    flex: 1,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.main,
    borderRadius: 8,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
});
