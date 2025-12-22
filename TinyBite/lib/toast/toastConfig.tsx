import { textStyles } from "@/styles/typography/textStyles";
import { Text, View } from "react-native";
import { ToastConfig, ToastConfigParams } from "react-native-toast-message";

interface basicToastProps {
  text: string;
}

export const toastConfig: ToastConfig = {
  basicToast: (params: ToastConfigParams<basicToastProps>) => (
    <View
      style={{
        maxWidth: "95%",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 100,
        backgroundColor: "rgba(34, 34, 34, 0.50)",
        backdropFilter: "blur(2px)",
      }}
    >
      <Text
        style={[
          { color: "#fff", textAlign: "center" },
          textStyles.body15_SB135,
        ]}
      >
        {params.props.text}
      </Text>
    </View>
  ),
};
