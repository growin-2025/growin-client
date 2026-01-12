import { colors } from "@/styles/colors";
import { ImageUrlMessage } from "@/types/chat.types";
import { Image, StyleSheet, View } from "react-native";
import { formatTime } from "./ChatMessage";
import { MessageTime } from "./MessageTime";

interface OutgoingImageMessageProps {
  message: ImageUrlMessage;
}

export function OutgoingImageMessage({ message }: OutgoingImageMessageProps) {
  const time = formatTime(message.createdAt);

  return (
    <View style={styles.wrapper}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: message.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <MessageTime time={time} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 4,
    flexDirection: "row-reverse",
    alignItems: "flex-end",
    alignSelf: "flex-end",
  },
  imageWrapper: {
    width: 226,
    height: 169,
    padding: 8,
    borderRadius: 16,
    borderTopRightRadius: 2,
    backgroundColor: colors.white,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});
