import { useChatStore } from "@/stores/chatStore";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();
  const setSelectedImage = useChatStore((state) => state.setSelectedImage);

  if (!permission) {
    return <View style={styles.container} />;
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const takePicture = async () => {
    if (!cameraRef.current) return;

    try {
      setIsProcessing(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });

      if (photo) {
        setCapturedPhoto(photo.uri);
      }
    } catch (error) {
      console.error("사진 촬영 실패:", error);
      Alert.alert("오류", "사진 촬영에 실패했습니다.");
    } finally {
      setIsProcessing(false);
    }
  };

  const retakePicture = () => {
    setCapturedPhoto(null);
  };

  const confirmPhoto = () => {
    if (!capturedPhoto) return;

    const fileName = `photo_${Date.now()}.jpg`;
    const photoData = {
      id: Date.now(),
      imageUri: capturedPhoto,
      mimeType: "image/jpeg",
      fileName: fileName,
    };

    setSelectedImage(photoData);

    router.back();
  };

  const handleClose = () => {
    router.back();
  };

  // 미리보기 화면
  if (capturedPhoto) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        {/* 상단 헤더 */}
        <View style={styles.previewHeader}>
          <Pressable onPress={handleClose} hitSlop={8}>
            <Text style={styles.closeIcon}>✕</Text>
          </Pressable>
          <Text style={styles.headerTitle}>사진 촬영</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* 이미지 미리보기 */}
        <View style={styles.previewImageContainer}>
          <Image source={{ uri: capturedPhoto }} style={styles.previewImage} />
        </View>

        {/* 하단 버튼 */}
        <SafeAreaView style={styles.previewFooter} edges={["bottom"]}>
          <Pressable style={styles.retakeButton} onPress={retakePicture}>
            <Text style={styles.retakeButtonText}>다시 찍기</Text>
          </Pressable>

          <Pressable style={styles.confirmButton} onPress={confirmPhoto}>
            <Text style={styles.confirmButtonText}>저장</Text>
          </Pressable>
        </SafeAreaView>
      </View>
    );
  }

  // 카메라 촬영 화면
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
        {/* 상단 헤더 */}
        <SafeAreaView style={styles.cameraHeader} edges={["top"]}>
          <Pressable onPress={handleClose} hitSlop={8}>
            <Text style={styles.closeIcon}>✕</Text>
          </Pressable>
          <Text style={styles.headerTitle}>사진 촬영</Text>
          <View style={{ width: 24 }} />
        </SafeAreaView>

        {/* 중앙 컨텐츠 영역 (여기에 텍스트 입력 등 추가 가능) */}
        <View style={styles.cameraContent}>{/* 필요시 추가 UI */}</View>

        {/* 하단 컨트롤 */}
        <View style={styles.cameraFooter}>
          <SafeAreaView style={styles.controlsRow} edges={["bottom"]}>
            {/* 빈 공간 */}
            <View style={styles.sideControl} />

            {/* 촬영 버튼 */}
            <Pressable
              style={styles.captureButton}
              onPress={takePicture}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <ActivityIndicator color={colors.white} size="large" />
              ) : (
                <View style={styles.captureButtonInner} />
              )}
            </Pressable>

            {/* 카메라 전환 버튼 */}
            <View style={styles.sideControl}>
              <Pressable style={styles.flipButton} onPress={toggleCameraFacing}>
                <Text style={[styles.flipIcon, textStyles.body15_SB135]}>
                  전환
                </Text>
              </Pressable>
            </View>
          </SafeAreaView>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    gap: 20,
  },
  permissionText: {
    color: "#fff",
  },
  permissionButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: colors.main,
    borderRadius: 8,
  },
  camera: {
    flex: 1,
  },

  // 헤더 공통
  cameraHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  previewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "#000",
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

  // 카메라 화면
  cameraContent: {
    flex: 1,
  },
  cameraFooter: {
    paddingTop: 20,
  },
  controlsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  sideControl: {
    width: 60,
    alignItems: "center",
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  captureButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fff",
  },
  flipButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  flipIcon: {
    color: colors.white,
  },

  // 미리보기 화면
  previewImageContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  previewImage: {
    flex: 1,
    resizeMode: "contain",
  },
  previewFooter: {
    flexDirection: "row",
    backgroundColor: "#000",
    paddingHorizontal: 16,
    marginBottom: 20,
    paddingTop: 12,
    gap: 8,
  },
  retakeButton: {
    flex: 1,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
  },
  retakeButtonText: {
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
