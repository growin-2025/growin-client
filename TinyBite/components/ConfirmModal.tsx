import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import {
  Image,
  ImageSourcePropType,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface ConfirmModalProps {
  visible: boolean;
  icon?: ImageSourcePropType;
  title: string;
  message?: string;
  onClose: () => void;
  // 2개 버튼 모드
  cancelText?: string;
  confirmText?: string;
  cancelTextColor?: string;
  onConfirm?: () => void | Promise<void | boolean>;
  cancelButtonColor?: string;
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
  icon,
  title,
  message,
  onClose,
  cancelText,
  confirmText,
  cancelTextColor = colors.white,
  onConfirm,
  cancelButtonColor = colors.gray[2],
  confirmButtonColor = colors.main,
  singleButtonText,
  onSingleButtonPress,
  singleButtonColor = colors.main,
}: ConfirmModalProps) {
  const isSingleButtonMode = !!singleButtonText || !!onSingleButtonPress;
  // 메시지가 없고 단일 버튼 모드일 때 타이틀 하단 마진 20 (실패 모달 등)
  const titleMarginBottom = !message && isSingleButtonMode ? 20 : 4;

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
          {icon && (
            <View style={styles.iconWrapper}>
              <Image source={icon} style={styles.icon} resizeMode="contain" />
            </View>
          )}

          <View style={styles.contentWrapper}>
            <View
              style={[
                styles.titleContainer,
                { marginBottom: titleMarginBottom },
              ]}
            >
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
          </View>

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
                style={[
                  styles.modalButton,
                  styles.cancelButton,
                  { backgroundColor: cancelButtonColor },
                ]}
                onPress={onClose}
              >
                <Text
                  style={[textStyles.title18_SB135, { color: cancelTextColor }]}
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
    alignSelf: "stretch",
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginHorizontal: 20,
    backgroundColor: colors.white,
    borderRadius: 16,
    gap: 20,
  },
  iconWrapper: {
    alignSelf: "center",
    borderRadius: 100,
    backgroundColor: colors.sub,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: { width: 50, height: 50 },
  contentWrapper: { gap: 4 },
  titleContainer: {
    alignItems: "center",
  },
  modalTitle: {
    color: colors.black,
    textAlign: "center",
  },
  messageContainer: {
    alignItems: "center",
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
