import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { Image, StyleSheet, Text, View } from "react-native";

interface MainCardDetailHostNoteProps {
  body: string;
}

const MainCardDetailHostNote = ({ body }: MainCardDetailHostNoteProps) => {
  return (
    <View style={styles.noteBox}>
      <View style={styles.noteHeader}>
        <Image
          source={require("@/assets/images/mainlist/detail/host-talk.png")}
          style={styles.noteIcon}
          resizeMode="contain"
        />
        <Text style={[styles.noteTitle, textStyles.body13_SB135]}>
          호스트의 한마디
        </Text>
      </View>
      <Text style={[styles.noteBody, textStyles.body13_SB150]}>{body}</Text>
    </View>
  );
};

export default MainCardDetailHostNote;

const styles = StyleSheet.create({
  noteBox: {
    width: "100%",
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 12,
    marginTop: 16,
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  noteTitle: {
    color: colors.gray[1],
  },
  noteHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
  },
  noteIcon: {
    width: 20,
    height: 20,
  },
  noteBody: {
    color: colors.black,
  },
});
