import { useCreatingPartyStore } from "@/stores/creatingPartyStore";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useShallow } from "zustand/shallow";

const MINUS_ICON = require("@/assets/images/minus-24-gray.png");
const PLUS_ICON = require("@/assets/images/plus-24-gray.png");

interface NumberOfPeopleBoxProps {
  isDisabled?: boolean;
}

const NumberOfPeopleBox = ({ isDisabled = true }: NumberOfPeopleBoxProps) => {
  const { numberOfPeople, setNumberOfPeople } = useCreatingPartyStore(
    useShallow((state) => ({
      numberOfPeople: state.numberOfPeople,
      setNumberOfPeople: state.setNumberOfPeople,
    }))
  );

  const handleClickMinus = () => {
    if (numberOfPeople > 2) {
      setNumberOfPeople(numberOfPeople - 1);
    }
  };

  const handleClickPlus = () => {
    if (numberOfPeople < 10) {
      setNumberOfPeople(numberOfPeople + 1);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDisabled ? colors.white : colors.gray[3] },
      ]}
    >
      <View style={styles.inner}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleClickMinus}
          disabled={!isDisabled}
        >
          <Image style={styles.image} source={MINUS_ICON} />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text
            style={[
              textStyles.title20_SB135,
              { color: isDisabled ? colors.main : colors.gray[1] },
            ]}
          >
            {numberOfPeople}
          </Text>
          <Text style={[styles.textUnit, textStyles.body16_SB135]}>명</Text>
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleClickPlus}
          disabled={!isDisabled}
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
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    elevation: 4,
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
