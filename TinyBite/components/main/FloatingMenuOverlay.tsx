import FloatingMenuButton from "@/components/main/FloatingMenuButton";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const FloatingMenuOverlay = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="none"
      statusBarTranslucent={true}
    >
      <Pressable
        style={[styles.container, isMenuOpen && styles.containerBackground]}
        onPress={() => setIsMenuOpen(false)}
        pointerEvents={isMenuOpen ? "auto" : "box-none"}
      >
        {/* 메뉴 - isMenuOpen이 true일 때만 표시 */}
        {isMenuOpen && (
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
        )}

        {/* 버튼 - 항상 표시 */}
        <FloatingMenuButton onPress={() => setIsMenuOpen((prev) => !prev)} />
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 100,
  },
  // 메뉴가 열렸을 때만 적용되는 배경색
  containerBackground: {
    backgroundColor: "rgba(34, 34, 34, 0.5)",
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
