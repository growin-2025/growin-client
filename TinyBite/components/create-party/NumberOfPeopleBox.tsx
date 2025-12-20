import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MINUS_ICON = require("@/assets/images/minus-24-gray.png");
const PLUS_ICON = require("@/assets/images/plus-24-gray.png");

const NumberOfPeopleBox = () => {
  const [value, setValue] = useState(2);

  const handleClickMinus = () => {
    if (value > 2) {
      setValue(value - 1);
    }
  };

  const handleClickPlus = () => {
    if (value < 10) {
      setValue(value + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleClickMinus}
        >
          <Image style={styles.image} source={MINUS_ICON} />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={[styles.textNumber, textStyles.title20_SB135]}>
            {value}
          </Text>
          <Text style={[styles.textUnit, textStyles.body16_SB135]}>명</Text>
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleClickPlus}
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
    backgroundColor: colors.white,
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
  textNumber: {
    color: colors.main,
  },
  textUnit: {
    color: colors.gray[1],
  },
});

export default NumberOfPeopleBox;
