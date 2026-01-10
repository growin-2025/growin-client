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
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
  },
  image: {
    width: 32,
    height: 32,
    aspectRatio: 1 / 1,
  },
});

export default FloatingMenuButton;
