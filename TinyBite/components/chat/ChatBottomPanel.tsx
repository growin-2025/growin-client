import { useUploadFileMutation } from "@/hooks/mutations/useFile";
import { useChatStore } from "@/stores/chatStore";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import ConfirmModal from "../ConfirmModal";

const GALLERY_ICON = require("@/assets/images/chat/gallery.png");
const CAMERA_ICON = require("@/assets/images/chat/camera.png");

interface ChatBottomPanelProps {
  isVisible: boolean;
  setIsPanelVisible: (visible: boolean) => void;
  onSend: (imageUrl: string) => void;
}

const ChatBottomPanel = ({
  isVisible,
  setIsPanelVisible,
  onSend,
}: ChatBottomPanelProps) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const router = useRouter();
  const selectedImage = useChatStore((state) => state.selectedImage);
  const { mutateAsync: UploadFileMutation } = useUploadFileMutation();

  const handleGalleryPress = async () => {
    // 갤러리 권한 확인
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      setShowGalleryModal(true);
      return;
    }

    // 갤러리에서 이미지 선택
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 0.8,
      allowsMultipleSelection: false,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedImage = result.assets[0];

      // 파일명 추출
      const uriParts = selectedImage.uri.split("/");
      const fileName =
        uriParts[uriParts.length - 1] || `photo_${Date.now()}.jpg`;

      setIsPanelVisible(false);

      // 미리보기 화면으로 이동
      router.push({
        pathname: "/gallery-preview",
        params: {
          uri: selectedImage.uri,
          fileName: fileName,
          mimeType: selectedImage.mimeType || "image/jpeg",
        },
      });
    }
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

  useEffect(() => {
    const uploadImage = async () => {
      if (selectedImage) {
        console.log("[ChatBottomPanel] 이미지 선택됨:", selectedImage);

        const photoStringList = await UploadFileMutation([selectedImage]);

        console.log("최종 사진 URL:", photoStringList[0]);
        onSend(photoStringList[0]);
      }
    };
    uploadImage();
  }, [UploadFileMutation, onSend, selectedImage]);

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

      <ConfirmModal
        visible={showGalleryModal}
        title="사진 사용 권한을 허용해주세요."
        onClose={() => setShowGalleryModal(false)}
        cancelText="취소"
        confirmText="확인"
        onConfirm={async () => {
          setShowGalleryModal(false);
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
