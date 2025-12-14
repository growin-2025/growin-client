import { colors } from "@/styles/colors";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const FloatingMenuButton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          source={require("@/assets/images/plus.png")}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
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
