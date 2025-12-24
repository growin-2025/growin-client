import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface GlobalButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const GlobalButton = ({ text, onClick, disabled }: GlobalButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[
        styles.container,
        disabled ? styles.disabledContainer : styles.activeContainer,
      ]}
      disabled={disabled}
    >
      <Text style={[styles.text, textStyles.title18_SB135]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  activeContainer: {
    backgroundColor: colors.main,
  },
  disabledContainer: {
    backgroundColor: colors.gray[2],
  },
  text: {
    color: "#fff",
  },
});

export default GlobalButton;
