import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import {
  Image,
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
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => console.log("배달 클릭")}
          >
            <Image
              style={styles.menuIcon}
              source={require("@/assets/images/main/category/delivery.png")}
            />
            <Text style={[styles.menuText, textStyles.title20_SB135]}>
              배달
            </Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => console.log("생필품 클릭")}
          >
            <Image
              style={styles.menuIcon}
              source={require("@/assets/images/main/category/essentials.png")}
            />
            <Text style={[styles.menuText, textStyles.title20_SB135]}>
              생필품
            </Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => console.log("장보기 클릭")}
          >
            <Image
              style={styles.menuIcon}
              source={require("@/assets/images/main/category/grocery.png")}
            />
            <Text style={[styles.menuText, textStyles.title20_SB135]}>
              장보기
            </Text>
          </TouchableOpacity>
        </View>
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
    paddingRight: 20,
    paddingBottom: 160,
  },

  menuContainer: {
    padding: 20,
    justifyContent: "center",
    gap: 8,
    borderRadius: 16,
    backgroundColor: "#fff",
    // 그림자 효과 (iOS)
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowRadius: 16,
    // 그림자 효과 (Android)
    elevation: 3,
  },

  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "stretch",
  },
  menuIcon: {
    width: 32,
    height: 32,
    aspectRatio: 1 / 1,
  },
  menuText: {
    color: colors.gray[1],
  },

  divider: {
    height: 1,
    backgroundColor: colors.gray[4],
    paddingHorizontal: 8,
  },
});

export default FloatingMenuOverlay;
