import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { useCallback, useState } from "react";
import {
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

const PLUS_ICON = require("@/assets/images/plus-32-gray.png");
const SEND_ICON = require("@/assets/images/chat/send.png");
interface ChatInputBoxProps {
  onPlusPress: () => void;
  isPanelVisible: boolean;
}

const ChatInputBox = ({ onPlusPress, isPanelVisible }: ChatInputBoxProps) => {
  const [message, setMessage] = useState("");

  const handleMessageChange = useCallback((text: string) => {
    setMessage(text);
  }, []);

  const handlePlusPress = () => {
    Keyboard.dismiss();
    onPlusPress();
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerWrapper}>
        <Pressable onPress={handlePlusPress}>
          <Image style={styles.iconPlus} source={PLUS_ICON} />
        </Pressable>

        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.inputArea, textStyles.body16_SB135]}
            placeholder="메시지를 입력하세요"
            placeholderTextColor={colors.gray[2]}
            multiline={true}
            keyboardType={"default"}
            onChangeText={handleMessageChange}
            value={message}
            numberOfLines={3}
            onFocus={() => {
              if (isPanelVisible) {
                onPlusPress();
              }
            }}
          />
        </View>

        <Image style={styles.iconSend} source={SEND_ICON} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  containerWrapper: {
    alignItems: "center",
    gap: 8,
    flexDirection: "row",
  },

  iconPlus: {
    width: 32,
    height: 32,
  },
  iconSend: {
    width: 28,
    height: 28,
  },

  inputWrapper: {
    flexGrow: 1,
    padding: 12,
    borderRadius: 16,
    backgroundColor: colors.background,
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.25)",
  },
  inputArea: {
    justifyContent: "center",
    color: colors.black,
    padding: 0,
  },
});

export default ChatInputBox;
