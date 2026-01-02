import AddPhotoButton from "@/components/create-party/AddPhotoButton";
import NumberOfPeopleBox from "@/components/create-party/NumberOfPeopleBox";
import PhotoItem from "@/components/create-party/PhotoItem";
import SubTitle from "@/components/create-party/SubTitle";
import TextInputBox from "@/components/create-party/TextInputBox";
import CreatePartyPageHeader from "@/components/CreatePartyPageHeader";
import GlobalButton from "@/components/GlobalButton";
import { Photo } from "@/stores/creatingPartyStore";
import { PhotoUrl, useEditPartyStore } from "@/stores/editPartyStore";
import { colors } from "@/styles/colors";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShallow } from "zustand/shallow";

const PARTY_CONFIG = {
  DELIVERY: {
    showProductLink: false,
    titlePlaceholder: "예) 엽떡 매운맛 같이 드실 분",
  },
  GROCERY: {
    showProductLink: true,
    titlePlaceholder: "예) 코스트코 베이글 나누실 분",
  },
  HOUSEHOLD: {
    showProductLink: true,
    titlePlaceholder: "예) 코스트코 베이글 나누실 분",
  },
} as const;

export default function PartyCreateScreen() {
  const { type } = useLocalSearchParams<{
    type: "DELIVERY" | "GROCERY" | "HOUSEHOLD";
  }>();
  const { allEditable } = useLocalSearchParams<{
    allEditable?: string;
  }>();

  const config = PARTY_CONFIG[type];
  const isAllEditable = allEditable === "true";

  const {
    partyId,
    photos,
    title,
    totalPrice,
    pickupLocation,
    description,
    productLink,
    setPartyTitle,
    setTotalAmount,
    setPickUpLocation,
    setDetailedDescription,
    setProductLink,
  } = useEditPartyStore(
    useShallow((state) => ({
      partyId: state.partyId,
      photos: state.photos,
      title: state.title,
      totalPrice: state.totalPrice,
      pickupLocation: state.pickupLocation,
      description: state.description,
      productLink: state.productLink,
      setPartyTitle: state.setPartyTitle,
      setTotalAmount: state.setTotalAmount,
      setPickUpLocation: state.setPickUpLocation,
      setDetailedDescription: state.setDetailedDescription,
      setProductLink: state.setProductLink,
    }))
  );

  const renderItem = ({ item }: { item: Photo | PhotoUrl }) => {
    return <PhotoItem id={item.id} imageUri={item.imageUri} />;
  };

  const onClickEditParty = async () => {
    // TODO: 파티 수정 로직 구현
  };

  return (
    <>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <CreatePartyPageHeader title="파티 수정" />

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
                placeholder={config.titlePlaceholder}
                maxLength={30}
                onChangeText={setPartyTitle}
                value={title.value}
                isEditable={isAllEditable}
              />
            </View>

            <View style={styles.section}>
              <SubTitle subTitle="예상 총 주문 금액" />
              <TextInputBox
                placeholder="0"
                isAmount
                onChangeText={setTotalAmount}
                value={totalPrice.value}
                isEditable={isAllEditable}
              />
            </View>

            <View style={styles.section}>
              <SubTitle subTitle="모집 인원" caption="(나 포함)" />
              <NumberOfPeopleBox isDisabled={isAllEditable} />
            </View>

            <View style={styles.section}>
              <SubTitle subTitle="수령 장소" />
              <TextInputBox
                iconType="location"
                placeholder="예) 역삼역 1번 출구"
                maxLength={30}
                onChangeText={setPickUpLocation}
                value={pickupLocation.value}
                isEditable={isAllEditable}
              />
            </View>

            <View style={styles.section}>
              <SubTitle subTitle="상세 설명" />
              <TextInputBox
                placeholder="추가로 전달 할 내용이 있다면 적어주세요."
                maxLength={60}
                onChangeText={setDetailedDescription}
                value={description}
              />
            </View>

            {config.showProductLink && (
              <View style={styles.section}>
                <SubTitle subTitle="상품 링크" />
                <TextInputBox
                  iconType="link"
                  placeholder="구매할 상품의 URL을 입력하세요."
                  onChangeText={setProductLink}
                  value={productLink.value}
                  isEditable={isAllEditable}
                />
              </View>
            )}
          </SafeAreaView>
        </ScrollView>

        <SafeAreaView style={styles.createButtonContainer} edges={["bottom"]}>
          <GlobalButton onClick={onClickEditParty} text="완료" />
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
