import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { useState } from "react";
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
}

const TextInputBox = ({
  iconType,
  isAmount,
  maxLength,
  placeholder,
}: TextInputBoxProps) => {
  const [value, onChangValue] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        {iconType && <Image source={iconUrl[iconType]} />}

        <TextInput
          style={[styles.inputText, textStyles.body16_SB135]}
          placeholder={placeholder}
          placeholderTextColor={colors.gray[1]}
          maxLength={maxLength}
          multiline={!isAmount}
          keyboardType={isAmount ? "number-pad" : "default"}
          onChangeText={(text) => {
            onChangValue(isAmount ? text.replace(/[^0-9]/g, "") : text);
          }}
          value={value}
        />

        {isAmount && (
          <Text style={[styles.amountText, textStyles.body16_SB150]}>원</Text>
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
    backgroundColor: colors.white,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowRadius: 4,
    elevation: 4,
  },
  inner: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  inputText: {
    flex: 1,
    color: colors.black,
  },
  amountText: {
    color: colors.black,
  },
});

export default TextInputBox;
