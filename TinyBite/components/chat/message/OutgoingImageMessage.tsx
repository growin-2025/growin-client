import { colors } from "@/styles/colors";
import { Image, StyleSheet, View } from "react-native";
import { MessageTime } from "./MessageTime";

interface OutgoingImageMessageProps {
  imageUrl: string;
  time: string;
}

export function OutgoingImageMessage({
  imageUrl,
  time,
}: OutgoingImageMessageProps) {
  return (
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
