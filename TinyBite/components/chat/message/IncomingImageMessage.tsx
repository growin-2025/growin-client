import { colors } from "@/styles/colors";
import { ImageUrlMessage } from "@/types/chat.types";
import { Image, StyleSheet, View } from "react-native";
import { formatTime } from "./ChatMessage";
import { MessageOwner } from "./MessageOwner";
import { MessageTime } from "./MessageTime";

interface IncomingImageMessageProps {
  message: ImageUrlMessage;
}

export function IncomingImageMessage({ message }: IncomingImageMessageProps) {
  const time = formatTime(message.createdAt);

  return (
    <View style={styles.container}>
      <MessageOwner nickname={message.nickname} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 2 },
  wrapper: {
    gap: 4,
    flexDirection: "row",
    alignItems: "flex-end",
    alignSelf: "flex-start",
  },
  imageWrapper: {
    width: 226,
    height: 169,
    padding: 8,
    borderRadius: 16,
    borderTopLeftRadius: 2,
    backgroundColor: colors.white,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});
