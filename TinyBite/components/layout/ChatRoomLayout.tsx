import ChatInputBox from "@/components/chat/ChatInputBox";
import ChatRoomHeader from "@/components/ChatRoomHeader";
import { colors } from "@/styles/colors";
import { StatusBar } from "expo-status-bar";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

interface ChatRoomLayoutProps {
  children: ReactNode;
}

const ChatRoomLayout = ({ children }: ChatRoomLayoutProps) => {
  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <ChatRoomHeader />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="padding"
          keyboardVerticalOffset={0}
        >
          {children}
          <ChatInputBox />
        </KeyboardAvoidingView>
      </View>
      <SafeAreaView style={styles.safeAreaBottom} edges={["bottom"]} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sub,
  },
  safeAreaBottom: {
    backgroundColor: colors.white,
  },
});

export default ChatRoomLayout;
