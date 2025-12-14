import { colors } from "@/styles/colors";
import { useRouter } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

interface PaginationIndecatorHeaderProps {
  page: 0 | 1 | 2 | 3;
}

const DOT_SIZE = 8;
const ACTIVE_COLOR = colors.main;
const INACTIVE_COLOR = colors.gray[3];

const PaginationIndecatorHeader = ({
  page,
}: PaginationIndecatorHeaderProps) => {
  const router = useRouter();

  const pages = [0, 1, 2, 3];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Image
          style={styles.backImage}
          source={require("@/assets/images/chevron/chevron-left-44.png")}
        />
      </TouchableOpacity>

      <View style={styles.indicatorContainer}>
        {pages.map((_, index) => {
          const backgroundColor =
            index === page ? ACTIVE_COLOR : INACTIVE_COLOR;

          return <View key={index} style={[styles.dot, { backgroundColor }]} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 44,
  },

  backImage: {
    width: 44,
    aspectRatio: 1 / 1,
  },

  indicatorContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    aspectRatio: 1,
  },
});

export default PaginationIndecatorHeader;
