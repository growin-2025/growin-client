import { colors } from "@/styles/colors";
import { Image, StyleSheet, View } from "react-native";
import { MessageOwner } from "./MessageOwner";
import { MessageTime } from "./MessageTime";

interface IncomingImageMessageProps {
  nickname: string;
  imageUrl: string;
  time: string;
}

export function IncomingImageMessage({
  nickname,
  imageUrl,
  time,
}: IncomingImageMessageProps) {
  return (
    <View style={styles.container}>
      <MessageOwner nickname={nickname} />
      <View style={styles.wrapper}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: imageUrl }}
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
