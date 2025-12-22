import AddPhotoButton from "@/components/create-party/AddPhotoButton";
import NumberOfPeopleBox from "@/components/create-party/NumberOfPeopleBox";
import PhotoItem from "@/components/create-party/PhotoItem";
import SubTitle from "@/components/create-party/SubTitle";
import TextInputBox from "@/components/create-party/TextInputBox";
import CreatePartyPageHeader from "@/components/CreatePartyPageHeader";
import GlobalButton from "@/components/GlobalButton";
import { photo, usecreatingPartyStore } from "@/stores/creatingPartyStore";
import { colors } from "@/styles/colors";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShallow } from "zustand/shallow";

const PARTY_TITLES = {
  delivery: "배달 파티 생성",
  shopping: "장보기 파티 생성",
  necessities: "생필품 파티 생성",
} as const;

const PARTY_CONFIG = {
  delivery: { showProductLink: false },
  shopping: { showProductLink: true },
  necessities: { showProductLink: true },
} as const;

export default function PartyCreateScreen() {
  const { type } = useLocalSearchParams<{ type: "shopping" | "necessities" }>();

  const title = PARTY_TITLES[type];
  const config = PARTY_CONFIG[type];

  const {
    photos,
    partyTitle,
    totalAmount,
    numberOfPeople,
    pickUpLocation,
    detailedDescription,
    productLink,
    setPartyTitle,
    setTotalAmount,
    setPickUpLocation,
    setDetailedDescription,
    setProductLink,
    resetCreateParty,
  } = usecreatingPartyStore(
    useShallow((state) => ({
      photos: state.photos,
      partyTitle: state.partyTitle,
      totalAmount: state.totalAmount,
      numberOfPeople: state.numberOfPeople,
      pickUpLocation: state.pickUpLocation,
      detailedDescription: state.detailedDescription,
      productLink: state.productLink,
      setPartyTitle: state.setPartyTitle,
      setTotalAmount: state.setTotalAmount,
      setPickUpLocation: state.setPickUpLocation,
      setDetailedDescription: state.setDetailedDescription,
      setProductLink: state.setProductLink,
      resetCreateParty: state.resetCreateParty,
    }))
  );

  const renderItem = ({ item }: { item: photo }) => {
    return <PhotoItem id={item.id} imageUri={item.imageUri} />;
  };

  const isValid = (): boolean => {
    if (partyTitle && totalAmount && numberOfPeople && pickUpLocation) {
      return true;
    }
    return false;
  };

  const onClickCreateParty = () => {
    console.log("partyTitle: ", partyTitle);
    console.log("totalAmount: ", totalAmount);
    console.log("numberOfPeople: ", numberOfPeople);
    console.log("pickUpLocation: ", pickUpLocation);
    console.log("detailedDescription: ", detailedDescription);
    console.log("productLink: ", productLink);

    resetCreateParty();
  };

  return (
    <>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <CreatePartyPageHeader title={title} />

        <ScrollView style={styles.contentContainer}>
          <SafeAreaView style={styles.contentInner} edges={["bottom"]}>
            <View style={styles.section}>
              <SubTitle subTitle="사진 등록" isPic />
              <View style={styles.photoContainer}>
                <AddPhotoButton />
                <FlatList
                  data={photos}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal={true}
                  contentContainerStyle={{ gap: 8 }}
                />
              </View>
            </View>

            <View style={styles.section}>
              <SubTitle subTitle="파티 제목" caption="(메뉴명)" />
              <TextInputBox
                placeholder="예) 엽떡 매운맛 같이 드실 분"
                maxLength={30}
                onChangeText={setPartyTitle}
                value={partyTitle}
              />
            </View>

            <View style={styles.section}>
              <SubTitle subTitle="예상 총 주문 금액" />
              <TextInputBox
                placeholder="0"
                isAmount
                onChangeText={setTotalAmount}
                value={totalAmount}
              />
            </View>

            <View style={styles.section}>
              <SubTitle subTitle="모집 인원" caption="(나 포함)" />
              <NumberOfPeopleBox />
            </View>

            <View style={styles.section}>
              <SubTitle subTitle="수령 장소" />
              <TextInputBox
                iconType="location"
                placeholder="예) 역삼역 1번 출구"
                maxLength={30}
                onChangeText={setPickUpLocation}
                value={pickUpLocation}
              />
            </View>

            <View style={styles.section}>
              <SubTitle subTitle="상세 설명" />
              <TextInputBox
                placeholder="추가로 전달 할 내용이 있다면 적어주세요."
                maxLength={60}
                onChangeText={setDetailedDescription}
                value={detailedDescription}
              />
            </View>

            {config.showProductLink && (
              <View style={styles.section}>
                <SubTitle subTitle="상품 링크" />
                <TextInputBox
                  iconType="link"
                  placeholder="구매할 상품의 URL을 입력하세요."
                  onChangeText={setProductLink}
                  value={productLink}
                />
              </View>
            )}
          </SafeAreaView>
        </ScrollView>

        <SafeAreaView style={styles.createButtonContainer} edges={["bottom"]}>
          <GlobalButton
            onClick={onClickCreateParty}
            text="파티 시작하기"
            disabled={!isValid()}
          />
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    flex: 1,
  },
  contentInner: {
    flex: 1,
    gap: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  section: {
    gap: 12,
  },
  photoContainer: {
    flexDirection: "row",
    gap: 8,
  },
  createButtonContainer: {
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 17,
    backgroundColor: "#fff",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
});
