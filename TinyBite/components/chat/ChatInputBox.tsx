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
  onSend: (message: string) => void;
}

const ChatInputBox = ({
  onPlusPress,
  isPanelVisible,
  onSend,
}: ChatInputBoxProps) => {
  const [message, setMessage] = useState("");

  const handleMessageChange = useCallback((text: string) => {
    setMessage(text);
  }, []);

  const handlePlusPress = () => {
    Keyboard.dismiss();
    onPlusPress();
  };

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  return (
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

      <Pressable onPress={handleSend} disabled={!message.trim()}>
        <Image
          style={[styles.iconSend, !message.trim() && { opacity: 0.3 }]}
          source={SEND_ICON}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
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
    flex: 1,
    padding: 12,
    borderRadius: 16,
    backgroundColor: colors.background,
    boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.25)",
  },
  inputArea: {
    justifyContent: "center",
    color: colors.black,
    padding: 0,
  },
});

export default ChatInputBox;
