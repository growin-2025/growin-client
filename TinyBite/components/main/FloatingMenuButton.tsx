import { colors } from "@/styles/colors";
import { Image, Pressable, StyleSheet } from "react-native";

interface FloatingMenuButtonProps {
  onPress?: () => void;
}

const FloatingMenuButton = ({ onPress }: FloatingMenuButtonProps) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        source={require("@/assets/images/plus.png")}
        style={styles.image}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 52,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1 / 1,
    borderRadius: 100,
    backgroundColor: colors.main,
    // Android 그림자
    elevation: 2,
    // iOS 그림자
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  image: {
    width: 32,
    height: 32,
    aspectRatio: 1 / 1,
  },
});

export default FloatingMenuButton;
