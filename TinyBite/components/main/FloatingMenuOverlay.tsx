import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { router } from "expo-router";
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FloatingMenuButton from "./FloatingMenuButton";

interface FloatingMenuOverlayProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}

const FloatingMenuOverlay = ({
  isMenuOpen,
  setIsMenuOpen,
}: FloatingMenuOverlayProps) => {
  return (
    <>
      {/* 메뉴가 열렸을 때만 Modal 렌더링 */}
      {isMenuOpen && (
        <Modal
          visible={true}
          transparent={true}
          animationType="fade"
          statusBarTranslucent={true}
          onRequestClose={() => setIsMenuOpen(false)}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setIsMenuOpen(false)}
          >
            <View
              style={styles.menuContainer}
              onStartShouldSetResponder={() => true}
            >
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => {
                  {
                    setIsMenuOpen(false);
                    router.navigate({
                      pathname: "/party/create/[type]",
                      params: { type: "delivery" },
                    });
                  }
                }}
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
                onPress={() => {
                  setIsMenuOpen(false);
                  router.navigate({
                    pathname: "/party/create/[type]",
                    params: { type: "necessities" },
                  });
                }}
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
                onPress={() => {
                  setIsMenuOpen(false);
                  router.navigate({
                    pathname: "/party/create/[type]",
                    params: { type: "shopping" },
                  });
                }}
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

            {/* 플로팅 버튼 - Modal 내부에 배치하여 최상위 유지 */}
            <View style={styles.floatingButtonInModal} pointerEvents="box-none">
              <FloatingMenuButton onPress={() => setIsMenuOpen(false)} />
            </View>
          </Pressable>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    gap: 8,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 160,
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

  floatingButtonInModal: {
    position: "absolute",
    right: 20,
    bottom: 100,
  },
});

export default FloatingMenuOverlay;
