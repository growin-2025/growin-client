import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PartyDetailBackButton = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={[styles.backButton, { marginTop: insets.top + 2 }]}
    >
      <Image
        source={require("@/assets/images/chevron/chevron-left-36.png")}
        style={styles.backButtonImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default PartyDetailBackButton;

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    padding: 2,
    marginLeft: 20,
    width: 36,
    height: 36,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)", // 반투명 배경
    zIndex: 11, // 헤더 배경 위에 표시
  },
  backButtonImage: {
    width: 36,
    height: 36,
  },
});
