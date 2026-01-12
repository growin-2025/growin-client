import { patchParty, postFile } from "@/api/partyApi";
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
import { ApiError } from "@/types/api.types";
import { EditedPartyInfo } from "@/types/party.types";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
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
  const queryClient = useQueryClient();
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
    maxParticipants,
    pickupLocation,
    description,
    productLink,
    setPartyTitle,
    setTotalAmount,
    setPickUpLocation,
    setDetailedDescription,
    setProductLink,
    resetEditParty,
  } = useEditPartyStore(
    useShallow((state) => ({
      partyId: state.partyId,
      photos: state.photos,
      title: state.title,
      totalPrice: state.totalPrice,
      maxParticipants: state.maxParticipants,
      pickupLocation: state.pickupLocation,
      description: state.description,
      productLink: state.productLink,
      setPartyTitle: state.setPartyTitle,
      setTotalAmount: state.setTotalAmount,
      setPickUpLocation: state.setPickUpLocation,
      setDetailedDescription: state.setDetailedDescription,
      setProductLink: state.setProductLink,
      resetEditParty: state.resetEditParty,
    }))
  );

  const UploadFileMutation = useMutation({
    mutationFn: postFile,
    onSuccess: (data) => {
      return data;
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

  const EditPartyMutation = useMutation({
    mutationFn: patchParty,
    onSuccess: (data) => {
      // 상세화면 쿼리 무효화하여 최신 데이터로 갱신
      queryClient.invalidateQueries({ queryKey: ["getPartyDetail"] });
      // 파티 리스트 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["getParties"] });
      queryClient.invalidateQueries({ queryKey: ["getHostingParties"] });
      resetEditParty();
      router.dismissTo(`/party-detail/${partyId}`);
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

  const renderItem = ({ item }: { item: Photo | PhotoUrl }) => {
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

  const onClickEditParty = async () => {
    if (productLink.isEdited && !isValidLink(productLink.value)) {
      Toast.show({
        type: "basicToast",
        props: { text: "올바른 URL 형식으로 입력해주세요." },
        position: "bottom",
        bottomOffset: 133,
        visibilityTime: 2000,
      });
      return;
    }

    try {
      // 1. 새로 추가된 사진들만 필터링
      const newPhotos = photos.filter(
        (photo): photo is Photo => "mimeType" in photo
      );

      // 2. 새 사진들 업로드
      let uploadedImageUrls: string[] = [];
      if (newPhotos.length > 0) {
        const uploadResults = await UploadFileMutation.mutateAsync(newPhotos);
        uploadedImageUrls = uploadResults;
      }

      // 3. 전체 이미지 URL 배열 생성 (순서 유지)
      let uploadIndex = 0;
      const allImageUrls = photos.map((photo) => {
        if ("mimeType" in photo) {
          // Photo 타입 -> 업로드된 URL 사용
          return uploadedImageUrls[uploadIndex++];
        } else {
          // PhotoUrl 타입 -> 기존 imageUri 사용
          return photo.imageUri;
        }
      });

      const body: EditedPartyInfo = {
        // 필수 필드
        images: allImageUrls,
        description: description,
        pickupLocation: {
          place: pickupLocation.place,
          pickupLatitude: pickupLocation.pickupLatitude,
          pickupLongitude: pickupLocation.pickupLongitude,
        },
      };

      if (title.isEdited) {
        body.title = title.value;
      }
      if (totalPrice.isEdited) {
        body.totalPrice = Number(totalPrice.value);
      }
      if (maxParticipants.isEdited) {
        body.maxParticipants = maxParticipants.value;
      }
      if (productLink.isEdited) {
        body.productLink = productLink.value;
      }

      await EditPartyMutation.mutateAsync({
        partyId: partyId,
        body: body,
      });
    } catch (error) {
      console.error("파티 수정 중 오류:", error);
    }
  };

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <CreatePartyPageHeader title="파티 수정" />
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
              <NumberOfPeopleBox isEditable={isAllEditable} />
            </View>

            <View style={styles.section}>
              <SubTitle subTitle="수령 장소" />
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "/search/location",
                    params: {
                      mode: "edit",
                    },
                  })
                }
              >
                <TextInputBox
                  iconType="location"
                  placeholder="예) 역삼역 1번 출구"
                  maxLength={30}
                  value={pickupLocation.place}
                  isEditable={isAllEditable}
                />
              </Pressable>
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
          </KeyboardAwareScrollView>
          <View style={styles.createButtonContainer}>
            <GlobalButton onClick={onClickEditParty} text="완료" />
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
    boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
  },
  safeAreaBottom: {
    backgroundColor: colors.white,
  },
});
