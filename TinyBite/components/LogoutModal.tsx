import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({
  visible,
  onClose,
  onConfirm,
}: LogoutModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={[styles.modalTitle, textStyles.title18_SB135]}>
            로그아웃
          </Text>
          <Text style={[styles.modalMessage, textStyles.body13_SB135]}>
            로그아웃 하시겠습니까?
          </Text>
          <View style={styles.modalButtons}>
            <Pressable
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={[styles.cancelButtonText, textStyles.title18_SB135]}>
                아니요
              </Text>
            </Pressable>
            <Pressable
              style={[styles.modalButton, styles.confirmButton]}
              onPress={onConfirm}
            >
              <Text
                style={[styles.confirmButtonText, textStyles.title18_SB135]}
              >
                예
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    paddingHorizontal: 12,
    paddingVertical: 20,
    backgroundColor: colors.white,
    borderRadius: 16,
    width: "100%",
    maxWidth: 362,
  },
  modalTitle: {
    color: colors.black,
    textAlign: "center",
    marginBottom: 4,
  },
  modalMessage: {
    color: colors.gray[1],
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
  },
  modalButton: {
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    width: 116,
    backgroundColor: colors.gray[2],
  },
  cancelButtonText: {
    color: colors.white,
  },
  confirmButton: {
    width: 214,
    backgroundColor: colors.main,
  },
  confirmButtonText: {
    color: colors.white,
  },
});
