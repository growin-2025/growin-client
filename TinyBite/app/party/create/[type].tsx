import { postCreateParty, postFile } from "@/api/partyApi";
import AddPhotoButton from "@/components/create-party/AddPhotoButton";
import NumberOfPeopleBox from "@/components/create-party/NumberOfPeopleBox";
import PhotoItem from "@/components/create-party/PhotoItem";
import SubTitle from "@/components/create-party/SubTitle";
import TextInputBox from "@/components/create-party/TextInputBox";
import CreatePartyPageHeader from "@/components/CreatePartyPageHeader";
import GlobalButton from "@/components/GlobalButton";
import { Photo, useCreatingPartyStore } from "@/stores/creatingPartyStore";
import { colors } from "@/styles/colors";
import { ApiError } from "@/types/api";
import { CreatingPartyBody } from "@/types/party";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useShallow } from "zustand/shallow";

const PARTY_TITLES = {
  DELIVERY: "배달 파티 생성",
  GROCERY: "장보기 파티 생성",
  HOUSEHOLD: "생필품 파티 생성",
} as const;

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
  } = useCreatingPartyStore(
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

  const UploadFileMutation = useMutation({
    mutationFn: postFile,
    onSuccess: (data) => {
      return data;
    },
  });

  const CreatePartyMutation = useMutation({
    mutationFn: postCreateParty,
    onSuccess: (data) => {
      resetCreateParty();
      router.replace("/(tabs)");
    },
    onError: (error: AxiosError<ApiError>) => {
      if (error.response?.data) {
        const message = getErrorMessage(error.response.data);
        alert(message);
        console.error(message);
      } else {
        console.error("네트워크 연결을 확인해주세요.");
      }
    },
  });

  const renderItem = ({ item }: { item: Photo }) => {
    return <PhotoItem id={item.id} imageUri={item.imageUri} />;
  };

  const isValidLink = (str: string): boolean => {
    const trimmed = str.trim();
    try {
      const url = new URL(trimmed);
      return (
        (url.protocol === "http:" || url.protocol === "https:") &&
        !!url.hostname
      );
    } catch {
      return false;
    }
  };

  const isValid = (): boolean => {
    if (partyTitle && totalAmount && numberOfPeople && pickUpLocation) {
      return true;
    }
    return false;
  };

  const showCorrectLinkToast = () => {
    Toast.show({
      type: "basicToast",
      props: { text: "올바른 URL 형식으로 입력해주세요." },
      position: "bottom",
      bottomOffset: 133,
      visibilityTime: 2000,
    });
  };

  const onClickCreateParty = async () => {
    if (productLink && !isValidLink(productLink)) {
      showCorrectLinkToast();
      return;
    }

    let photoStringList: string[] | undefined;

    if (photos.length) {
      try {
        photoStringList = await UploadFileMutation.mutateAsync(photos);
      } catch (error) {
        Toast.show({
          type: "basicToast",
          props: { text: "사진 업로드에 실패했습니다. 다시 시도해주세요." },
          position: "bottom",
          bottomOffset: 133,
          visibilityTime: 2000,
        });
        return;
      }
    }

    const newPartyValue: CreatingPartyBody = {
      title: partyTitle,
      category: type,
      totalPrice: Number(totalAmount),
      maxParticipants: numberOfPeople,
      pickupLocation: {
        place: pickUpLocation.place,
        pickupLatitude: pickUpLocation.pickupLatitude,
        pickupLongitude: pickUpLocation.pickupLongitude,
      },
      ...(photoStringList && { images: photoStringList }),
      ...(productLink && { productLink }),
      ...(detailedDescription && { description: detailedDescription }),
    };

    CreatePartyMutation.mutate(newPartyValue);
  };

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <CreatePartyPageHeader title={title} />
        <View style={{ flex: 1 }}>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.contentContainer}
            bottomOffset={30}
          >
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
                value={pickUpLocation.place}
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
          </KeyboardAwareScrollView>
          <View style={styles.createButtonContainer}>
            <GlobalButton
              onClick={onClickCreateParty}
              text="파티 시작하기"
              disabled={!isValid()}
            />
          </View>
        </View>
      </View>
      <SafeAreaView style={styles.safeAreaBottom} edges={["bottom"]} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
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
    backgroundColor: colors.white,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
  },
  safeAreaBottom: {
    backgroundColor: colors.white,
  },
});
