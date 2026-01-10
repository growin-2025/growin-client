// components/chat/ChatBottomPanel.tsx
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const GALLERY_ICON = require("@/assets/images/chat/gallery.png");
const CAMERA_ICON = require("@/assets/images/chat/camera.png");

interface ChatBottomPanelProps {
  isVisible: boolean;
  onGalleryPress: () => void;
  onCameraPress: () => void;
}

const ChatBottomPanel = ({
  isVisible,
  onGalleryPress,
  onCameraPress,
}: ChatBottomPanelProps) => {
  const insets = useSafeAreaInsets();

  if (!isVisible) return null;

  return (
    <View>
      <View style={styles.panelContent}>
        <Pressable style={styles.option} onPress={onGalleryPress}>
          <View style={styles.iconContainer}>
            <Image source={GALLERY_ICON} style={styles.optionIcon} />
          </View>
          <Text style={[textStyles.body13_SB135, styles.optionText]}>
            갤러리
          </Text>
        </Pressable>

        <Pressable style={styles.option} onPress={onCameraPress}>
          <View style={styles.iconContainer}>
            <Image source={CAMERA_ICON} style={styles.optionIcon} />
          </View>
          <Text style={[textStyles.body13_SB135, styles.optionText]}>
            카메라
          </Text>
        </Pressable>
      </View>
    </View>
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
