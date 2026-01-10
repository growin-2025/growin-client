import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import ConfirmModal from "../ConfirmModal";

const GALLERY_ICON = require("@/assets/images/chat/gallery.png");
const CAMERA_ICON = require("@/assets/images/chat/camera.png");

interface ChatBottomPanelProps {
  isVisible: boolean;
  setIsPanelVisible: (visible: boolean) => void;
}

const ChatBottomPanel = ({
  isVisible,
  setIsPanelVisible,
}: ChatBottomPanelProps) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [showCameraModal, setShowCameraModal] = useState(false);
  const router = useRouter();

  const handleGalleryPress = () => {
    console.log("갤러리 열기");
    setIsPanelVisible(false);
    // TODO: 갤러리 열기 로직
  };

  const handleCameraPress = async () => {
    if (!permission) {
      return;
    }

    if (!permission.granted) {
      setShowCameraModal(true);
      return;
    }

    // 카메라 화면으로 이동
    setIsPanelVisible(false);
    router.push("/camera");
  };

  if (!isVisible) return null;

  return (
    <>
      <View>
        <View style={styles.panelContent}>
          <Pressable style={styles.option} onPress={handleGalleryPress}>
            <View style={styles.iconContainer}>
              <Image source={GALLERY_ICON} style={styles.optionIcon} />
            </View>
            <Text style={[textStyles.body13_SB135, styles.optionText]}>
              갤러리
            </Text>
          </Pressable>

          <Pressable style={styles.option} onPress={handleCameraPress}>
            <View style={styles.iconContainer}>
              <Image source={CAMERA_ICON} style={styles.optionIcon} />
            </View>
            <Text style={[textStyles.body13_SB135, styles.optionText]}>
              카메라
            </Text>
          </Pressable>
        </View>
      </View>

      <ConfirmModal
        visible={showCameraModal}
        title="카메라 사용 권한을 허용해주세요."
        onClose={() => setShowCameraModal(false)}
        cancelText="취소"
        confirmText="확인"
        onConfirm={async () => {
          const { granted } = await requestPermission();
          setShowCameraModal(false);
          if (granted) {
            router.push("/camera");
          }
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  panelContent: {
    flexDirection: "row",
    gap: 20,
  },
  option: {
    alignItems: "center",
    gap: 8,
  },
  iconContainer: {
    padding: 14,
    borderRadius: 30,
    backgroundColor: colors.sub,
  },
  optionIcon: {
    width: 32,
    height: 32,
  },
  optionText: {
    color: colors.gray[1],
  },
});

export default ChatBottomPanel;
