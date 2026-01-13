import {
  PickupLocation,
  useCreatingPartyStore,
} from "@/stores/creatingPartyStore";
import { useEditPartyStore } from "@/stores/editPartyStore";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const KAKAO_REST_API_KEY = process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY;
const CHEVRON_LEFT_ICON = require("@/assets/images/chevron/chevron-left-36-gray.png");
const LOCATION_ICON = require("@/assets/images/location.png");

export interface PlaceItem {
  id: string;
  place_name: string;
  x: string; // longitude
  y: string; // latitude
}

export default function PartyPlaceSearch() {
  const { mode } = useLocalSearchParams<{
    mode: "create" | "edit";
  }>();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlaceItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<PlaceItem | null>(null);
  const createStore = useCreatingPartyStore();
  const editStore = useEditPartyStore();
  const setPickUpLocation =
    mode === "edit"
      ? editStore.setPickUpLocation
      : createStore.setPickUpLocation;

  useEffect(() => {
    if (!query) return setResults([]);

    const timeout = setTimeout(() => {
      fetchKakaoPlaces(query);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const fetchKakaoPlaces = async (text: string) => {
    try {
      const url =
        `https://dapi.kakao.com/v2/local/search/keyword.json?` +
        `query=${encodeURIComponent(text)}`;

      const res = await fetch(url, {
        headers: {
          Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
        },
      });

      const json = await res.json();
      setResults(json.documents || []);
    } catch (error) {
      console.error("Kakao place search error:", error);
    }
  };

  const onPressPlace = (item: PlaceItem) => {
    setSelectedItem(item);
  };

  const onPressDone = () => {
    const locationData: PickupLocation = {
      place: selectedItem?.place_name!,
      pickupLatitude: parseFloat(selectedItem?.y!),
      pickupLongitude: parseFloat(selectedItem?.x!),
    };
    setPickUpLocation(locationData);
    router.back();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header} edges={["top"]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image style={styles.image} source={CHEVRON_LEFT_ICON} />
        </TouchableOpacity>

        <Text style={[styles.textTitle, textStyles.title20_B135]}>
          수령장소
        </Text>

        <TouchableOpacity onPress={onPressDone}>
          <Text style={[styles.textDone, textStyles.title18_SB135]}>완료</Text>
        </TouchableOpacity>
      </SafeAreaView>

      <View style={{ paddingVertical: 12, paddingHorizontal: 20, gap: 12 }}>
        <View style={styles.searchBox}>
          <Image source={LOCATION_ICON} />
          <TextInput
            placeholder="수령 할 장소를 입력하세요."
            placeholderTextColor={colors.gray[1]}
            value={query}
            onChangeText={setQuery}
            style={[styles.inputText, textStyles.body16_M135]}
          />
        </View>

        {query.length > 0 && results.length > 0 && (
          <Text style={[styles.resultTitle, textStyles.body15_SB135]}>
            ‘{query}’ 검색 결과
          </Text>
        )}

        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: 12 }}
          renderItem={({ item }) => {
            const isSelected = item.id === selectedItem?.id;

            return (
              <TouchableOpacity onPress={() => onPressPlace(item)}>
                <Text
                  style={[
                    textStyles.body16_M135,
                    isSelected
                      ? [styles.selectedItemText, textStyles.body16_SB135]
                      : styles.itemText,
                  ]}
                >
                  {item.place_name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: colors.white,
    boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
  },
  image: {
    width: 36,
    height: 36,
  },
  textTitle: {
    color: colors.black,
    textAlign: "center",
  },
  textDone: {
    color: colors.gray[1],
    textAlign: "center",
  },
  searchBox: {
    flexDirection: "row",
    padding: 12,
    gap: 4,
    alignItems: "flex-end",
    borderRadius: 16,
    backgroundColor: colors.white,
    boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
  },
  inputText: {
    flex: 1,
    padding: 0,
    color: colors.black,
  },
  resultTitle: {
    marginBottom: 12,
    color: colors.gray[1],
  },
  itemText: {
    color: colors.black,
  },
  selectedItemText: {
    color: colors.main,
  },
});
