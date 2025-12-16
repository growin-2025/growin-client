import { Modal, Pressable, StyleSheet, Text } from "react-native";

const FloatingMenuOverlay = () => {
  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="fade"
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
