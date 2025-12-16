import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface FloatingMenuOverlayProps {
  visible: boolean;
  onClose: () => void;
}

const FloatingMenuOverlay = ({
  visible,
  onClose,
}: FloatingMenuOverlayProps) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <Pressable style={styles.overlay}>
        <Text>test</Text>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(34, 34, 34, 0.50)",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});

export default FloatingMenuOverlay;
