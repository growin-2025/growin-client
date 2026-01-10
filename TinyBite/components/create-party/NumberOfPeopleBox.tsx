import { useCreatingPartyStore } from "@/stores/creatingPartyStore";
import { useEditPartyStore } from "@/stores/editPartyStore";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useShallow } from "zustand/shallow";

const MINUS_ICON = require("@/assets/images/minus-24-gray.png");
const PLUS_ICON = require("@/assets/images/plus-24-gray.png");
const MIN = 2;
const MAX = 10;

interface NumberOfPeopleBoxProps {
  isEditable?: boolean;
}

const NumberOfPeopleBox = ({ isEditable = true }: NumberOfPeopleBoxProps) => {
  const { mode } = useLocalSearchParams<{
    mode?: string;
  }>();
  const isEditingMode = mode === "edit";

  const { numberOfPeople, setNumberOfPeople } = useCreatingPartyStore(
    useShallow((state) => ({
      numberOfPeople: state.numberOfPeople,
      setNumberOfPeople: state.setNumberOfPeople,
    }))
  );

  const { maxParticipants, setMaxParticipants } = useEditPartyStore(
    useShallow((state) => ({
      maxParticipants: state.maxParticipants,
      setMaxParticipants: state.setMaxParticipants,
    }))
  );

  const getCurrentValue = () =>
    isEditingMode ? maxParticipants?.value : numberOfPeople;

  const setCurrentValue = (value: number) => {
    if (isEditingMode) {
      setMaxParticipants(value);
    } else {
      setNumberOfPeople(value);
    }
  };

  const handleClickMinus = () => {
    const current = getCurrentValue();
    if (current === undefined) return;

    if (current > MIN) {
      setCurrentValue(current - 1);
    }
  };

  const handleClickPlus = () => {
    const current = getCurrentValue();
    if (current === undefined) return;

    if (current < MAX) {
      setCurrentValue(current + 1);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isEditable ? colors.white : colors.gray[3] },
        isEditable && {
          shadowColor: "#000000",
          shadowOpacity: 0.25,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 4,
          boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
        },
      ]}
    >
      <View style={styles.inner}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleClickMinus}
          disabled={!isEditable}
        >
          <Image style={styles.image} source={MINUS_ICON} />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text
            style={[
              textStyles.title20_SB135,
              { color: isEditable ? colors.main : colors.gray[1] },
            ]}
          >
            {isEditingMode ? maxParticipants.value : numberOfPeople}
          </Text>
          <Text style={[styles.textUnit, textStyles.body16_SB135]}>명</Text>
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleClickPlus}
          disabled={!isEditable}
        >
          <Image style={styles.image} source={PLUS_ICON} />
        </TouchableOpacity>
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: colors.gray[4],
  },
  image: {
    width: 24,
    height: 24,
  },
  textContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  textUnit: {
    color: colors.gray[1],
  },
});

export default NumberOfPeopleBox;
