import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, TextInput, View } from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing?: () => void;
  onClear?: () => void;
  placeholder?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

const SearchBar = ({
  value,
  onChangeText,
  onSubmitEditing,
  onClear,
  placeholder = "검색어를 입력하세요",
  showBackButton = true,
  onBackPress,
}: SearchBarProps) => {
  const router = useRouter();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  const handleClear = () => {
    onChangeText("");
    if (onClear) {
      onClear();
    }
  };

  return (
    <View style={styles.header}>
      {showBackButton && (
        <Pressable onPress={handleBackPress}>
          <Image
            source={require("@/assets/images/chevron/chevron-left-36-gray.png")}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </Pressable>
      )}
      <View style={styles.searchInputContainer}>
        <View style={{ alignSelf: "stretch" }}>
          <TextInput
            autoFocus={true}
            style={styles.searchInput}
            placeholder={placeholder}
            placeholderTextColor={colors.gray[1]}
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            returnKeyType="search"
          />
        </View>
        {value.length > 0 && (
          <Pressable onPress={handleClear} style={styles.clearButton}>
            <Image
              source={require("@/assets/images/delete-icon-24.png")}
              style={styles.clearIcon}
              resizeMode="contain"
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 8,
  },
  backIcon: {
    width: 36,
    height: 36,
    tintColor: colors.gray[1],
  },
  searchInputContainer: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
  },
  searchInput: {
    backgroundColor: colors.gray[4],
    alignSelf: "stretch",
    borderRadius: 16,
    padding: 12,
    paddingRight: 40,
    height: 48,
    ...textStyles.body16_M135,
  },
  clearButton: {
    position: "absolute",
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 100,
    backgroundColor: colors.gray[3],
    justifyContent: "center",
    alignItems: "center",
  },
  clearIcon: {
    width: 16,
    height: 16,
    tintColor: colors.white,
  },
});
