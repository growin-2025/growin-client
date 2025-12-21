import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message?: string;
  onClose: () => void;
  // 2개 버튼 모드
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void | Promise<void | boolean>;
  confirmButtonColor?: string;
  // 1개 버튼 모드
  singleButtonText?: string;
  onSingleButtonPress?: () => void;
  singleButtonColor?: string;
}

/**
 * 범용 확인 모달 컴포넌트
 * - 2개 버튼 모드: 취소/확인 (onConfirm, cancelText, confirmText 제공)
 * - 1개 버튼 모드: 닫기 (singleButtonText, onSingleButtonPress 제공)
 */
export default function ConfirmModal({
  visible,
  title,
  message,
  onClose,
  cancelText,
  confirmText,
  onConfirm,
  confirmButtonColor = colors.main,
  singleButtonText,
  onSingleButtonPress,
  singleButtonColor = colors.main,
}: ConfirmModalProps) {
  const isSingleButtonMode = !!singleButtonText || !!onSingleButtonPress;

  const handleConfirm = async () => {
    if (onConfirm) {
      const result = await onConfirm();
      // onConfirm이 false를 반환하면 모달을 닫지 않음 (부모에서 실패 모달 표시 등 처리)
      if (result !== false) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  const handleSingleButton = () => {
    onSingleButtonPress?.();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            {title.split("\n").map((line, index) => (
              <Text
                key={index}
                style={[styles.modalTitle, textStyles.title18_SB135]}
              >
                {line}
              </Text>
            ))}
          </View>
          {message && (
            <View style={styles.messageContainer}>
              {message.split("\n").map((line, index) => (
                <Text
                  key={index}
                  style={[styles.modalMessage, textStyles.body13_SB135]}
                >
                  {line}
                </Text>
              ))}
            </View>
          )}
          {isSingleButtonMode ? (
            <Pressable
              style={[
                styles.modalButton,
                styles.singleButton,
                { backgroundColor: singleButtonColor },
              ]}
              onPress={handleSingleButton}
            >
              <Text style={[styles.singleButtonText, textStyles.title18_SB135]}>
                {singleButtonText || "닫기"}
              </Text>
            </Pressable>
          ) : (
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={onClose}
              >
                <Text
                  style={[styles.cancelButtonText, textStyles.title18_SB135]}
                >
                  {cancelText || "취소"}
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.modalButton,
                  styles.confirmButton,
                  { backgroundColor: confirmButtonColor },
                ]}
                onPress={handleConfirm}
              >
                <Text
                  style={[styles.confirmButtonText, textStyles.title18_SB135]}
                >
                  {confirmText || "확인"}
                </Text>
              </Pressable>
            </View>
          )}
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
  titleContainer: {
    alignItems: "center",
    marginBottom: 4,
  },
  modalTitle: {
    color: colors.black,
    textAlign: "center",
  },
  messageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  modalMessage: {
    color: colors.gray[1],
    textAlign: "center",
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
  },
  confirmButtonText: {
    color: colors.white,
  },
  singleButton: {
    width: "100%",
  },
  singleButtonText: {
    color: colors.white,
  },
});
