import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

const iconUrl = {
  location: require("@/assets/images/location.png"),
  link: require("@/assets/images/link.png"),
};

interface TextInputBoxProps {
  iconType?: "location" | "link";
  isAmount?: boolean;
  maxLength?: number;
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
  isEditable?: boolean;
}

const TextInputBox = ({
  iconType,
  isAmount,
  maxLength,
  placeholder,
  onChangeText,
  value,
  isEditable = true,
}: TextInputBoxProps) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isEditable ? colors.white : colors.gray[3] },
        isEditable && {
          boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
        },
      ]}
    >
      <View style={styles.inner}>
        {iconType && <Image source={iconUrl[iconType]} />}

        <TextInput
          style={[
            styles.inputText,
            textStyles.body16_SB135,
            { color: isEditable ? colors.black : colors.gray[1] },
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.gray[1]}
          maxLength={maxLength}
          multiline={!isAmount}
          keyboardType={isAmount ? "number-pad" : "default"}
          onChangeText={(text) => {
            onChangeText(isAmount ? text.replace(/[^0-9]/g, "") : text);
          }}
          value={value}
          editable={isEditable}
        />

        {isAmount && (
          <Text
            style={[
              textStyles.body16_SB150,
              { color: isEditable ? colors.black : colors.gray[1] },
            ]}
          >
            원
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 16,
  },
  inner: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  inputText: {
    flex: 1,
    padding: 0,
  },
});

export default TextInputBox;
