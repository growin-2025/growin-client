import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditProfileScreen() {
  const router = useRouter();
  const [nickname, setNickname] = useState("가짜대학생");
  const maxLength = 12;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style="dark" />
      {/* Header */}
      <View style={styles.headerWrapper}>
        <Pressable onPress={() => router.back()}>
          <Image
            source={require("@/assets/images/chevron/chevron-left-44.png")}
            style={styles.backIcon}
          />
        </Pressable>
        <Text style={[styles.headerTitle, textStyles.title20_B135]}>
          프로필 수정
        </Text>
        <Pressable>
          <Text style={[styles.saveButton, textStyles.body16_SB135]}>완료</Text>
        </Pressable>
      </View>

      {/* Content */}
      <View style={styles.contentWrapper}>
        {/* Profile Picture */}
        <View style={styles.profileImageWrapper}>
          <Image
            source={require("@/assets/images/mainlist/detail/default-host-profile.png")}
            style={styles.profileImage}
            resizeMode="cover"
          />
          <Pressable style={styles.cameraButton}>
            <Image
              source={require("@/assets/images/mypage/camera.png")}
              style={{
                width: 24,
                height: 24,
                resizeMode: "contain",
              }}
            />
          </Pressable>
        </View>

        {/* Nickname Input */}
        <View style={styles.nicknameWrapper}>
          <View style={styles.nicknameInputWrapper}>
            <Text style={[styles.nicknameLabel, textStyles.body16_SB135]}>
              닉네임
            </Text>
            <TextInput
              style={[styles.nicknameInput, textStyles.title18_SB135]}
              value={nickname}
              onChangeText={setNickname}
              maxLength={maxLength}
              placeholder="닉네임을 입력하세요"
            />
            <Text style={[styles.charCount, textStyles.body12_M135]}>
              ({nickname.length}/{maxLength})
            </Text>
          </View>
        </View>
        <Text style={[styles.errorMessage, textStyles.body16_M135]}>
          닉네임은 최소 2자 이상이어야 해요.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  headerWrapper: {
    backgroundColor: colors.background,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    height: 36,
  },
  backIcon: {
    width: 36,
    height: 36,
  },
  headerTitle: {
    color: colors.black,
  },
  saveButton: {
    color: colors.gray[1],
  },
  contentWrapper: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: colors.background,
    alignItems: "center",
  },
  profileImageWrapper: {
    position: "relative",
    marginBottom: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  nicknameWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  nicknameInputWrapper: {
    flex: 1,
    height: 96,
    padding: 12,
    backgroundColor: colors.white,
    borderRadius: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  nicknameLabel: {
    color: colors.gray[1],
    marginBottom: 8,
  },
  nicknameInput: {
    flex: 1,
    color: colors.black,
    marginBottom: 4,
  },
  charCount: {
    color: colors.gray[1],
    alignSelf: "flex-end",
  },
  errorMessage: {
    color: colors.red[1],
    alignSelf: "flex-start",
    marginTop: 8,
  },
});
